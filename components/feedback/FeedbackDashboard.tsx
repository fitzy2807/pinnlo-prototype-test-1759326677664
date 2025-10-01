'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, MessageSquare, Star } from 'lucide-react'

interface FeedbackStats {
  totalResponses: number
  averageRating: number
  sentimentBreakdown: {
    positive: number
    neutral: number
    negative: number
  }
  responsesByDate: Array<{ date: string; count: number }>
  ratingDistribution: Array<{ rating: number; count: number }>
}

export default function FeedbackDashboard() {
  const [stats, setStats] = useState<FeedbackStats | null>(null)
  const [recentComments, setRecentComments] = useState<any[]>([])

  useEffect(() => {
    // Load feedback responses from localStorage
    const responses = JSON.parse(localStorage.getItem('feedbackResponses') || '[]')

    if (responses.length > 0) {
      const processedStats = processFeedbackData(responses)
      setStats(processedStats)

      // Get recent comments
      const comments = responses
        .filter((r: any) => Object.values(r.answers).some((a: any) => typeof a === 'string' && a.length > 20))
        .slice(0, 5)
      setRecentComments(comments)
    }
  }, [])

  const processFeedbackData = (responses: any[]): FeedbackStats => {
    const ratings: number[] = []
    const sentiments = { positive: 0, neutral: 0, negative: 0 }
    const dateMap = new Map<string, number>()

    responses.forEach((response: any) => {
      // Process ratings
      Object.values(response.answers).forEach((answer: any) => {
        if (typeof answer === 'number') {
          ratings.push(answer)
        } else if (typeof answer === 'string') {
          // Simple sentiment analysis
          const lowerAnswer = answer.toLowerCase()
          if (lowerAnswer.includes('great') || lowerAnswer.includes('excellent') || lowerAnswer.includes('amazing')) {
            sentiments.positive++
          } else if (lowerAnswer.includes('bad') || lowerAnswer.includes('poor') || lowerAnswer.includes('not')) {
            sentiments.negative++
          } else {
            sentiments.neutral++
          }
        }
      })

      // Process dates
      const date = new Date(response.submittedAt).toLocaleDateString()
      dateMap.set(date, (dateMap.get(date) || 0) + 1)
    })

    const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0

    const ratingDist = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: ratings.filter(r => r === rating).length
    }))

    const responsesByDate = Array.from(dateMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return {
      totalResponses: responses.length,
      averageRating: avgRating,
      sentimentBreakdown: sentiments,
      responsesByDate,
      ratingDistribution: ratingDist
    }
  }

  const COLORS = ['#10b981', '#fbbf24', '#ef4444']

  if (!stats) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-500">No feedback data available. Create and submit a feedback form first.</p>
      </div>
    )
  }

  const sentimentData = [
    { name: 'Positive', value: stats.sentimentBreakdown.positive },
    { name: 'Neutral', value: stats.sentimentBreakdown.neutral },
    { name: 'Negative', value: stats.sentimentBreakdown.negative },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Responses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalResponses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Positive Sentiment</p>
              <p className="text-3xl font-bold text-green-600">
                {Math.round((stats.sentimentBreakdown.positive / (stats.sentimentBreakdown.positive + stats.sentimentBreakdown.neutral + stats.sentimentBreakdown.negative)) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Comments</p>
              <p className="text-3xl font-bold text-gray-900">{recentComments.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Responses Over Time */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Responses Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.responsesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.ratingDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Comments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Comments</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {recentComments.map((comment, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-3 py-2">
                <p className="text-sm text-gray-700">
                  {Object.values(comment.answers).find((a: any) => typeof a === 'string' && a.length > 20)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.submittedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {recentComments.length === 0 && (
              <p className="text-sm text-gray-500">No comments available</p>
            )}
          </div>
        </div>
      </div>

      {/* Actionable Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actionable Insights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">✅ Strengths</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• High average rating of {stats.averageRating.toFixed(1)}/5</li>
              <li>• {stats.sentimentBreakdown.positive} positive feedback responses</li>
              <li>• Strong engagement with {stats.totalResponses} total responses</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Opportunities</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Address {stats.sentimentBreakdown.negative} negative feedback items</li>
              <li>• Increase response rate through promotional efforts</li>
              <li>• Focus on converting neutral responses to positive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
