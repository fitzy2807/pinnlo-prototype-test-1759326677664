'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { ThumbsUp, ThumbsDown, Minus, TrendingUp, Hash, MessageCircle } from 'lucide-react'

interface SentimentDashboardProps {
  filters: {
    demographics: string
    platform: string
    dateRange: string
  }
}

export default function SentimentDashboard({ filters }: SentimentDashboardProps) {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const mockData = generateMockSentimentData(filters)
    setData(mockData)
  }, [filters])

  const generateMockSentimentData = (filters: any) => {
    const sentimentOverTime = []
    const days = filters.dateRange === 'day' ? 24 : filters.dateRange === 'week' ? 7 : 30
    const timeUnit = filters.dateRange === 'day' ? 'h' : 'day'

    for (let i = 0; i < days; i++) {
      sentimentOverTime.push({
        time: `${i}${timeUnit}`,
        positive: Math.random() * 40 + 40,
        neutral: Math.random() * 30 + 20,
        negative: Math.random() * 20 + 10,
      })
    }

    const platformBreakdown = [
      { platform: 'Twitter/X', mentions: Math.floor(Math.random() * 5000) + 2000, sentiment: 0.65 },
      { platform: 'Instagram', mentions: Math.floor(Math.random() * 4000) + 1500, sentiment: 0.72 },
      { platform: 'Facebook', mentions: Math.floor(Math.random() * 3000) + 1000, sentiment: 0.58 },
      { platform: 'TikTok', mentions: Math.floor(Math.random() * 6000) + 3000, sentiment: 0.78 },
      { platform: 'Reddit', mentions: Math.floor(Math.random() * 2000) + 500, sentiment: 0.55 },
    ]

    const trendingTopics = [
      { topic: '#PlantBased', mentions: 12543, sentiment: 0.82, growth: '+45%' },
      { topic: '#Immunity', mentions: 9821, sentiment: 0.76, growth: '+38%' },
      { topic: '#SugarFree', mentions: 8234, sentiment: 0.71, growth: '+29%' },
      { topic: '#Sustainability', mentions: 7654, sentiment: 0.85, growth: '+52%' },
      { topic: '#EnergyBoost', mentions: 6789, sentiment: 0.68, growth: '+23%' },
    ]

    const keyMentions = [
      {
        platform: 'Twitter/X',
        user: '@healthyguru',
        text: 'Just tried the new immunity boost drink - absolutely love it! Natural ingredients and great taste. #FunctionalBeverage',
        sentiment: 'positive',
        engagement: 1243,
        time: '2h ago',
      },
      {
        platform: 'Instagram',
        user: '@fitlife_coach',
        text: 'My morning routine essential! This protein shake keeps me energized all day. Highly recommend! 💪',
        sentiment: 'positive',
        engagement: 892,
        time: '5h ago',
      },
      {
        platform: 'TikTok',
        user: '@wellness_vibes',
        text: 'Tried this new wellness drink and wow! The adaptogenic blend really helps with stress. 10/10',
        sentiment: 'positive',
        engagement: 2341,
        time: '8h ago',
      },
      {
        platform: 'Reddit',
        user: 'u/beverage_enthusiast',
        text: 'Good product but wish it came in more flavors. The current options are a bit limited.',
        sentiment: 'neutral',
        engagement: 234,
        time: '12h ago',
      },
      {
        platform: 'Facebook',
        user: 'Sarah M.',
        text: 'Not impressed with the new formula. Preferred the original version. Too sweet now.',
        sentiment: 'negative',
        engagement: 156,
        time: '1d ago',
      },
    ]

    const totalMentions = platformBreakdown.reduce((sum, p) => sum + p.mentions, 0)
    const avgSentiment = platformBreakdown.reduce((sum, p) => sum + p.sentiment, 0) / platformBreakdown.length

    return {
      summary: {
        totalMentions,
        avgSentiment: (avgSentiment * 100).toFixed(0),
        positivePercent: 65,
        neutralPercent: 25,
        negativePercent: 10,
        sentimentChange: '+12%',
      },
      sentimentOverTime,
      platformBreakdown,
      trendingTopics,
      keyMentions,
    }
  }

  if (!data) {
    return <div className="bg-white rounded-xl shadow-lg p-8 text-center">Loading sentiment data...</div>
  }

  const sentimentColors = ['#10b981', '#fbbf24', '#ef4444']

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Mentions</p>
              <p className="text-3xl font-bold text-gray-900">{data.summary.totalMentions.toLocaleString()}</p>
            </div>
            <MessageCircle className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sentiment Score</p>
              <p className="text-3xl font-bold text-green-600">{data.summary.avgSentiment}%</p>
            </div>
            <ThumbsUp className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Positive Mentions</p>
              <p className="text-3xl font-bold text-green-600">{data.summary.positivePercent}%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sentiment Change</p>
              <p className="text-3xl font-bold text-primary-600">{data.summary.sentimentChange}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Sentiment Over Time */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.sentimentOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" />
            <Area type="monotone" dataKey="neutral" stackId="1" stroke="#fbbf24" fill="#fbbf24" />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Platform Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.platformBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="platform" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="mentions" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
          <div className="space-y-3">
            {data.trendingTopics.map((topic: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Hash className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">{topic.topic}</p>
                    <p className="text-sm text-gray-600">{topic.mentions.toLocaleString()} mentions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{topic.growth}</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${topic.sentiment * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{(topic.sentiment * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Mentions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Key Mentions</h3>
        <div className="space-y-4">
          {data.keyMentions.map((mention: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{mention.user}</span>
                  <span className="text-sm text-gray-500">• {mention.platform}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    mention.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                    mention.sentiment === 'neutral' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {mention.sentiment}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{mention.time}</span>
              </div>
              <p className="text-gray-700 mb-2">{mention.text}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>❤️ {mention.engagement} engagements</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actionable Insights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">✅ Positive Signals</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Strong engagement on TikTok (78% positive sentiment)</li>
              <li>• #Sustainability topic seeing 52% growth</li>
              <li>• Health influencers actively promoting products</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">⚠️ Areas for Improvement</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Flavor variety requests increasing (Reddit feedback)</li>
              <li>• Some concerns about new formula changes</li>
              <li>• Price point mentioned as barrier by 15% of comments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
