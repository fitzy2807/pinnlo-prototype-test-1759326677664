'use client'

import { useState } from 'react'
import { Plus, Trash2, Save } from 'lucide-react'

type QuestionType = 'multiple_choice' | 'rating' | 'open_text'

interface Question {
  id: string
  type: QuestionType
  text: string
  options?: string[]
  required: boolean
}

export default function FeedbackForm() {
  const [formTitle, setFormTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [distributionChannels, setDistributionChannels] = useState({
    email: false,
    website: false,
    socialMedia: false,
  })

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      text: '',
      options: type === 'multiple_choice' ? ['Option 1', 'Option 2'] : undefined,
      required: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
      }
      return q
    }))
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options]
        newOptions[optionIndex] = value
        return { ...q, options: newOptions }
      }
      return q
    }))
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
      }
      return q
    }))
  }

  const handleSaveForm = () => {
    const formData = {
      title: formTitle,
      questions,
      distributionChannels,
      createdAt: new Date().toISOString(),
    }

    // Store in localStorage for demo purposes
    const existingForms = JSON.parse(localStorage.getItem('feedbackForms') || '[]')
    localStorage.setItem('feedbackForms', JSON.stringify([...existingForms, formData]))

    // Store mock responses
    const mockResponses = generateMockResponses(formData)
    localStorage.setItem('feedbackResponses', JSON.stringify(mockResponses))

    alert('Feedback form created successfully!')

    // Reset form
    setFormTitle('')
    setQuestions([])
    setDistributionChannels({ email: false, website: false, socialMedia: false })
  }

  const generateMockResponses = (form: any) => {
    const responses = []
    const numResponses = Math.floor(Math.random() * 100) + 50

    for (let i = 0; i < numResponses; i++) {
      const response: any = {
        id: `response-${i}`,
        formTitle: form.title,
        submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        answers: {}
      }

      form.questions.forEach((q: Question) => {
        if (q.type === 'rating') {
          response.answers[q.id] = Math.floor(Math.random() * 5) + 1
        } else if (q.type === 'multiple_choice' && q.options) {
          response.answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)]
        } else if (q.type === 'open_text') {
          const sentiments = [
            'Great product! Love the taste and quality.',
            'Good, but could be improved with more flavor options.',
            'Excellent quality. Will definitely buy again.',
            'Not bad, but a bit too sweet for my taste.',
            'Amazing! Best functional beverage I\'ve tried.',
          ]
          response.answers[q.id] = sentiments[Math.floor(Math.random() * sentiments.length)]
        }
      })

      responses.push(response)
    }

    return responses
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Form Title
        </label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Enter form title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => addQuestion('multiple_choice')}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              + Multiple Choice
            </button>
            <button
              onClick={() => addQuestion('rating')}
              className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              + Rating Scale
            </button>
            <button
              onClick={() => addQuestion('open_text')}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              + Open Text
            </button>
          </div>
        </div>

        {questions.map((question, index) => (
          <div key={question.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    Question {index + 1}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {question.type.replace('_', ' ')}
                  </span>
                </div>

                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                  placeholder="Enter your question..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />

                {question.type === 'multiple_choice' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg"
                        />
                        {question.options!.length > 2 && (
                          <button
                            onClick={() => removeOption(question.id, optionIndex)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addOption(question.id)}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

                {question.type === 'rating' && (
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-medium"
                      >
                        {rating}
                      </div>
                    ))}
                  </div>
                )}

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={question.required}
                    onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">Required</span>
                </label>
              </div>

              <button
                onClick={() => removeQuestion(question.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No questions added yet. Click the buttons above to add questions.
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Distribution Channels</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={distributionChannels.email}
              onChange={(e) => setDistributionChannels({ ...distributionChannels, email: e.target.checked })}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">Email</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={distributionChannels.website}
              onChange={(e) => setDistributionChannels({ ...distributionChannels, website: e.target.checked })}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">Website Pop-up</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={distributionChannels.socialMedia}
              onChange={(e) => setDistributionChannels({ ...distributionChannels, socialMedia: e.target.checked })}
              className="rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">Social Media</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleSaveForm}
        disabled={!formTitle || questions.length === 0}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        <Save className="w-5 h-5" />
        <span>Save Feedback Form</span>
      </button>
    </div>
  )
}
