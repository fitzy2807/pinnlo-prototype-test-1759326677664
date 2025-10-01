'use client'

interface TrendFiltersProps {
  filters: {
    timeframe: string
    demographics: string
    productCategory: string
  }
  setFilters: (filters: any) => void
}

export default function TrendFilters({ filters, setFilters }: TrendFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Timeframe
        </label>
        <select
          value={filters.timeframe}
          onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
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
          <option value="18-24">Age 18-24</option>
          <option value="25-34">Age 25-34</option>
          <option value="35-44">Age 35-44</option>
          <option value="45-54">Age 45-54</option>
          <option value="55+">Age 55+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Category
        </label>
        <select
          value={filters.productCategory}
          onChange={(e) => setFilters({ ...filters, productCategory: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="energy">Energy Drinks</option>
          <option value="protein">Protein Shakes</option>
          <option value="wellness">Wellness Drinks</option>
          <option value="hydration">Hydration</option>
          <option value="immunity">Immunity Boosters</option>
        </select>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => setFilters({
            timeframe: 'quarterly',
            demographics: 'all',
            productCategory: 'all',
          })}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
