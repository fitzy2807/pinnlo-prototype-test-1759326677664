'use client'

interface SentimentFiltersProps {
  filters: {
    demographics: string
    platform: string
    dateRange: string
  }
  setFilters: (filters: any) => void
}

export default function SentimentFilters({ filters, setFilters }: SentimentFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Platform
        </label>
        <select
          value={filters.platform}
          onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Platforms</option>
          <option value="twitter">Twitter/X</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
          <option value="reddit">Reddit</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Demographics
        </label>
        <select
          value={filters.demographics}
          onChange={(e) => setFilters({ ...filters, demographics: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Demographics</option>
          <option value="gen-z">Gen Z (18-24)</option>
          <option value="millennials">Millennials (25-40)</option>
          <option value="gen-x">Gen X (41-56)</option>
          <option value="boomers">Boomers (57+)</option>
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
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => setFilters({
            demographics: 'all',
            platform: 'all',
            dateRange: 'week',
          })}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
