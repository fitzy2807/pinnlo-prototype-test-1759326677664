import Link from 'next/link'
import {
  MessageSquare,
  TrendingUp,
  BarChart3,
  Beaker,
  BookOpen
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      id: 1,
      title: 'Consumer Feedback Tool',
      description: 'Gather real-time feedback from consumers to identify areas for product improvement',
      icon: MessageSquare,
      href: '/feedback',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Market Trend Prediction',
      description: 'AI-powered predictions about market trends and emerging consumer preferences',
      icon: TrendingUp,
      href: '/trends',
      color: 'bg-purple-500',
    },
    {
      id: 3,
      title: 'Social Media Sentiment',
      description: 'Real-time sentiment analysis across social media platforms',
      icon: BarChart3,
      href: '/sentiment',
      color: 'bg-green-500',
    },
    {
      id: 4,
      title: 'Formula Simulation',
      description: 'Create and simulate new beverage formulas with consumer insights',
      icon: Beaker,
      href: '/simulator',
      color: 'bg-orange-500',
    },
    {
      id: 5,
      title: 'Research Repository',
      description: 'Comprehensive database of research and insights for functional beverages',
      icon: BookOpen,
      href: '/repository',
      color: 'bg-pink-500',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold text-gray-900">
          Functional Beverage Insights Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leading digital platform for predictive analytics in the functional beverage industry,
          empowering brands to innovate and respond effectively to consumer demands
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">50%</div>
            <div className="text-sm text-gray-600">Market Leadership Goal</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">90%</div>
            <div className="text-sm text-gray-600">Client Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">$200B+</div>
            <div className="text-sm text-gray-600">Market Opportunity</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link
              key={feature.id}
              href={feature.href}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </Link>
          )
        })}
      </section>

      {/* Strategic Objectives */}
      <section className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Strategic Objectives</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-4xl">🚀</div>
            <h3 className="font-semibold text-lg">Drive Innovation</h3>
            <p className="text-gray-600">
              Provide real-time data analytics and trend forecasts for the functional beverage sector
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">🎯</div>
            <h3 className="font-semibold text-lg">Market Leadership</h3>
            <p className="text-gray-600">
              Achieve 50% market utilization within five years through unparalleled predictive capabilities
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">⭐</div>
            <h3 className="font-semibold text-lg">Client Satisfaction</h3>
            <p className="text-gray-600">
              Maintain 90% satisfaction rate through user-friendly and actionable market data
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
