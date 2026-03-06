import { useEffect, useState, useCallback } from 'react'
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

interface ThinkingStateProps {
  steps: string[]
  onComplete: () => void
}

export default function ThinkingState({ steps, onComplete }: ThinkingStateProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const stableComplete = useCallback(onComplete, [onComplete])

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 1200)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(stableComplete, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length, stableComplete])

  return (
    <div className="thinking-text" key={currentStep}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mirage size="50" speed="2.5" color="#8C1D40" />
        <span className="mirage-status-text">{steps[currentStep]}</span>
      </div>
    </div>
  )
}
