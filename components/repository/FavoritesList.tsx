'use client'

import { useEffect, useState } from 'react'
import { FileText, Download, Star, Trash2, Calendar } from 'lucide-react'

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteDocuments') || '[]')
    setFavorites(savedFavorites)
  }, [])

  const removeFavorite = (docId: string) => {
    const newFavorites = favorites.filter(id => id !== docId)
    setFavorites(newFavorites)
    localStorage.setItem('favoriteDocuments', JSON.stringify(newFavorites))
  }

  // Mock document data (in real app, would fetch by IDs)
  const mockFavoriteDocuments = favorites.map((id, index) => ({
    id,
    title: `Favorite Document ${index + 1}`,
    author: 'Research Team',
    publicationDate: new Date().toISOString(),
    abstract: 'This is a saved document for quick reference and easy access.',
    tags: ['functional beverages', 'research'],
  }))

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
        <p className="text-gray-600">
          Star documents from the main list to save them here for quick access.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        {favorites.length} favorite document{favorites.length !== 1 ? 's' : ''}
      </p>

      <div className="space-y-4">
        {mockFavoriteDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 flex items-start space-x-3">
                <FileText className="w-6 h-6 text-primary-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {doc.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>By {doc.author}</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(doc.publicationDate).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    {doc.abstract}
                  </p>

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

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => removeFavorite(doc.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
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
        ))}
      </div>
    </div>
  )
}
