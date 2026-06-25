
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import ResultPage from './pages/ResultPage'
import { GeneratedRoute } from './utils/generateRoute'

export default function App() {
  const [route, setRoute] = useState<GeneratedRoute | null>(null)
  const [lastInput, setLastInput] = useState<{ budget: number; days: number; preferences: string[] } | null>(null)

  const handleGenerate = (budget: number, days: number, preferences: string[]) => {
    setLastInput({ budget, days, preferences })
    // Dynamic import to avoid circular dependency
    import('./utils/generateRoute').then(({ generateRoute }) => {
      const result = generateRoute(budget, days, preferences)
      setRoute(result)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const handleRegenerate = () => {
    if (lastInput) {
      import('./utils/generateRoute').then(({ generateRoute }) => {
        const result = generateRoute(lastInput.budget, lastInput.days, lastInput.preferences)
        setRoute(result)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }

  const handleBack = () => {
    setRoute(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!route ? (
          <HomePage key="home" onGenerate={handleGenerate} />
        ) : (
          <ResultPage
            key="result"
            route={route}
            onRegenerate={handleRegenerate}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
