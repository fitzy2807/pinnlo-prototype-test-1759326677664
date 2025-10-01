'use client'

import { createContext, useContext, ReactNode } from 'react'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export function Tabs({
  value,
  onValueChange,
  children,
}: {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="space-y-4">{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="flex space-x-2 border-b border-gray-200 bg-white rounded-t-xl px-4">
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const isActive = context.value === value

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={`px-6 py-3 font-medium transition-colors relative ${
        isActive
          ? 'text-primary-600'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
      )}
    </button>
  )
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  if (context.value !== value) return null

  return <div className="mt-4">{children}</div>
}
