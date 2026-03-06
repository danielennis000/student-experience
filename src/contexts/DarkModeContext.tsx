import { createContext, useContext } from 'react'

interface DarkModeContextValue {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

const DarkModeContext = createContext<DarkModeContextValue | null>(null)

export function useDarkMode(): DarkModeContextValue {
  const ctx = useContext(DarkModeContext)
  if (!ctx) {
    return {
      darkMode: false,
      setDarkMode: () => {},
    }
  }
  return ctx
}

export function DarkModeProvider({
  darkMode,
  setDarkMode,
  children,
}: {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  children: React.ReactNode
}) {
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
