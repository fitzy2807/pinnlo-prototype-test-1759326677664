'use client'

import { useState } from 'react'
import DocumentSearch from '@/components/repository/DocumentSearch'
import DocumentList from '@/components/repository/DocumentList'
import FavoritesList from '@/components/repository/FavoritesList'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export default function RepositoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    topic: 'all',
    dateRange: 'all',
  })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Research Repository for Functional Beverages
        </h1>
        <p className="text-gray-600">
          Comprehensive database of educational materials and research for informed decision making
        </p>
      </div>

      <DocumentSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />

      <Tabs value="all" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DocumentList searchQuery={searchQuery} filters={filters} />
        </TabsContent>

        <TabsContent value="favorites">
          <FavoritesList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
