import { useState, useRef, useEffect, useCallback } from 'react'
import { Layout, Input, Typography, Avatar, Result, Tooltip } from 'antd'
import {
  CheckCircleFilled,
  DownOutlined,
  CopyOutlined,
  EditOutlined,
  InfoCircleOutlined,
  VideoCameraAddOutlined,
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
import AvatarModeModal from './AvatarModeModal'
import StreamingText from './StreamingText'

const { Header, Sider, Content } = Layout
const { Title, Text, Paragraph } = Typography

type MessageComponent = 'events' | 'email' | 'emailSuccess' | 'slack' | 'success'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'thinking'
  text?: string
  thinkingSteps?: string[]
  component?: MessageComponent
  streaming?: boolean
}

type Phase =
  | 'welcome'
  | 'searching'
  | 'results'
  | 'composing'
  | 'emailDraft'
  | 'sendingEmail'
  | 'switching'
  | 'slackDraft'
  | 'sending'
  | 'done'

let messageId = 0
const nextId = () => `msg-${++messageId}`

// Placeholder suggestions for typewriter animation
const WELCOME_PLACEHOLDERS_LIGHT = [
  'Ask anything',
  'Do a web search',
  'Ask about upcoming events',
  'Change to dark mode'
]

const WELCOME_PLACEHOLDERS_DARK = [
  'Ask anything',
  'Do a web search',
  'Ask about upcoming events',
  'Change to light mode'
]

const AFTER_RESPONSE_PLACEHOLDERS = [
  'Send this to study group',
  'Share',
  'Ask anything'
]

interface ChatLayoutProps {
  darkMode?: boolean
  onDarkModeChange?: (value: boolean) => void
  avatar?: string
  onAvatarChange?: (value: string) => void
}

