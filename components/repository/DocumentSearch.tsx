'use client'

import { Search } from 'lucide-react'

interface DocumentSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    topic: string
    dateRange: string
  }
  setFilters: (filters: any) => void
}

export default function DocumentSearch({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
}: DocumentSearchProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Keywords
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic
          </label>
          <select
            value={filters.topic}
            onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Topics</option>
            <option value="market-research">Market Research</option>
            <option value="consumer-trends">Consumer Trends</option>
            <option value="nutrition">Nutrition Science</option>
            <option value="regulations">Regulations & Compliance</option>
            <option value="innovation">Product Innovation</option>
            <option value="sustainability">Sustainability</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>
    </div>
  )
}
