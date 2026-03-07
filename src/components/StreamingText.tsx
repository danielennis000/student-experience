import { useState, useEffect, useRef } from 'react'

interface StreamingTextProps {
  text: string
  speed?: number
  onComplete?: () => void
  renderChar?: (visibleText: string) => React.ReactNode
}

export default function StreamingText({ text, speed = 12, onComplete, renderChar }: StreamingTextProps) {
  const [charIndex, setCharIndex] = useState(0)
  const completedRef = useRef(false)

  useEffect(() => {
    setCharIndex(0)
    completedRef.current = false
  }, [text])

  useEffect(() => {
    if (charIndex >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true
        onComplete?.()
      }
      return
    }
    const timer = setTimeout(() => setCharIndex((i) => i + 1), speed)
    return () => clearTimeout(timer)
  }, [charIndex, text, speed, onComplete])

  const visible = text.slice(0, charIndex)

  if (renderChar) return <>{renderChar(visible)}</>

  return <>{visible}</>
}