export default function ChatLayout({ darkMode = false, onDarkModeChange, avatar = 'liv', onAvatarChange }: ChatLayoutProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [phase, setPhase] = useState<Phase>('welcome')
  const [inputValue, setInputValue] = useState('')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [activeProject, setActiveProject] = useState('CreateAI Chat')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [avatarModeOpen, setAvatarModeOpen] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [projectDetailsExpanded, setProjectDetailsExpanded] = useState(false)
  const [projectsCollapsed, setProjectsCollapsed] = useState(false)
  const [chatsCollapsed, setChatsCollapsed] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('Ask anything')
  const [isRecording, setIsRecording] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const profileTriggerRef = useRef<HTMLDivElement>(null)

  // Use welcome placeholders initially, then switch after first response
  // Keep welcome placeholders if only theme-change messages exist
  // Also switch based on dark mode for the welcome screen
  const hasOnlyThemeMessages = messages.length > 0 && messages.every(m => 
    m.text?.toLowerCase().includes('dark mode') || 
    m.text?.toLowerCase().includes('light mode') ||
    m.text?.toLowerCase().includes('switched to')
  )
  
  const shouldShowWelcome = (phase === 'welcome' && messages.length === 0) || hasOnlyThemeMessages
  
  const placeholderSuggestions = shouldShowWelcome
    ? (darkMode ? WELCOME_PLACEHOLDERS_DARK : WELCOME_PLACEHOLDERS_LIGHT)
    : AFTER_RESPONSE_PLACEHOLDERS

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    setProjectDetailsExpanded(false)
  }, [activeProject, activeProjectId])

  // Reset placeholder index when switching between suggestion sets
  useEffect(() => {
    setPlaceholderIndex(0)
  }, [messages.length])

  // Typewriter effect for placeholder with backspace
  useEffect(() => {
    const targetText = placeholderSuggestions[placeholderIndex]
    let currentIndex = 0
    let isDeleting = false
    let timeoutId: ReturnType<typeof setTimeout>
    
    const animate = () => {
      if (!isDeleting) {
        // Typing phase
        setDisplayedPlaceholder(targetText.slice(0, currentIndex))
        currentIndex++
        
        if (currentIndex > targetText.length) {
          // Finished typing, wait then start deleting
          timeoutId = setTimeout(() => {
            isDeleting = true
            currentIndex = targetText.length
            animate()
          }, 2000)
        } else {
          timeoutId = setTimeout(animate, 50)
        }
      } else {
        // Deleting phase
        setDisplayedPlaceholder(targetText.slice(0, currentIndex))
        currentIndex--
        
        if (currentIndex < 0) {
          // Finished deleting, move to next placeholder
          setPlaceholderIndex((prev) => (prev + 1) % placeholderSuggestions.length)
        } else {
          timeoutId = setTimeout(animate, 30)
        }
      }
    }
    
    // Start animation with initial delay only on first load
    const initialDelay = placeholderIndex === 0 ? 500 : 100
    timeoutId = setTimeout(animate, initialDelay)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [placeholderIndex, placeholderSuggestions])

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  const replaceLastMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev.slice(0, -1), msg])
  }, [])

  const markStreamed = useCallback((id: string) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, streaming: false } : m))
  }, [])

  useEffect(() => {
    const pending = messages.find((m) => m.role === 'assistant' && m.streaming && !m.text && m.component && m.component !== 'events')
    if (pending) {
      const timer = setTimeout(() => markStreamed(pending.id), 500)
      return () => clearTimeout(timer)
    }
  }, [messages, markStreamed])

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
    replaceLastMessage({ id: nextId(), role: 'assistant', component: 'events', streaming: true })
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
    replaceLastMessage({ id: nextId(), role: 'assistant', component: 'email', streaming: true })
    setPhase('emailDraft')
  }, [replaceLastMessage])

  const handleSendEmail = useCallback(() => {
    addMessage({ id: nextId(), role: 'thinking', thinkingSteps: ['Sending email to study group...'] })
    setPhase('sendingEmail')
  }, [addMessage])

  const handleSendEmailComplete = useCallback(() => {
    replaceLastMessage({ id: nextId(), role: 'assistant', component: 'emailSuccess', streaming: true })
    setPhase('done')
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
      streaming: true,
    })
    setPhase('slackDraft')
  }, [replaceLastMessage])

  const handleSendSlack = useCallback(() => {
    addMessage({ id: nextId(), role: 'thinking', thinkingSteps: ['Sending to #cs101-study-group...'] })
    setPhase('sending')
  }, [addMessage])

  const handleSendComplete = useCallback(() => {
    replaceLastMessage({ id: nextId(), role: 'assistant', component: 'success', streaming: true })
    setPhase('done')
  }, [replaceLastMessage])

  const getThinkingHandler = useCallback((): (() => void) => {
    switch (phase) {
      case 'searching': return handleSearchComplete
      case 'composing': return handleComposeComplete
      case 'sendingEmail': return handleSendEmailComplete
      case 'switching': return handleSwitchComplete
      case 'sending': return handleSendComplete
      default: return () => {}
    }
  }, [phase, handleSearchComplete, handleComposeComplete, handleSendEmailComplete, handleSwitchComplete, handleSendComplete])

  const inputDisabled = phase !== 'welcome' && phase !== 'results' && phase !== 'emailDraft'
  const showWelcome = phase === 'welcome' && messages.length === 0
  const projectInfo = projectDescriptions[activeProject] || projectDescriptions['CreateAI Chat']

  const detectThemeIntent = (text: string): 'dark' | 'light' | null => {
    const t = text.trim().toLowerCase()
    const darkPhrases = /change to dark mode|switch to dark mode|enable dark mode|turn on dark mode|use dark mode|go dark|dark mode please|set dark mode/i
    const lightPhrases = /change to light mode|change the ui back to light mode|switch to light mode|enable light mode|turn on light mode|use light mode|go light|light mode please|set light mode|disable dark mode|turn off dark mode|back to light/i
    if (darkPhrases.test(t)) return 'dark'
    if (lightPhrases.test(t)) return 'light'
    return null
  }

  const onSubmit = () => {
    if (phase === 'welcome') {
      const themeIntent = detectThemeIntent(inputValue)
      if (themeIntent !== null) {
        onDarkModeChange?.(themeIntent === 'dark')
        setInputValue('')
        addMessage({ id: nextId(), role: 'user', text: inputValue.trim() })
        addMessage({
          id: nextId(),
          role: 'assistant',
          text: themeIntent === 'dark' ? 'Switched to dark mode.' : 'Switched to light mode.',
          streaming: true,
        })
        return
      }
      handleSubmit()
    } else if (phase === 'results' && inputValue.trim()) {
      setInputValue('')
      handleDraftEmail()
    }
  }

  const handleMicClick = () => {
    if (isRecording) return // Prevent clicking while recording
    
    setIsRecording(true)
    
    // Determine the voice query based on phase
    let voiceQuery = ''
    if (phase === 'welcome') {
      voiceQuery = 'Search the web for events at asu today'
    } else if (phase === 'results') {
      voiceQuery = 'Oh interesting. Can you draft an email I can send to my study group about the Life in Crisis event at 3:30. I want to see who else might want to attend?'
    } else {
      setIsRecording(false)
      return
    }
    
    // Simulate transcription - type out the voice query
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex <= voiceQuery.length) {
        setInputValue(voiceQuery.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsRecording(false)
        
        // Wait a moment then submit
        setTimeout(() => {
          setInputValue('')
          addMessage({ id: nextId(), role: 'user', text: voiceQuery })
          
          if (phase === 'welcome') {
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
          } else if (phase === 'results') {
            setTimeout(() => {
              addMessage({
                id: nextId(),
                role: 'thinking',
                thinkingSteps: ['Crafting email...', 'Adding event details...', 'Formatting message...'],
              })
              setPhase('composing')
            }, 400)
          }
        }, 300)
      }
    }, 40) // 40ms per character for realistic transcription speed
  }

  return (
    <Layout style={{ height: '100vh', background: darkMode ? '#141414' : '#fff' }}>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} darkMode={darkMode} onDarkModeChange={onDarkModeChange} avatar={avatar} onAvatarChange={onAvatarChange} />
      <AvatarModeModal open={avatarModeOpen} onClose={() => setAvatarModeOpen(false)} selectedAvatar={avatar} />

      {/* ===== Sidebar ===== */}
      <Sider
        collapsed={!sidebarExpanded}
        width={240}
        collapsedWidth={65}
        trigger={null}
        className="app-sidebar"
        style={{
          background: darkMode ? '#1f1f1f' : 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
          borderRight: darkMode ? '1px solid #303030' : '1px solid #f0f0f0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '14px 0' }}>
          {/* Menu toggle */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: sidebarExpanded ? '0 14px' : '0', justifyContent: sidebarExpanded ? 'flex-start' : 'center', marginBottom: 8, cursor: 'pointer' }}
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
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: sidebarExpanded ? '6px 14px' : '6px 0', justifyContent: sidebarExpanded ? 'flex-start' : 'center', cursor: 'pointer' }}
            onClick={() => resetChat('CreateAI Chat')}
          >
            <img src={ASSETS.editIcon} alt="" style={{ width: 18, height: 18, flexShrink: 0 }} />
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
              <div style={{ padding: '0 14px', marginBottom: 4 }} onClick={() => setProjectsCollapsed(!projectsCollapsed)}>
                <Text type="secondary" style={{ fontSize: 13, cursor: 'pointer', color: darkMode ? 'rgba(255,255,255,0.65)' : undefined, display: 'flex', alignItems: 'center', gap: 4 }}>
                  CreateAI Projects <DownOutlined style={{ fontSize: 9, transition: 'transform 0.2s', transform: projectsCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }} />
                </Text>
              </div>
              {!projectsCollapsed && (
                <>
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
                        background: activeProject === p.name && !activeProjectId ? (darkMode ? '#303030' : '#f5f5f5') : undefined,
                        borderRadius: 6,
                        marginBottom: 2,
                      }}
                      className="sidebar-history-item"
                    >
                      <img src={ASSETS.asuThumb} alt="" style={{ width: 20, height: 20, flexShrink: 0, borderRadius: 4, objectFit: 'cover' }} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', color: darkMode ? 'rgba(255,255,255,0.85)' : undefined }}>{p.name}</span>
                      {activeProject === p.name && !activeProjectId && (
                        <img src={ASSETS.editIcon} alt="" style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.7 }} />
                      )}
                    </div>
                  ))}
                  <div style={{ padding: '4px 14px 4px 20px' }}>
                    <Tooltip title="More AI projects coming soon">
                      <a style={{ fontSize: 13, color: darkMode ? '#FFC627' : '#8C1D40' }}>View all</a>
                    </Tooltip>
                  </div>
                </>
              )}

              {/* Chats */}
              <div style={{ padding: '16px 14px 4px', marginBottom: 4 }} onClick={() => setChatsCollapsed(!chatsCollapsed)}>
                <Text type="secondary" style={{ fontSize: 13, cursor: 'pointer', color: darkMode ? 'rgba(255,255,255,0.65)' : undefined, display: 'flex', alignItems: 'center', gap: 4 }}>
                  Chats <DownOutlined style={{ fontSize: 9, transition: 'transform 0.2s', transform: chatsCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }} />
                </Text>
              </div>
              {!chatsCollapsed && mockChatHistory.map((c) => (
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
                    background: activeProjectId === c.id ? (darkMode ? '#303030' : '#f5f5f5') : undefined,
                    borderRadius: 6,
                    marginBottom: 2,
                    color: darkMode ? 'rgba(255,255,255,0.85)' : undefined,
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
            ref={profileTriggerRef}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: sidebarExpanded ? '8px 14px' : '8px 0', justifyContent: sidebarExpanded ? 'flex-start' : 'center', cursor: 'pointer', position: 'relative' }}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <Avatar size={28} src={ASSETS.userAvatar} style={{ flexShrink: 0 }} />
            {sidebarExpanded && (
              <Text type="secondary" style={{ fontSize: 13, whiteSpace: 'nowrap', color: darkMode ? 'rgba(255,255,255,0.65)' : undefined }}>{mockProfile.email}</Text>
            )}
          </div>
          {profileOpen && (
            <ProfilePopover
              triggerRef={profileTriggerRef}
              onSettings={() => setSettingsOpen(true)}
              onClose={() => setProfileOpen(false)}
              darkMode={darkMode}
            />
          )}
        </div>
      </Sider>

      <Layout style={{ background: darkMode ? '#141414' : '#fff' }}>
        {/* ===== Header ===== */}
        <Header
          style={{
            background: darkMode ? '#141414' : '#fff',
            padding: '0 20px',
            height: 56,
            lineHeight: '56px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: darkMode ? '1px solid #303030' : 'none',
          }}
        >
          <img src={ASSETS.asuLogo} alt="ASU" style={{ height: 28, marginRight: 10 }} />
          <Title
            level={4}
            style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.6px', fontSize: 20, lineHeight: '26px' }}
          >
            {activeProject}
          </Title>
          {activeProject === 'CreateAI Chat' && (
            <img src={ASSETS.goldBadge} alt="" style={{ width: 16, height: 16, marginLeft: 6 }} />
          )}
          <span
            onClick={() => setProjectDetailsExpanded((v) => !v)}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', marginLeft: 4 }}
            title={projectDetailsExpanded ? 'Hide project details' : 'Show project details'}
          >
            <DownOutlined style={{ fontSize: 10, color: '#747474', transform: projectDetailsExpanded ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }} />
          </span>
          <div style={{ flex: 1 }} />
        </Header>

        {/* ===== Chat Content ===== */}
        <Content style={{ overflow: 'auto', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
          {/* Project details popover: directly under header, aligned with project title (only when chevron expanded) */}
          {projectDetailsExpanded && (projectInfo.subtitle || projectInfo.info) && (
            <div
              style={{
                maxWidth: 320,
                marginTop: 12,
                marginBottom: 0,
                padding: '10px 16px',
                background: darkMode ? '#1f1f1f' : '#fff',
                border: darkMode ? '1px solid #303030' : '1px solid #e8e8e8',
                borderRadius: 8,
                boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                alignSelf: 'flex-start',
              }}
            >
              {projectInfo.subtitle && <Text style={{ fontSize: 14 }}>{projectInfo.subtitle}</Text>}
              {projectInfo.info && (
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <InfoCircleOutlined style={{ fontSize: 12, color: '#bfbfbf' }} />
                  <Text type="secondary" style={{ fontSize: 13 }}>{projectInfo.info}</Text>
                </div>
              )}
            </div>
          )}

          {/* Welcome screen: title, subtitle, then input directly below */}
          {showWelcome && (
            <div
              className="welcome-screen"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 760 }}>
                <Title
                  level={3}
                  style={{ textAlign: 'center', marginBottom: 4, fontWeight: 700, fontSize: 24, lineHeight: '28px', letterSpacing: '-0.035px' }}
                >
                  {projectInfo.title}
                </Title>
                <Text style={{ textAlign: 'center', color: darkMode ? 'rgba(255,255,255,0.65)' : '#484848', fontSize: 16, lineHeight: '24px' }}>
                  {projectInfo.subtitle}
                </Text>
                <div style={{ marginTop: 24, width: '100%' }}>
                  <div
                    style={{
                      border: darkMode ? '1px solid #434343' : '1px solid #f3f3f3',
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
                        width: 34, height: 34, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginLeft: 2, cursor: 'pointer', fontSize: 28, color: darkMode ? 'rgba(255,255,255,0.65)' : '#484848', fontWeight: 300,
                      }}
                    >
                      +
                    </div>
                    <Input
                      variant="borderless"
                      placeholder={inputDisabled ? 'Demo in progress...' : displayedPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onPressEnter={onSubmit}
                      disabled={inputDisabled || isRecording}
                      style={{ flex: 1, fontSize: 16, padding: '0 8px' }}
                    />
                    {/* Soundwave animation when recording */}
                    {isRecording && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginRight: 8 }}>
                        {['low', 'mid-low', 'mid', 'mid-high', 'high', 'highest'].map((freq, i) => (
                          <div
                            key={i}
                            style={{
                              width: 3,
                              background: darkMode ? '#FFC627' : '#8C1D40',
                              borderRadius: 2,
                              animation: `soundwave-${freq} ${1.2 + i * 0.1}s ease-in-out infinite`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {/* Microphone icon - simulates voice input with current suggestion */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handleMicClick}
                      onKeyDown={(e) => e.key === 'Enter' && handleMicClick()}
                      style={{
                        width: 14, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: isRecording ? 'not-allowed' : 'pointer', margin: '0 6px',
                        ...(darkMode && { filter: 'brightness(0) invert(1)' }),
                        ...(isRecording && { opacity: 1, filter: 'none' }),
                      }}
                      title="Voice input"
                    >
                      <img src={ASSETS.micIcon} alt="Voice" style={{ width: 14, height: 18, objectFit: 'contain', opacity: isRecording ? 1 : (darkMode ? 0.9 : 0.6) }} />
                    </div>
                    {/* Video camera icon - opens avatar mode */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setAvatarModeOpen(true)}
                      onKeyDown={(e) => e.key === 'Enter' && setAvatarModeOpen(true)}
                      style={{
                        width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', margin: '0 6px',
                      }}
                      title="Avatar mode"
                    >
                      <VideoCameraAddOutlined style={{ fontSize: 18, color: darkMode ? 'rgba(255,255,255,0.65)' : '#484848' }} />
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
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: showWelcome ? 0 : 1, maxWidth: 760, width: '100%', margin: '0 auto', paddingTop: showWelcome ? 0 : 24 }}>
            {messages.map((msg) => (
              <div key={msg.id} className="message-enter" style={{ marginBottom: 20 }}>
                {msg.role === 'user' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div
                      style={{ background: darkMode ? '#262626' : '#f3f3f3', padding: '10px 16px', borderRadius: 18, borderBottomRightRadius: 4, maxWidth: '75%' }}
                    >
                      <Text style={{ fontSize: 15 }}>{msg.text}</Text>
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 8, flexShrink: 0 }}>
                      <CopyOutlined style={{ fontSize: 13, color: darkMode ? 'rgba(255,255,255,0.45)' : '#d0d0d0', cursor: 'pointer' }} />
                      <EditOutlined style={{ fontSize: 13, color: darkMode ? 'rgba(255,255,255,0.45)' : '#d0d0d0', cursor: 'pointer' }} />
                    </div>
                  </div>
                )}

                {msg.role === 'thinking' && (
                  <div style={{ maxWidth: 600 }}>
                    <ThinkingState steps={msg.thinkingSteps || []} onComplete={getThinkingHandler()} darkMode={darkMode} />
                  </div>
                )}

                {msg.role === 'assistant' && (
                  <div style={{ maxWidth: '100%' }}>
                    {msg.text && (
                      <Paragraph style={{ fontSize: 15, marginBottom: 8, lineHeight: '24px', whiteSpace: 'pre-wrap' }}>
                        {msg.streaming ? (
                          <StreamingText
                            text={msg.text}
                            speed={14}
                            onComplete={() => markStreamed(msg.id)}
                            renderChar={(visible) =>
                              visible.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                                part.startsWith('**') && part.endsWith('**')
                                  ? <strong key={i}>{part.slice(2, -2)}</strong>
                                  : <span key={i}>{part}</span>
                              )
                            }
                          />
                        ) : (
                          msg.text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                            part.startsWith('**') && part.endsWith('**')
                              ? <strong key={i}>{part.slice(2, -2)}</strong>
                              : <span key={i}>{part}</span>
                          )
                        )}
                      </Paragraph>
                    )}
                    {(!msg.text || !msg.streaming) && (
                      <div className={msg.streaming && msg.component !== 'events' ? 'stream-fade-in' : undefined}>
                        {msg.component === 'events' && <EventList darkMode={darkMode} streaming={!!msg.streaming} onStreamComplete={() => markStreamed(msg.id)} />}
                        {msg.component === 'email' && <EmailDraft onSwitchToSlack={handleSwitchToSlack} onSend={handleSendEmail} darkMode={darkMode} />}
                        {msg.component === 'emailSuccess' && (
                          <Result
                            icon={<CheckCircleFilled className="success-enter" style={{ color: '#52c41a', fontSize: 48 }} />}
                            title="Email sent successfully!"
                            subTitle="Your message has been sent to your study group."
                            style={{ padding: '24px 0' }}
                          />
                        )}
                        {msg.component === 'slack' && <SlackComposer onSend={handleSendSlack} darkMode={darkMode} />}
                        {msg.component === 'success' && (
                          <Result
                            icon={<CheckCircleFilled className="success-enter" style={{ color: '#52c41a', fontSize: 48 }} />}
                            title="Message sent to #cs101-study-group!"
                            subTitle="All 5 members have been notified."
                            style={{ padding: '24px 0' }}
                          />
                        )}
                      </div>
                    )}
                    {!msg.streaming && <FeedbackRow darkMode={darkMode} />}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </Content>

        {/* ===== Input Footer: input bar only when chat started; disclaimer always at bottom ===== */}
        <div style={{ padding: '12px 24px 16px', background: darkMode ? '#141414' : '#fff' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {!showWelcome && (
              <div
                style={{
                  border: darkMode ? '1px solid #434343' : '1px solid #f3f3f3',
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
                    width: 34, height: 34, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginLeft: 2, cursor: 'pointer', fontSize: 28, color: darkMode ? 'rgba(255,255,255,0.65)' : '#484848', fontWeight: 300,
                  }}
                >
                  +
                </div>
                <Input
                  variant="borderless"
                  placeholder={inputDisabled ? 'Demo in progress...' : displayedPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onPressEnter={onSubmit}
                  disabled={inputDisabled || isRecording}
                  style={{ flex: 1, fontSize: 16, padding: '0 8px' }}
                />
                {/* Soundwave animation when recording */}
                {isRecording && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginRight: 8 }}>
                    {['low', 'mid-low', 'mid', 'mid-high', 'high', 'highest'].map((freq, i) => (
                      <div
                        key={i}
                        style={{
                          width: 3,
                          background: darkMode ? '#FFC627' : '#8C1D40',
                          borderRadius: 2,
                          animation: `soundwave-${freq} ${1.2 + i * 0.1}s ease-in-out infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}
                {/* Microphone icon - simulates voice input with current suggestion */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleMicClick}
                  onKeyDown={(e) => e.key === 'Enter' && handleMicClick()}
                  style={{
                    width: 14,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: isRecording ? 'not-allowed' : 'pointer',
                    margin: '0 6px',
                    ...(darkMode && { filter: 'brightness(0) invert(1)' }),
                    ...(isRecording && { opacity: 1, filter: 'none' }),
                  }}
                  title="Voice input"
                >
                  <img
                    src={ASSETS.micIcon}
                    alt="Voice"
                    style={{ width: 14, height: 18, objectFit: 'contain', opacity: isRecording ? 1 : (darkMode ? 0.9 : 0.6) }}
                  />
                </div>
                {/* Video camera icon - opens avatar mode */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setAvatarModeOpen(true)}
                  onKeyDown={(e) => e.key === 'Enter' && setAvatarModeOpen(true)}
                  style={{
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer',
                    margin: '0 6px',
                  }}
                  title="Avatar mode"
                >
                  <VideoCameraAddOutlined style={{ fontSize: 18, color: darkMode ? 'rgba(255,255,255,0.65)' : '#484848' }} />
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
            )}
            <div style={{ textAlign: 'center', marginTop: showWelcome ? 0 : 8 }}>
              <Text type="secondary" style={{ fontSize: 14, lineHeight: '18px' }}>
                By using this AI project, you acknowledge and agree to these{' '}
                <a style={{ color: darkMode ? '#FFC627' : '#8C1D40', textDecoration: 'underline' }}>terms</a>.
                CreateAI may display incorrect or false information.
              </Text>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  )
}
