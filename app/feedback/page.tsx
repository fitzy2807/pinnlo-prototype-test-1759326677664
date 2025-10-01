'use client'

import { useState } from 'react'
import FeedbackForm from '@/components/feedback/FeedbackForm'
import FeedbackDashboard from '@/components/feedback/FeedbackDashboard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState('create')

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Real-Time Consumer Feedback Tool
        </h1>
        <p className="text-gray-600">
          Enhance product quality assurance by gathering and analyzing real-time consumer feedback
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="create">Create Feedback Form</TabsTrigger>
          <TabsTrigger value="dashboard">View Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <FeedbackForm />
        </TabsContent>

        <TabsContent value="dashboard">
          <FeedbackDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
