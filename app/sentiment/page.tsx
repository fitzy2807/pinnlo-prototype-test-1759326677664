'use client'

import { useState } from 'react'
import SentimentDashboard from '@/components/sentiment/SentimentDashboard'
import SentimentFilters from '@/components/sentiment/SentimentFilters'
import AlertSetup from '@/components/sentiment/AlertSetup'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export default function SentimentPage() {
  const [filters, setFilters] = useState({
    demographics: 'all',
    platform: 'all',
    dateRange: 'week',
  })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Social Media Sentiment Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time sentiment analysis across social media platforms to empower marketing teams with insights
        </p>
      </div>

      <Tabs value="dashboard" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="alerts">Alert Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SentimentFilters filters={filters} setFilters={setFilters} />
            </div>

            <div className="lg:col-span-3">
              <SentimentDashboard filters={filters} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <AlertSetup />
        </TabsContent>
      </Tabs>
    </div>
  )
}
