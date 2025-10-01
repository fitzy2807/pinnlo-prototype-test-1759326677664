'use client'

import { useState } from 'react'
import FormulaBuilder from '@/components/simulator/FormulaBuilder'
import SimulationResults from '@/components/simulator/SimulationResults'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export default function SimulatorPage() {
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('builder')

  const handleSimulationComplete = (result: any) => {
    setSimulationResult(result)
    setActiveTab('results')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Beverage Formula Simulation
        </h1>
        <p className="text-gray-600">
          Innovate with consumer insights by simulating new beverage formulas and predicting acceptance rates
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="builder">Formula Builder</TabsTrigger>
          <TabsTrigger value="results">Simulation Results</TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <FormulaBuilder onSimulationComplete={handleSimulationComplete} />
        </TabsContent>

        <TabsContent value="results">
          {simulationResult ? (
            <SimulationResults result={simulationResult} />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500">Run a simulation to see results here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
