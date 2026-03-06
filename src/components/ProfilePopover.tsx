import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Typography } from 'antd'
import {
  SettingOutlined,
  MessageOutlined,
  WarningOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { mockProfile } from '../data/mockData'

const { Text } = Typography

interface ProfilePopoverProps {
  onSettings: () => void
  onClose: () => void
  triggerRef: React.RefObject<HTMLDivElement | null>
}

const items = [
  { icon: <SettingOutlined />, label: 'Settings', key: 'settings' },
  { icon: <MessageOutlined />, label: 'Give feedback', key: 'feedback' },
  { icon: <WarningOutlined />, label: 'Report a problem', key: 'report' },
  { icon: <LogoutOutlined />, label: 'Log out', key: 'logout' },
]

const POPOVER_WIDTH = 220
const GAP = 8

export default function ProfilePopover({ onSettings, onClose, triggerRef }: ProfilePopoverProps) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPosition({
      top: rect.top,
      left: Math.min(Math.max(rect.left, 8), window.innerWidth - POPOVER_WIDTH - 8),
    })
  }, [triggerRef])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      )
        return
      onClose()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, triggerRef])

  const content = (
    <>
      <div
        ref={popoverRef}
        role="dialog"
        aria-label="Profile menu"
        style={{
          position: 'fixed',
          bottom: position ? window.innerHeight - position.top + GAP : 48,
          left: position?.left ?? 8,
          width: POPOVER_WIDTH,
          background: '#fff',
          border: '1px solid #e8e8e8',
          borderRadius: 12,
          padding: '12px 0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          zIndex: 1100,
        }}
      >
        <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <InfoCircleOutlined style={{ fontSize: 14, color: '#bfbfbf' }} />
          <Text style={{ fontSize: 14 }}>{mockProfile.email}</Text>
        </div>
        <div style={{ borderTop: '1px solid #f0f0f0', margin: '0 0 4px' }} />
        {items.map((item) => (
          <div
            key={item.key}
            style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              fontSize: 14,
              transition: 'background 0.15s',
            }}
            className="sidebar-history-item"
            onClick={() => {
              if (item.key === 'settings') onSettings()
              onClose()
            }}
          >
            <span style={{ fontSize: 15, color: '#484848' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </>
  )

  return createPortal(content, document.body)
}
