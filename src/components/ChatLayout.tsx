import { useState, useRef, useEffect, useCallback } from 'react'
import { Layout, Input, Typography, Avatar, Result, Tooltip } from 'antd'
import {
  CheckCircleFilled,
  DownOutlined,
  CopyOutlined,
  EditOutlined,
  MessageOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { ASSETS } from '../data/assets'
import {
  mockProfile,
  mockAIProjects,
  mockChatHistory,
  projectDescriptions,
  type MockChat,
} from '../data/mockData'
import ThinkingState from './ThinkingState'
import EventList from './EventList'
import EmailDraft from './EmailDraft'
import SlackComposer from './SlackComposer'
import FeedbackRow from './FeedbackRow'
import SettingsModal from './SettingsModal'
import ProfilePopover from './ProfilePopover'

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
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [activeProject, setActiveProject] = useState('CreateAI Chat')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
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

  const resetChat = useCallback((projectName?: string) => {
    setMessages([])
    setPhase('welcome')
    setInputValue('')
    if (projectName) setActiveProject(projectName)
    setActiveProjectId(null)
  }, [])

  const loadChatHistory = useCallback((chat: MockChat) => {
    const msgs: Message[] = chat.messages.map((m) => ({
      id: nextId(),
      role: m.role,
      text: m.text,
    }))
    setMessages(msgs)
    setPhase('done')
    setActiveProjectId(chat.id)
  }, [])

  // --- Demo flow handlers ---
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
          'Personalizing for your interests...',
        ],
      })
      setPhase('searching')
    }, 400)
  }

  const handleSearchComplete = useCallback(() => {
    replaceLastMessage({ id: nextId(), role: 'assistant', component: 'events' })
    setPhase('results')
  }, [replaceLastMessage])

  const handleDraftEmail = useCallback(() => {
    addMessage({
      id: nextId(),
      role: 'user',
      text: 'Oh interesting. Can you draft an email I can send to my study group about the Life in Crisis event at 3:30. I want to see who else might want to attend?',
    })
    setTimeout(() => {
      addMessage({
        id: nextId(),
        role: 'thinking',
        thinkingSteps: ['Crafting email...', 'Adding event details...', 'Formatting message...'],
      })
      setPhase('composing')
    }, 400)
  }, [addMessage])

  const handleComposeComplete = useCallback(() => {
    replaceLastMessage({ id: nextId(), role: 'assistant', component: 'email' })
    setPhase('emailDraft')
  }, [replaceLastMessage])

  const handleSwitchToSlack = useCallback(() => {
    addMessage({ id: nextId(), role: 'user', text: "Actually, let's send this via Slack instead" })
    setTimeout(() => {
      addMessage({
        id: nextId(),
        role: 'thinking',
        thinkingSteps: ['Switching to Slack...', 'Parsing syllabus dates...', 'Checking for schedule conflicts...', 'No conflicts found!'],
      })
      setPhase('switching')
    }, 400)
  }, [addMessage])

  const handleSwitchComplete = useCallback(() => {
    replaceLastMessage({
      id: nextId(),
      role: 'assistant',
      text: "I've converted your message to Slack format and checked your syllabus — no conflicts with your schedule!",
      component: 'slack',
    })
    setPhase('slackDraft')
  }, [replaceLastMessage])

  const handleSendSlack = useCallback(() => {
    addMessage({ id: nextId(), role: 'thinking', thinkingSteps: ['Sending to #cs101-study-group...'] })
    setPhase('sending')
  }, [addMessage])

  const handleSendComplete = useCallback(() => {
    replaceLastMessage({ id: nextId(), role: 'assistant', component: 'success' })
    setPhase('done')
  }, [replaceLastMessage])

  const getThinkingHandler = useCallback((): (() => void) => {
    switch (phase) {
      case 'searching': return handleSearchComplete
      case 'composing': return handleComposeComplete
      case 'switching': return handleSwitchComplete
      case 'sending': return handleSendComplete
      default: return () => {}
    }
  }, [phase, handleSearchComplete, handleComposeComplete, handleSwitchComplete, handleSendComplete])

  const inputDisabled = phase !== 'welcome' && phase !== 'results'
  const showWelcome = phase === 'welcome' && messages.length === 0
  const projectInfo = projectDescriptions[activeProject] || projectDescriptions['CreateAI Chat']

  const onSubmit = () => {
    if (phase === 'welcome') handleSubmit()
    else if (phase === 'results' && inputValue.trim()) {
      setInputValue('')
      handleDraftEmail()
    }
  }

  return (
    <Layout style={{ height: '100vh', background: '#fff' }}>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* ===== Sidebar ===== */}
      <Sider
        width={sidebarExpanded ? 200 : 65}
        style={{
          background: '#fff',
          borderRight: '1px solid #fafafa',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '14px 0' }}>
          {/* Menu toggle */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', marginBottom: 8, cursor: 'pointer' }}
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
          >
            <img src={ASSETS.hamburgerIcon} alt="" style={{ width: 22, height: 22, flexShrink: 0 }} />
            {sidebarExpanded && (
              <Text style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', opacity: sidebarExpanded ? 1 : 0, transition: 'opacity 0.2s' }}>
                Menu
              </Text>
            )}
          </div>

          {/* New chat */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', cursor: 'pointer' }}
            onClick={() => resetChat('CreateAI Chat')}
          >
            <img src={ASSETS.editIcon} alt="" style={{ width: 18, height: 18, flexShrink: 0, marginLeft: 2 }} />
            {sidebarExpanded && <Text style={{ fontSize: 14, whiteSpace: 'nowrap' }}>New CreateAI Chat</Text>}
          </div>

          {/* Expanded content */}
          {sidebarExpanded && (
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                marginTop: 16,
                opacity: sidebarExpanded ? 1 : 0,
                transform: sidebarExpanded ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.2s ease 0.05s, transform 0.2s ease 0.05s',
              }}
            >
              {/* AI Projects */}
              <div style={{ padding: '0 14px', marginBottom: 4 }}>
                <Text type="secondary" style={{ fontSize: 13, cursor: 'pointer' }}>
                  CreateAI Projects <DownOutlined style={{ fontSize: 9 }} />
                </Text>
              </div>
              {mockAIProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => { resetChat(p.name); setActiveProjectId(null) }}
                  style={{
                    padding: '6px 14px 6px 20px',
                    cursor: 'pointer',
                    fontSize: 14,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: activeProject === p.name && !activeProjectId ? '#f5f5f5' : undefined,
                    borderRadius: 6,
                    marginBottom: 2,
                  }}
                  className="sidebar-history-item"
                >
                  <MessageOutlined style={{ fontSize: 12, color: '#747474', flexShrink: 0 }} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                  {activeProject === p.name && !activeProjectId && (
                    <img src={ASSETS.editIcon} alt="" style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.7 }} />
                  )}
                </div>
              ))}
              <div style={{ padding: '4px 14px 4px 20px' }}>
                <Tooltip title="More AI projects coming soon">
                  <a style={{ fontSize: 13, color: '#8C1D40' }}>View all</a>
                </Tooltip>
              </div>

              {/* Chats */}
              <div style={{ padding: '16px 14px 4px', marginBottom: 4 }}>
                <Text type="secondary" style={{ fontSize: 13, cursor: 'pointer' }}>
                  Chats <DownOutlined style={{ fontSize: 9 }} />
                </Text>
              </div>
              {mockChatHistory.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveProject('BIO 181 | Chat')
                    loadChatHistory(c)
                  }}
                  style={{
                    padding: '6px 14px 6px 20px',
                    cursor: 'pointer',
                    fontSize: 14,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    background: activeProjectId === c.id ? '#f5f5f5' : undefined,
                    borderRadius: 6,
                    marginBottom: 2,
                  }}
                  className="sidebar-history-item"
                >
                  {c.title}
                </div>
              ))}
            </div>
          )}

          {!sidebarExpanded && <div style={{ flex: 1 }} />}

          {/* Bottom: avatar + email */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', cursor: 'pointer', position: 'relative' }}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <Avatar size={28} src={ASSETS.userAvatar} style={{ flexShrink: 0 }} />
            {sidebarExpanded && (
              <Text type="secondary" style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{mockProfile.email}</Text>
            )}
          </div>
          {profileOpen && (
            <ProfilePopover onSettings={() => setSettingsOpen(true)} onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </Sider>

      <Layout style={{ background: '#fff' }}>
        {/* ===== Header ===== */}
        <Header
          style={{
            background: '#fff',
            padding: '0 20px',
            height: 56,
            lineHeight: '56px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: 'none',
          }}
        >
          <img src={ASSETS.asuLogo} alt="ASU" style={{ height: 28, marginRight: 10 }} />
          <Title
            level={4}
            style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.6px', fontSize: 20, lineHeight: '26px' }}
          >
            {activeProject}
          </Title>
          <img src={ASSETS.goldBadge} alt="" style={{ width: 16, height: 16, marginLeft: 6 }} />
          <DownOutlined style={{ fontSize: 10, color: '#747474', marginLeft: 4 }} />
          <div style={{ flex: 1 }} />
        </Header>

        {/* ===== Chat Content ===== */}
        <Content style={{ overflow: 'auto', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
          {/* Project info tooltip */}
          {showWelcome && projectInfo.info && (
            <div
              style={{
                maxWidth: 320,
                margin: '12px auto 0',
                padding: '10px 16px',
                background: '#fff',
                border: '1px solid #e8e8e8',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <Text style={{ fontSize: 14 }}>{projectInfo.subtitle}</Text>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <InfoCircleOutlined style={{ fontSize: 12, color: '#bfbfbf' }} />
                <Text type="secondary" style={{ fontSize: 13 }}>{projectInfo.info}</Text>
              </div>
            </div>
          )}

          {/* Welcome screen */}
          {showWelcome && (
            <div
              className="welcome-screen"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}
            >
              <Title
                level={3}
                style={{ textAlign: 'center', marginBottom: 4, fontWeight: 700, fontSize: 24, lineHeight: '28px', letterSpacing: '-0.035px' }}
              >
                {projectInfo.title}
              </Title>
              <Text style={{ textAlign: 'center', color: '#484848', fontSize: 16, lineHeight: '24px' }}>
                {projectInfo.subtitle}
              </Text>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: showWelcome ? 0 : 1, maxWidth: 760, width: '100%', margin: '0 auto', paddingTop: showWelcome ? 0 : 24 }}>
            {messages.map((msg) => (
              <div key={msg.id} className="message-enter" style={{ marginBottom: 20 }}>
                {msg.role === 'user' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 4, marginTop: 8, flexShrink: 0 }}>
                      <CopyOutlined style={{ fontSize: 13, color: '#d0d0d0', cursor: 'pointer' }} />
                      <EditOutlined style={{ fontSize: 13, color: '#d0d0d0', cursor: 'pointer' }} />
                    </div>
                    <div
                      style={{ background: '#f3f3f3', padding: '10px 16px', borderRadius: 18, borderBottomRightRadius: 4, maxWidth: '75%' }}
                    >
                      <Text style={{ fontSize: 15 }}>{msg.text}</Text>
                    </div>
                  </div>
                )}

                {msg.role === 'thinking' && (
                  <div style={{ maxWidth: 600 }}>
                    <ThinkingState steps={msg.thinkingSteps || []} onComplete={getThinkingHandler()} />
                  </div>
                )}

                {msg.role === 'assistant' && (
                  <div style={{ maxWidth: '100%' }}>
                    {msg.text && (
                      <Paragraph style={{ fontSize: 15, marginBottom: 8, lineHeight: '24px', whiteSpace: 'pre-wrap' }}>
                        {msg.text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={i}>{part.slice(2, -2)}</strong>
                            : <span key={i}>{part}</span>
                        )}
                      </Paragraph>
                    )}
                    {msg.component === 'events' && <EventList />}
                    {msg.component === 'email' && <EmailDraft onSwitchToSlack={handleSwitchToSlack} />}
                    {msg.component === 'slack' && <SlackComposer onSend={handleSendSlack} />}
                    {msg.component === 'success' && (
                      <Result
                        icon={<CheckCircleFilled className="success-enter" style={{ color: '#52c41a', fontSize: 48 }} />}
                        title="Message sent to #cs101-study-group!"
                        subTitle="All 5 members have been notified."
                        style={{ padding: '24px 0' }}
                      />
                    )}
                    <FeedbackRow />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </Content>

        {/* ===== Input Footer ===== */}
        <div style={{ padding: '12px 24px 16px', background: '#fff' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div
              style={{
                border: '1px solid #f3f3f3',
                borderRadius: 24,
                height: 50,
                padding: '0 6px',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 34, height: 34, borderRadius: '50%', border: '1px solid #e8e8e8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginLeft: 2, cursor: 'pointer', fontSize: 16, color: '#484848',
                }}
              >
                +
              </div>
              <Input
                variant="borderless"
                placeholder={inputDisabled ? 'Demo in progress...' : 'Ask anything'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={onSubmit}
                disabled={inputDisabled}
                style={{ flex: 1, fontSize: 16, padding: '0 8px' }}
              />
              <div style={{ width: 14, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', margin: '0 6px' }}>
                <img src={ASSETS.micIcon} alt="Voice" style={{ width: 14, height: 18, objectFit: 'contain', opacity: 0.6 }} />
              </div>
              <div
                onClick={onSubmit}
                style={{
                  width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                  cursor: inputDisabled || !inputValue.trim() ? 'not-allowed' : 'pointer',
                  opacity: inputDisabled || !inputValue.trim() ? 0.35 : 1, transition: 'opacity 0.2s',
                }}
              >
                <img src={ASSETS.sendIcon} alt="Send" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 14, lineHeight: '18px' }}>
                By using this AI project, you acknowledge and agree to these{' '}
                <a style={{ color: '#8C1D40', textDecoration: 'underline' }}>terms</a>.
                Ask me! bot may display incorrect or false information.
              </Text>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  )
}
