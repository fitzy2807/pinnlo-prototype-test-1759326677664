'use client'

import { useEffect, useState } from 'react'
import { FileText, Download, Star, Share2, Calendar, Tag } from 'lucide-react'

interface Document {
  id: string
  title: string
  author: string
  publicationDate: string
  topic: string
  abstract: string
  relevanceRating: number
  downloadUrl: string
  tags: string[]
}

interface DocumentListProps {
  searchQuery: string
  filters: {
    topic: string
    dateRange: string
  }
}

export default function DocumentList({ searchQuery, filters }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteDocuments') || '[]')
    setFavorites(savedFavorites)

    // Generate mock documents
    const mockDocs = generateMockDocuments()
    setDocuments(mockDocs)
  }, [])

  const generateMockDocuments = (): Document[] => {
    const topics = ['market-research', 'consumer-trends', 'nutrition', 'regulations', 'innovation', 'sustainability']
    const documents: Document[] = []

    const titles = [
      'Global Functional Beverage Market Analysis 2024',
      'Consumer Preferences in Health-Focused Drinks',
      'The Rise of Adaptogenic Beverages: Market Insights',
      'Nutritional Benefits of Plant-Based Protein Drinks',
      'Regulatory Framework for Functional Beverages in the US',
      'Innovation Trends in the Wellness Drink Sector',
      'Sustainability Practices in Beverage Manufacturing',
      'Probiotics in Beverages: Health Claims and Evidence',
      'Sugar Reduction Strategies in Functional Drinks',
      'Packaging Innovations for Eco-Friendly Beverages',
      'Consumer Behavior Analysis: Gen Z and Functional Beverages',
      'Clinical Studies on Immunity-Boosting Ingredients',
      'Market Entry Strategies for New Beverage Brands',
      'Clean Label Movement: Impact on Product Formulation',
      'Future of Energy Drinks: Natural Alternatives',
    ]

    const authors = [
      'Dr. Sarah Johnson',
      'Market Research Institute',
      'Prof. Michael Chen',
      'Beverage Innovation Lab',
      'FDA Research Team',
      'Sustainability Council',
      'Health & Nutrition Journal',
    ]

    titles.forEach((title, index) => {
      documents.push({
        id: `doc-${index}`,
        title,
        author: authors[index % authors.length],
        publicationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        topic: topics[index % topics.length],
        abstract: 'This comprehensive study examines the latest trends, consumer preferences, and market dynamics in the functional beverage industry. Key findings include insights into emerging ingredients, sustainability concerns, and regulatory considerations.',
        relevanceRating: Math.floor(Math.random() * 3) + 3,
        downloadUrl: '#',
        tags: ['functional beverages', 'market analysis', 'consumer trends', 'health'].slice(0, Math.floor(Math.random() * 3) + 2),
      })
    })

    return documents
  }

  const toggleFavorite = (docId: string) => {
    const newFavorites = favorites.includes(docId)
      ? favorites.filter(id => id !== docId)
      : [...favorites, docId]

    setFavorites(newFavorites)
    localStorage.setItem('favoriteDocuments', JSON.stringify(newFavorites))
  }

  const shareDocument = (doc: Document) => {
    if (navigator.share) {
      navigator.share({
        title: doc.title,
        text: doc.abstract,
        url: window.location.href,
      })
    } else {
      alert(`Share: ${doc.title}`)
    }
  }

  const filterDocuments = () => {
    let filtered = documents

    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (filters.topic !== 'all') {
      filtered = filtered.filter(doc => doc.topic === filters.topic)
    }

    if (filters.dateRange !== 'all') {
      const now = Date.now()
      const ranges = {
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        quarter: 90 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000,
      }
      const range = ranges[filters.dateRange as keyof typeof ranges]
      filtered = filtered.filter(doc => now - new Date(doc.publicationDate).getTime() < range)
    }

    return filtered
  }

  const filteredDocs = filterDocuments()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredDocs.length} documents found
        </p>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-500">No documents found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-6 h-6 text-primary-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {doc.title}
                      </h3>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center space-x-1">
                          <span>By {doc.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(doc.publicationDate).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          {[...Array(doc.relevanceRating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3">
                        {doc.abstract}
                      </p>

                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {doc.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-600 capitalize">
                  {doc.topic.replace('-', ' ')}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(doc.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(doc.id)
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${favorites.includes(doc.id) ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => shareDocument(doc)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => alert('Download initiated')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
