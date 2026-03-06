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
}

const items = [
  { icon: <SettingOutlined />, label: 'Settings', key: 'settings' },
  { icon: <MessageOutlined />, label: 'Give feedback', key: 'feedback' },
  { icon: <WarningOutlined />, label: 'Report a problem', key: 'report' },
  { icon: <LogoutOutlined />, label: 'Log out', key: 'logout' },
]

export default function ProfilePopover({ onSettings, onClose }: ProfilePopoverProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: 8,
        width: 220,
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 12,
        padding: '12px 0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        zIndex: 1000,
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
  )
}
