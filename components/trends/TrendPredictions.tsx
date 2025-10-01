'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, TrendingDown, AlertCircle, Brain } from 'lucide-react'

interface TrendPredictionsProps {
  filters: {
    timeframe: string
    demographics: string
    productCategory: string
  }
}

export default function TrendPredictions({ filters }: TrendPredictionsProps) {
  const [predictions, setPredictions] = useState<any>(null)

  useEffect(() => {
    // Generate mock predictions based on filters
    const mockPredictions = generateMockPredictions(filters)
    setPredictions(mockPredictions)
  }, [filters])

  const generateMockPredictions = (filters: any) => {
    const categories = ['Energy', 'Protein', 'Wellness', 'Hydration', 'Immunity']

    const growthTrends = categories.map(category => ({
      category,
      currentGrowth: Math.random() * 30 + 5,
      predictedGrowth: Math.random() * 40 + 10,
      confidence: Math.random() * 20 + 75,
    }))

    const timeSeriesData = []
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    for (let i = 0; i < 12; i++) {
      timeSeriesData.push({
        month: months[i],
        historical: Math.random() * 50 + 30,
        predicted: Math.random() * 60 + 40,
      })
    }

    const consumerPreferences = [
      { preference: 'Natural Ingredients', score: 92 },
      { preference: 'Low Sugar', score: 88 },
      { preference: 'Plant-Based', score: 85 },
      { preference: 'Sustainability', score: 82 },
      { preference: 'Functional Benefits', score: 90 },
      { preference: 'Clean Label', score: 87 },
    ]

    const emergingTrends = [
      {
        title: 'Adaptogenic Beverages',
        growth: '+145%',
        description: 'Stress-relief and cognitive function enhancement driving demand',
        impact: 'high',
      },
      {
        title: 'Gut Health Probiotics',
        growth: '+98%',
        description: 'Digestive wellness remains top priority for health-conscious consumers',
        impact: 'high',
      },
      {
        title: 'Plant-Based Proteins',
        growth: '+76%',
        description: 'Sustainability concerns fueling plant protein adoption',
        impact: 'medium',
      },
      {
        title: 'CBD-Infused Drinks',
        growth: '+112%',
        description: 'Relaxation and wellness benefits attracting mainstream interest',
        impact: 'high',
      },
    ]

    return {
      growthTrends,
      timeSeriesData,
      consumerPreferences,
      emergingTrends,
    }
  }

  if (!predictions) {
    return <div className="bg-white rounded-xl shadow-lg p-8 text-center">Loading predictions...</div>
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Alert */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
        <div className="flex items-start space-x-3">
          <Brain className="w-6 h-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Generated Insights</h3>
            <p className="text-gray-700">
              Based on historical data and current market trends, we predict a <strong>32% growth</strong> in the
              functional beverage sector over the next quarter. Key drivers include increased demand for
              immunity-boosting products and plant-based options.
            </p>
          </div>
        </div>
      </div>

      {/* Growth Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Growth Predictions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={predictions.growthTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis label={{ value: 'Growth %', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="currentGrowth" fill="#94a3b8" name="Current Growth" />
            <Bar dataKey="predictedGrowth" fill="#0ea5e9" name="Predicted Growth" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Time Series Forecast */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          12-Month Market Forecast ({filters.timeframe})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictions.timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Market Index', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="historical" stroke="#64748b" strokeWidth={2} name="Historical Data" />
            <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="AI Prediction" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Consumer Preferences Radar */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consumer Preference Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={predictions.consumerPreferences}>
            <PolarGrid />
            <PolarAngleAxis dataKey="preference" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Preference Score" dataKey="score" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Emerging Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emerging Trends</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {predictions.emergingTrends.map((trend: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{trend.title}</h4>
                <span className={`flex items-center space-x-1 text-sm font-medium ${
                  trend.impact === 'high' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{trend.growth}</span>
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
              <span className={`inline-block px-2 py-1 text-xs rounded ${
                trend.impact === 'high'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {trend.impact.toUpperCase()} IMPACT
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actionable Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Invest in Immunity Products</h4>
              <p className="text-sm text-gray-600">
                Consumer demand for immunity-boosting beverages shows 112% YoY growth. Consider expanding product line.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Focus on Clean Labels</h4>
              <p className="text-sm text-gray-600">
                87% preference score for clean label products. Transparency in ingredients is critical for market success.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Sustainable Packaging Initiative</h4>
              <p className="text-sm text-gray-600">
                82% of consumers prioritize sustainability. Eco-friendly packaging can differentiate your brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
