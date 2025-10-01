'use client'

import { useState } from 'react'
import { Plus, Trash2, Play, Save } from 'lucide-react'

interface Ingredient {
  id: string
  name: string
  category: string
  amount: number
  unit: string
}

interface FormulaBuilderProps {
  onSimulationComplete: (result: any) => void
}

export default function FormulaBuilder({ onSimulationComplete }: FormulaBuilderProps) {
  const [formulaName, setFormulaName] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  const ingredientLibrary = {
    base: ['Water', 'Coconut Water', 'Green Tea', 'Almond Milk', 'Oat Milk'],
    protein: ['Whey Protein', 'Pea Protein', 'Hemp Protein', 'Collagen Peptides'],
    functional: ['Ashwagandha', 'Rhodiola', 'L-Theanine', 'Vitamin C', 'Vitamin D', 'Probiotics'],
    flavor: ['Natural Berry', 'Citrus', 'Vanilla', 'Mint', 'Ginger', 'Turmeric'],
    sweetener: ['Stevia', 'Monk Fruit', 'Honey', 'Agave', 'Cane Sugar'],
  }

  const [selectedCategory, setSelectedCategory] = useState('base')
  const [selectedIngredient, setSelectedIngredient] = useState('')

  const addIngredient = () => {
    if (!selectedIngredient) return

    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: selectedIngredient,
      category: selectedCategory,
      amount: 100,
      unit: selectedCategory === 'base' ? 'ml' : 'mg',
    }

    setIngredients([...ingredients, newIngredient])
    setSelectedIngredient('')
  }

  const updateIngredient = (id: string, amount: number) => {
    setIngredients(ingredients.map(ing => ing.id === id ? { ...ing, amount } : ing))
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id))
  }

  const runSimulation = async () => {
    if (!formulaName || ingredients.length === 0) {
      alert('Please add a formula name and at least one ingredient')
      return
    }

    setIsSimulating(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const result = generateSimulationResult()
    onSimulationComplete(result)

    setIsSimulating(false)
  }

  const generateSimulationResult = () => {
    // Calculate acceptance rate based on ingredients
    let baseScore = 60

    // Bonus for functional ingredients
    const functionalCount = ingredients.filter(i => i.category === 'functional').length
    baseScore += functionalCount * 5

    // Bonus for natural sweeteners
    const hasNaturalSweetener = ingredients.some(i =>
      i.name === 'Stevia' || i.name === 'Monk Fruit'
    )
    if (hasNaturalSweetener) baseScore += 10

    // Bonus for plant-based proteins
    const hasPlantProtein = ingredients.some(i =>
      i.name === 'Pea Protein' || i.name === 'Hemp Protein'
    )
    if (hasPlantProtein) baseScore += 8

    const acceptanceRate = Math.min(95, baseScore + Math.random() * 15)

    return {
      formulaName,
      ingredients,
      acceptanceRate: acceptanceRate.toFixed(1),
      confidence: (Math.random() * 10 + 85).toFixed(1),
      demographics: {
        'Gen Z (18-24)': (acceptanceRate + Math.random() * 10 - 5).toFixed(1),
        'Millennials (25-40)': (acceptanceRate + Math.random() * 10 - 5).toFixed(1),
        'Gen X (41-56)': (acceptanceRate + Math.random() * 10 - 5).toFixed(1),
        'Boomers (57+)': (acceptanceRate + Math.random() * 10 - 5).toFixed(1),
      },
      strengths: [
        'Natural ingredient profile appeals to health-conscious consumers',
        'Functional benefits align with current market trends',
        'Clean label positioning supports premium pricing',
      ],
      opportunities: [
        'Consider adding probiotics for gut health positioning',
        'Flavor profile could be enhanced with adaptogenic herbs',
        'Sustainable packaging would increase appeal to eco-conscious segment',
      ],
      consumerComments: [
        { text: 'Love the natural ingredients! Would definitely try this.', sentiment: 'positive' },
        { text: 'Great functional benefits, but curious about the taste.', sentiment: 'neutral' },
        { text: 'Price point might be a concern for daily consumption.', sentiment: 'neutral' },
        { text: 'Perfect for post-workout recovery!', sentiment: 'positive' },
      ],
      marketFit: (acceptanceRate / 100 * 10).toFixed(1),
      estimatedRetailPrice: (ingredients.length * 0.5 + 2.5).toFixed(2),
    }
  }

  const saveFormula = () => {
    const formula = {
      name: formulaName,
      ingredients,
      createdAt: new Date().toISOString(),
    }

    const savedFormulas = JSON.parse(localStorage.getItem('savedFormulas') || '[]')
    localStorage.setItem('savedFormulas', JSON.stringify([...savedFormulas, formula]))

    alert('Formula saved successfully!')
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Column: Builder */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formula Name
            </label>
            <input
              type="text"
              value={formulaName}
              onChange={(e) => setFormulaName(e.target.value)}
              placeholder="e.g., Energy Boost Pro"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add Ingredients</h3>

            <div className="space-y-3">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setSelectedIngredient('')
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="base">Base Liquid</option>
                <option value="protein">Protein Source</option>
                <option value="functional">Functional Ingredients</option>
                <option value="flavor">Flavor</option>
                <option value="sweetener">Sweetener</option>
              </select>

              <div className="flex space-x-2">
                <select
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select ingredient...</option>
                  {ingredientLibrary[selectedCategory as keyof typeof ingredientLibrary].map(ing => (
                    <option key={ing} value={ing}>{ing}</option>
                  ))}
                </select>

                <button
                  onClick={addIngredient}
                  disabled={!selectedIngredient}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Formula Composition</h3>
            <span className="text-sm text-gray-600">{ingredients.length} ingredients</span>
          </div>

          {ingredients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No ingredients added yet. Start building your formula above.
            </div>
          ) : (
            <div className="space-y-2">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{ingredient.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{ingredient.category}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={ingredient.amount}
                      onChange={(e) => updateIngredient(ingredient.id, parseInt(e.target.value))}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                      min="1"
                    />
                    <span className="text-sm text-gray-600">{ingredient.unit}</span>

                    <button
                      onClick={() => removeIngredient(ingredient.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Actions and Preview */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Formula Preview</h3>

          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">{formulaName || 'Unnamed Formula'}</h4>
            <div className="space-y-1">
              {ingredients.map(ing => (
                <div key={ing.id} className="text-sm text-gray-600">
                  • {ing.name} ({ing.amount}{ing.unit})
                </div>
              ))}
              {ingredients.length === 0 && (
                <p className="text-sm text-gray-500 italic">No ingredients added</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={runSimulation}
              disabled={isSimulating || !formulaName || ingredients.length === 0}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>{isSimulating ? 'Running Simulation...' : 'Run Simulation'}</span>
            </button>

            <button
              onClick={saveFormula}
              disabled={!formulaName || ingredients.length === 0}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Save Formula</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredient Benefits</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">🌱 Natural Ingredients</h4>
              <p className="text-blue-700">Appeal to health-conscious consumers seeking clean labels</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">💪 Functional Benefits</h4>
              <p className="text-green-700">Adaptogens and vitamins enhance product differentiation</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">🌿 Plant-Based Options</h4>
              <p className="text-purple-700">Sustainability positioning attracts eco-conscious buyers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
