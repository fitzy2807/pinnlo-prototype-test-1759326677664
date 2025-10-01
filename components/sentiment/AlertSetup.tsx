'use client'

import { useState } from 'react'
import { Bell, Plus, Trash2 } from 'lucide-react'

interface Alert {
  id: string
  topic: string
  threshold: number
  channel: string
  active: boolean
}

export default function AlertSetup() {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', topic: 'Product Launch', threshold: 100, channel: 'email', active: true },
    { id: '2', topic: 'Negative Sentiment Spike', threshold: 50, channel: 'slack', active: true },
  ])

  const [newAlert, setNewAlert] = useState({
    topic: '',
    threshold: 50,
    channel: 'email',
  })

  const addAlert = () => {
    if (!newAlert.topic) {
      alert('Please enter a topic for the alert')
      return
    }

    const alert: Alert = {
      id: Date.now().toString(),
      ...newAlert,
      active: true,
    }

    setAlerts([...alerts, alert])
    setNewAlert({ topic: '', threshold: 50, channel: 'email' })
  }

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id))
  }

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Alert</h3>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic/Keyword
            </label>
            <input
              type="text"
              value={newAlert.topic}
              onChange={(e) => setNewAlert({ ...newAlert, topic: e.target.value })}
              placeholder="e.g., #ProductName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mention Threshold
            </label>
            <input
              type="number"
              value={newAlert.threshold}
              onChange={(e) => setNewAlert({ ...newAlert, threshold: parseInt(e.target.value) })}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Channel
            </label>
            <select
              value={newAlert.channel}
              onChange={(e) => setNewAlert({ ...newAlert, channel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="email">Email</option>
              <option value="slack">Slack</option>
              <option value="sms">SMS</option>
              <option value="push">Push Notification</option>
            </select>
          </div>
        </div>

        <button
          onClick={addAlert}
          className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Alert</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>

        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No alerts configured. Create your first alert above.
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.active ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Bell className={`w-5 h-5 ${alert.active ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">{alert.topic}</h4>
                    <p className="text-sm text-gray-600">
                      Alert when mentions exceed {alert.threshold} • via {alert.channel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      alert.active
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {alert.active ? 'Active' : 'Inactive'}
                  </button>

                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <h4 className="font-semibold text-gray-900 mb-2">How Alerts Work</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Alerts are triggered when mention count exceeds your threshold within a 1-hour period</li>
          <li>• You'll receive notifications via your chosen channel with 95% accuracy</li>
          <li>• Sentiment analysis is included in alert details to provide context</li>
          <li>• Alerts can be temporarily disabled without deleting them</li>
        </ul>
      </div>
    </div>
  )
}
