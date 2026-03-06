import { useEffect, useState, useCallback } from 'react'
import { Typography, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const { Text } = Typography

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
    <div style={{ padding: '16px 0' }}>
      <div className="shimmer-container">
        <div className="shimmer-bar" style={{ width: '80%' }} />
        <div className="shimmer-bar" style={{ width: '60%', animationDelay: '0.2s' }} />
        <div className="shimmer-bar" style={{ width: '40%', animationDelay: '0.4s' }} />
      </div>
      <div className="thinking-text" key={currentStep}>
        <Space>
          <LoadingOutlined style={{ color: '#8C1D40' }} />
          <Text type="secondary">{steps[currentStep]}</Text>
        </Space>
      </div>
    </div>
  )
}
