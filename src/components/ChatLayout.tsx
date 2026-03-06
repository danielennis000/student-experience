import { useState, useRef, useEffect, useCallback } from 'react'
import { Layout, Input, Button, Typography, Avatar, Space, Result } from 'antd'
import {
  MenuOutlined,
  EditOutlined,
  SendOutlined,
  AudioOutlined,
  PlusOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import { mockProfile } from '../data/mockData'
import ThinkingState from './ThinkingState'
import EventCards from './EventCards'
import EmailComposer from './EmailComposer'
import SlackComposer from './SlackComposer'

const { Header, Sider, Content } = Layout
const { Title, Text, Paragraph } = Typography

type MessageComponent = 'events' | 'email' | 'slack' | 'success'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'thinking'
  text?: string
  thinkingSteps?: string[]
  component?: MessageComponent
}

type Phase =
  | 'welcome'
  | 'searching'
  | 'results'
  | 'composing'
  | 'emailDraft'
  | 'switching'
  | 'slackDraft'
  | 'sending'
  | 'done'

let messageId = 0
const nextId = () => `msg-${++messageId}`

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([])
  const [phase, setPhase] = useState<Phase>('welcome')
  const [inputValue, setInputValue] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  const replaceLastMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev.slice(0, -1), msg])
  }, [])

  const handleSubmit = () => {
    if (phase !== 'welcome' || !inputValue.trim()) return

    const query = inputValue
    setInputValue('')
    addMessage({ id: nextId(), role: 'user', text: query })

    setTimeout(() => {
      addMessage({
        id: nextId(),
        role: 'thinking',
        thinkingSteps: [
          'Searching the web...',
          'Analyzing 24 results...',
          'Personalizing for your Computer Science interests...',
        ],
      })
      setPhase('searching')
    }, 400)
  }

  const handleSearchComplete = useCallback(() => {
    replaceLastMessage({
      id: nextId(),
      role: 'assistant',
      text: `I found some great events happening on campus today that match your interests in ${mockProfile.interests.join(', ')}:`,
      component: 'events',
    })
    setPhase('results')
  }, [replaceLastMessage])

  const handleShareEvent = useCallback(() => {
    addMessage({
      id: nextId(),
      role: 'user',
      text: 'Share the AI Research Symposium with my study group',
    })

    setTimeout(() => {
      addMessage({
        id: nextId(),
        role: 'thinking',
        thinkingSteps: [
          'Crafting email...',
          'Adding event details...',
          'Formatting message...',
        ],
      })
      setPhase('composing')
    }, 400)
  }, [addMessage])

  const handleComposeComplete = useCallback(() => {
    replaceLastMessage({
      id: nextId(),
      role: 'assistant',
      text: "Here's a draft email for your study group. Feel free to edit it before sending:",
      component: 'email',
    })
    setPhase('emailDraft')
  }, [replaceLastMessage])

  const handleSwitchToSlack = useCallback(() => {
    addMessage({
      id: nextId(),
      role: 'user',
      text: "Actually, let's send this via Slack instead",
    })

    setTimeout(() => {
      addMessage({
        id: nextId(),
        role: 'thinking',
        thinkingSteps: [
          'Switching to Slack...',
          'Parsing syllabus dates...',
          'Checking for schedule conflicts...',
          'No conflicts found!',
        ],
      })
      setPhase('switching')
    }, 400)
  }, [addMessage])

  const handleSwitchComplete = useCallback(() => {
    replaceLastMessage({
      id: nextId(),
      role: 'assistant',
      text: "I've converted your message to Slack format and checked your syllabus — no conflicts with your schedule! Here's the message:",
      component: 'slack',
    })
    setPhase('slackDraft')
  }, [replaceLastMessage])

  const handleSendSlack = useCallback(() => {
    addMessage({
      id: nextId(),
      role: 'thinking',
      thinkingSteps: ['Sending to #cs101-study-group...'],
    })
    setPhase('sending')
  }, [addMessage])

  const handleSendComplete = useCallback(() => {
    replaceLastMessage({
      id: nextId(),
      role: 'assistant',
      component: 'success',
    })
    setPhase('done')
  }, [replaceLastMessage])

  const getThinkingHandler = useCallback((): (() => void) => {
    switch (phase) {
      case 'searching':
        return handleSearchComplete
      case 'composing':
        return handleComposeComplete
      case 'switching':
        return handleSwitchComplete
      case 'sending':
        return handleSendComplete
      default:
        return () => {}
    }
  }, [phase, handleSearchComplete, handleComposeComplete, handleSwitchComplete, handleSendComplete])

  const inputDisabled = phase !== 'welcome'
  const showWelcome = phase === 'welcome' && messages.length === 0

  return (
    <Layout style={{ height: '100vh', background: '#fff' }}>
      <Sider
        width={65}
        style={{
          background: '#fff',
          borderRight: '1px solid #fafafa',
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        breakpoint="md"
        collapsedWidth={0}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Button
            type="text"
            icon={<MenuOutlined />}
            style={{ marginBottom: 12, color: '#484848' }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            style={{ color: '#484848' }}
          />
          <div style={{ flex: 1 }} />
          <Avatar
            size={36}
            src={mockProfile.avatar}
            style={{ marginBottom: 16, cursor: 'pointer' }}
          />
        </div>
      </Sider>

      <Layout style={{ background: '#fff' }}>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            height: 56,
            lineHeight: '56px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: 'none',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}asu_thumb.png`}
            alt="ASU"
            style={{ height: 32, marginRight: 12 }}
          />
          <Title
            level={4}
            style={{
              margin: 0,
              fontWeight: 700,
              letterSpacing: '-0.6px',
              fontSize: 20,
            }}
          >
            CreateAI Chat
          </Title>
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#FFC627',
              marginLeft: 8,
            }}
          />
        </Header>

        <Content
          style={{
            overflow: 'auto',
            padding: '0 24px 0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {showWelcome && (
            <div
              className="welcome-screen"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
              }}
            >
              <Title
                level={3}
                style={{
                  textAlign: 'center',
                  marginBottom: 4,
                  fontWeight: 700,
                  letterSpacing: '-0.035px',
                }}
              >
                What can I help you with?
              </Title>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#484848',
                  fontSize: 16,
                }}
              >
                This project answers questions about CreateAI. Just ask me!
              </Text>
            </div>
          )}

          <div
            style={{
              flex: showWelcome ? 0 : 1,
              maxWidth: 760,
              width: '100%',
              margin: '0 auto',
              paddingTop: showWelcome ? 0 : 24,
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id} className="message-enter" style={{ marginBottom: 20 }}>
                {msg.role === 'user' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        background: '#f3f3f3',
                        padding: '10px 16px',
                        borderRadius: 18,
                        borderBottomRightRadius: 4,
                        maxWidth: '75%',
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>{msg.text}</Text>
                    </div>
                  </div>
                )}

                {msg.role === 'thinking' && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Avatar
                      size={32}
                      src={`${import.meta.env.BASE_URL}asu_thumb.png`}
                      style={{ flexShrink: 0, marginTop: 4 }}
                    />
                    <div style={{ flex: 1 }}>
                      <ThinkingState
                        steps={msg.thinkingSteps || []}
                        onComplete={getThinkingHandler()}
                      />
                    </div>
                  </div>
                )}

                {msg.role === 'assistant' && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Avatar
                      size={32}
                      src={`${import.meta.env.BASE_URL}asu_thumb.png`}
                      style={{ flexShrink: 0, marginTop: 4 }}
                    />
                    <div style={{ flex: 1 }}>
                      {msg.text && (
                        <Paragraph style={{ fontSize: 15, marginBottom: 4 }}>
                          {msg.text}
                        </Paragraph>
                      )}
                      {msg.component === 'events' && (
                        <EventCards onShare={handleShareEvent} />
                      )}
                      {msg.component === 'email' && (
                        <EmailComposer onSwitchToSlack={handleSwitchToSlack} />
                      )}
                      {msg.component === 'slack' && (
                        <SlackComposer onSend={handleSendSlack} />
                      )}
                      {msg.component === 'success' && (
                        <Result
                          icon={
                            <CheckCircleFilled
                              className="success-enter"
                              style={{ color: '#52c41a', fontSize: 48 }}
                            />
                          }
                          title="Message sent to #cs101-study-group!"
                          subTitle="All 5 members have been notified. Have a great time at the AI Research Symposium!"
                          style={{ padding: '24px 0' }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </Content>

        <div
          style={{
            padding: '12px 24px 16px',
            background: '#fff',
          }}
        >
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: 24,
                padding: '4px 4px 4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Button
                type="text"
                icon={<PlusOutlined />}
                size="small"
                style={{ color: '#484848' }}
              />
              <Input
                variant="borderless"
                placeholder={
                  inputDisabled
                    ? 'Demo in progress...'
                    : 'Ask anything'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleSubmit}
                disabled={inputDisabled}
                style={{ flex: 1, fontSize: 16 }}
              />
              <Button
                type="text"
                icon={<AudioOutlined />}
                size="small"
                style={{ color: '#484848' }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={handleSubmit}
                disabled={inputDisabled || !inputValue.trim()}
                size="small"
              />
            </div>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 8,
              }}
            >
              <Text
                type="secondary"
                style={{ fontSize: 13, textAlign: 'center' }}
              >
                By using this AI project, you acknowledge and agree to these{' '}
                <a style={{ color: '#8C1D40', textDecoration: 'underline' }}>
                  terms
                </a>
                . Ask me! bot may display incorrect or false information.
              </Text>
            </Space>
          </div>
        </div>
      </Layout>
    </Layout>
  )
}
