'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { CheckCircle, AlertCircle, TrendingUp, DollarSign } from 'lucide-react'

interface SimulationResultsProps {
  result: any
}

export default function SimulationResults({ result }: SimulationResultsProps) {
  const demographicData = Object.entries(result.demographics).map(([key, value]) => ({
    demographic: key,
    acceptanceRate: parseFloat(value as string),
  }))

  const scoreData = [
    { metric: 'Acceptance Rate', score: parseFloat(result.acceptanceRate) },
    { metric: 'Market Fit', score: parseFloat(result.marketFit) * 10 },
    { metric: 'Health Score', score: 85 },
    { metric: 'Innovation', score: 78 },
    { metric: 'Taste Appeal', score: 82 },
  ]

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Predicted Acceptance Rate
            </h2>
            <div className="flex items-baseline space-x-2">
              <span className="text-6xl font-bold text-green-600">
                {result.acceptanceRate}%
              </span>
              <span className="text-xl text-gray-600">
                ({result.confidence}% confidence)
              </span>
            </div>
          </div>
          <div className="text-8xl">🎯</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Market Fit Score</span>
            <TrendingUp className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{result.marketFit}/10</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Ingredients</span>
            <span className="text-2xl">🧪</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{result.ingredients.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Est. Retail Price</span>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${result.estimatedRetailPrice}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Confidence Level</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{result.confidence}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Demographic Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Acceptance by Demographics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demographicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="demographic" angle={-15} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="acceptanceRate" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Metrics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={scoreData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Formula Details */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Formula: {result.formulaName}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Ingredients:</h4>
            <div className="space-y-2">
              {result.ingredients.map((ing: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-900">{ing.name}</span>
                  <span className="text-sm text-gray-600">
                    {ing.amount}{ing.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Breakdown by Category:</h4>
            <div className="space-y-2">
              {['base', 'protein', 'functional', 'flavor', 'sweetener'].map(category => {
                const count = result.ingredients.filter((i: any) => i.category === category).length
                if (count === 0) return null
                return (
                  <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-900 capitalize">{category}</span>
                    <span className="text-sm font-medium text-primary-600">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Opportunities</h3>
          </div>
          <ul className="space-y-2">
            {result.opportunities.map((opportunity: string, index: number) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-yellow-600 mt-0.5">→</span>
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Consumer Comments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Simulated Consumer Feedback
        </h3>
        <div className="space-y-3">
          {result.consumerComments.map((comment: any, index: number) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                comment.sentiment === 'positive'
                  ? 'bg-green-50 border-green-500'
                  : comment.sentiment === 'neutral'
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🔬 Refine Formula</h4>
            <p className="text-sm text-gray-600">
              Adjust ingredient ratios based on demographic preferences
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🧪 Lab Testing</h4>
            <p className="text-sm text-gray-600">
              Create physical samples for taste and stability testing
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📊 Market Research</h4>
            <p className="text-sm text-gray-600">
              Conduct focus groups with target demographics
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
