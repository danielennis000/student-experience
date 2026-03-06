import { useEffect, useState, useCallback, useRef } from 'react'
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

const TYPE_MS = 40
const DELETE_MS = 30

interface ThinkingStateProps {
  steps: string[]
  onComplete: () => void
  darkMode?: boolean
}

export default function ThinkingState({ steps, onComplete, darkMode = false }: ThinkingStateProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [displayedLength, setDisplayedLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const stableComplete = useCallback(onComplete, [onComplete])
  const stepIndexRef = useRef(stepIndex)
  stepIndexRef.current = stepIndex

  const currentText = steps[stepIndex] ?? ''
  const displayedText = currentText.slice(0, displayedLength)

  // Timer: after showing current step, trigger delete phase
  useEffect(() => {
    if (isDeleting || steps.length === 0) return
    const isLast = stepIndex >= steps.length - 1
    const delay = isLast ? 2000 : 2500 + Math.random() * 1200
    const t = setTimeout(() => setIsDeleting(true), delay)
    return () => clearTimeout(t)
  }, [stepIndex, isDeleting, steps.length])

  // Typing: when stepIndex changes and not deleting, type out 0 -> full length
  useEffect(() => {
    if (isDeleting || steps.length === 0) return
    const text = steps[stepIndex]
    if (!text) return
    setDisplayedLength(0)
    let len = 0
    const id = setInterval(() => {
      len += 1
      setDisplayedLength(len)
      if (len >= text.length) clearInterval(id)
    }, TYPE_MS)
    return () => clearInterval(id)
  }, [stepIndex, isDeleting])

  // Deleting: when isDeleting, remove one char at a time; when done, advance or onComplete
  useEffect(() => {
    if (!isDeleting) return
    const id = setInterval(() => {
      setDisplayedLength((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          setIsDeleting(false)
          const wasLast = stepIndexRef.current >= steps.length - 1
          if (wasLast) {
            stableComplete()
          } else {
            setStepIndex((s) => s + 1)
          }
          return 0
        }
        return prev - 1
      })
    }, DELETE_MS)
    return () => clearInterval(id)
  }, [isDeleting, steps.length, stableComplete])

  const orbColor = darkMode ? '#e85d8a' : '#8C1D40'
  return (
    <div className={`thinking-text ${darkMode ? 'thinking-text-dark' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mirage size="50" speed="7" color={orbColor} />
        <span className="mirage-status-text">{displayedText}</span>
      </div>
    </div>
  )
}
