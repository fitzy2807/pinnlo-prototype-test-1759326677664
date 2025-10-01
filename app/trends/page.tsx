'use client'

import { useState } from 'react'
import TrendPredictions from '@/components/trends/TrendPredictions'
import TrendFilters from '@/components/trends/TrendFilters'
import { Calendar, TrendingUp } from 'lucide-react'

export default function TrendsPage() {
  const [filters, setFilters] = useState({
    timeframe: 'quarterly',
    demographics: 'all',
    productCategory: 'all',
  })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Market Trend Prediction
        </h1>
        <p className="text-gray-600">
          Stay ahead of consumer demands with real-time predictive analytics and trend forecasts
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <TrendFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="lg:col-span-3">
          <TrendPredictions filters={filters} />
        </div>
      </div>
    </div>
  )
}
