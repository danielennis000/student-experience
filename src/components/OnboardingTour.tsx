import { useState, useEffect } from 'react'
import { Modal, Button, Typography } from 'antd'
import {
  LeftOutlined,
  MessageOutlined,
  InboxOutlined,
  MenuOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'

const { Title, Text } = Typography

const STEP_ICON_STYLE = { fontSize: 48, color: '#8C1D40' }
const STEP_CONTENT_MIN_HEIGHT = 140

const TOUR_STEPS: { title: string; content: string; icon: ReactNode }[] = [
  {
    title: 'Ask anything here',
    content: 'Type your question in this box—like "How do I accept my admission?" or "When is the FAFSA deadline?"—and press Enter or tap the send button.',
    icon: <MessageOutlined style={STEP_ICON_STYLE} />,
  },
  {
    title: 'Personalized for you',
    content: 'I have access to information for the courses you are enrolled in, past grades, real-time searches about campus events, and tools to take action on your behalf.',
    icon: <InboxOutlined style={STEP_ICON_STYLE} />,
  },
  {
    title: 'Use the menu for new chats',
    content: 'Open the menu on the left to start a new conversation anytime. Once you’re enrolled in courses, you’ll see projects and chat history here too.',
    icon: <MenuOutlined style={STEP_ICON_STYLE} />,
  },
  {
    title: "You're all set",
    content: 'Try asking anything! I’m here to help you get started on your journey at ASU.',
    icon: <CheckCircleOutlined style={STEP_ICON_STYLE} />,
  },
]

interface OnboardingTourProps {
  open: boolean
  onClose: () => void
  darkMode?: boolean
}

export default function OnboardingTour({ open, onClose, darkMode }: OnboardingTourProps) {
  const [step, setStep] = useState(0)
  const current = TOUR_STEPS[step]

  useEffect(() => {
    if (open) setStep(0)
  }, [open])
  const isLast = step === TOUR_STEPS.length - 1

  const handleNext = () => {
    if (isLast) onClose()
    else setStep((s) => s + 1)
  }

  const handleBack = () => setStep((s) => Math.max(0, s - 1))

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
      styles={{
        body: { padding: '20px 24px 24px' },
        content: { borderRadius: 12, ...(darkMode ? { background: '#1f1f1f' } : {}) },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>{current.icon}</div>
        <Title level={5} style={{ margin: 0, marginBottom: 8, textAlign: 'center' }}>
          {current.title}
        </Title>
      </div>
      <div
        style={{
          minHeight: STEP_CONTENT_MIN_HEIGHT,
          marginBottom: 24,
        }}
      >
        <Text style={{ color: darkMode ? 'rgba(255,255,255,0.85)' : undefined, display: 'block' }}>
          {current.content}
        </Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: darkMode ? 'rgba(255,255,255,0.45)' : '#8c8c8c' }}>
          {step + 1} of {TOUR_STEPS.length}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          {step > 0 && (
            <Button icon={<LeftOutlined />} onClick={handleBack}>
              Back
            </Button>
          )}
          <Button type="primary" onClick={handleNext} style={{ background: '#8C1D40', borderColor: '#8C1D40' }}>
            {isLast ? 'Done' : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
