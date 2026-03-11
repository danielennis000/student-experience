import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme } from 'antd'
import { asuTheme } from './theme/asuTheme'
import { DarkModeProvider } from './contexts/DarkModeContext'
import ChatLayout from './components/ChatLayout'

const DARK_STORAGE_KEY = 'createai-dark-mode'
const AVATAR_STORAGE_KEY = 'createai-avatar'

const AVATAR_OPTIONS = ['liv', 'anne', 'mia', 'kevin', 'richard'] as const
export type AvatarId = (typeof AVATAR_OPTIONS)[number]

function MainChat({
  darkMode,
  setDarkMode,
  avatar,
  setAvatar,
  onboardingMode = false,
}: {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
  avatar: AvatarId
  setAvatar: (v: AvatarId) => void
  onboardingMode?: boolean
}) {
  return (
    <DarkModeProvider darkMode={darkMode} setDarkMode={setDarkMode}>
      <ChatLayout
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
        avatar={avatar}
        onAvatarChange={setAvatar}
        onboardingMode={onboardingMode}
      />
    </DarkModeProvider>
  )
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(DARK_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const [avatar, setAvatar] = useState<AvatarId>(() => {
    try {
      const stored = localStorage.getItem(AVATAR_STORAGE_KEY)
      if (stored && AVATAR_OPTIONS.includes(stored as AvatarId)) return stored as AvatarId
    } catch {}
    return 'liv'
  })

  useEffect(() => {
    try {
      localStorage.setItem(DARK_STORAGE_KEY, String(darkMode))
    } catch {}
  }, [darkMode])

  useEffect(() => {
    try {
      localStorage.setItem(AVATAR_STORAGE_KEY, avatar)
    } catch {}
  }, [avatar])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <ConfigProvider
      theme={
        darkMode
          ? { algorithm: theme.darkAlgorithm, token: { colorPrimary: '#8C1D40', fontFamily: asuTheme?.token?.fontFamily } }
          : asuTheme
      }
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/first-semester" element={<MainChat darkMode={darkMode} setDarkMode={setDarkMode} avatar={avatar} setAvatar={setAvatar} />} />
          <Route path="/onboarding" element={<MainChat darkMode={darkMode} setDarkMode={setDarkMode} avatar={avatar} setAvatar={setAvatar} onboardingMode />} />
        </Routes>
      </HashRouter>
    </ConfigProvider>
  )
}
