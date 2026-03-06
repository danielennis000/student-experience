import { useState } from 'react'
import { Modal, Tabs, Typography, Switch, Select, Button, Input, Divider } from 'antd'
import {
  SettingOutlined,
  UserOutlined,
  ToolOutlined,
  GoogleOutlined,
  MailOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

interface SettingsModalProps {
  open: boolean
  onClose: () => void
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('auto')
  const [voice, setVoice] = useState('sol')
  const [nickname, setNickname] = useState('')
  const [role, setRole] = useState('')
  const [moreAbout, setMoreAbout] = useState('')

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={560}
      styles={{ body: { padding: 0 } }}
      centered
    >
      <Tabs
        tabPosition="left"
        style={{ minHeight: 400 }}
        items={[
          {
            key: 'general',
            label: (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <SettingOutlined /> General
              </span>
            ),
            children: (
              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 3, height: 24, background: '#191919', borderRadius: 2 }} />
                  <Title level={3} style={{ margin: 0 }}>General</Title>
                </div>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  These settings apply to all projects for your profile within CreateAI Builder
                </Paragraph>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Text>Appearance: Enable dark mode</Text>
                  <Switch checked={darkMode} onChange={setDarkMode} />
                </div>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Text>Language</Text>
                  <Select
                    value={language}
                    onChange={setLanguage}
                    style={{ width: 140 }}
                    options={[
                      { label: 'Auto-detect', value: 'auto' },
                      { label: 'English', value: 'en' },
                      { label: 'Spanish', value: 'es' },
                    ]}
                  />
                </div>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Text>Voice</Text>
                  <Select
                    value={voice}
                    onChange={setVoice}
                    style={{ width: 140 }}
                    options={[
                      { label: 'Sol', value: 'sol' },
                      { label: 'Nova', value: 'nova' },
                      { label: 'Echo', value: 'echo' },
                    ]}
                  />
                </div>

                <Button
                  type="primary"
                  style={{ background: '#FFC627', color: '#191919', borderColor: '#FFC627', fontWeight: 600, borderRadius: 6 }}
                >
                  Save
                </Button>
              </div>
            ),
          },
          {
            key: 'personalization',
            label: (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <UserOutlined /> Personalization
              </span>
            ),
            children: (
              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 3, height: 24, background: '#191919', borderRadius: 2 }} />
                  <Title level={3} style={{ margin: 0 }}>Personalization</Title>
                </div>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  These settings are what CreateAI projects always know about you
                </Paragraph>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Text>Base style and tone</Text>
                  <Select
                    defaultValue="default"
                    style={{ width: 140 }}
                    options={[
                      { label: 'Default', value: 'default' },
                      { label: 'Casual', value: 'casual' },
                      { label: 'Academic', value: 'academic' },
                    ]}
                  />
                </div>

                <Divider style={{ margin: '16px 0' }} />

                <Text strong style={{ display: 'block', fontSize: 16, marginBottom: 16 }}>About you</Text>

                <Text style={{ display: 'block', marginBottom: 4 }}>Nickname</Text>
                <Input
                  placeholder="What should CreateAI call you?"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  style={{ marginBottom: 16 }}
                />

                <Text style={{ display: 'block', marginBottom: 4 }}>Role at ASU</Text>
                <Input
                  placeholder="PhD Student majoring in Biology"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginBottom: 16 }}
                />

                <Text style={{ display: 'block', marginBottom: 4 }}>More about you</Text>
                <Input
                  placeholder="Interests, values, or preferences to keep in mind"
                  value={moreAbout}
                  onChange={(e) => setMoreAbout(e.target.value)}
                  style={{ marginBottom: 24 }}
                />

                <Button
                  type="primary"
                  style={{ background: '#FFC627', color: '#191919', borderColor: '#FFC627', fontWeight: 600, borderRadius: 6 }}
                >
                  Save
                </Button>
              </div>
            ),
          },
          {
            key: 'tools',
            label: (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ToolOutlined /> Tools
              </span>
            ),
            children: (
              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 3, height: 24, background: '#191919', borderRadius: 2 }} />
                  <Title level={3} style={{ margin: 0 }}>Tools</Title>
                </div>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  These settings apply to all projects for your profile within CreateAI Builder
                </Paragraph>

                <Divider style={{ margin: '16px 0' }} />

                <Text strong style={{ display: 'block', marginBottom: 12 }}>External tools</Text>
                <Paragraph type="secondary" style={{ marginBottom: 20 }}>
                  Authorize external tools to connect to your account. Once authorized, you will
                  see a list of ways to invoke tools using the chat.
                </Paragraph>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <GoogleOutlined style={{ fontSize: 24, color: '#4285F4' }} />
                    <div>
                      <Text strong style={{ display: 'block' }}>Google Drive</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>Not connected</Text>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    size="small"
                    style={{ background: '#8C1D40', borderColor: '#8C1D40', borderRadius: 16, fontWeight: 600 }}
                  >
                    Connect
                  </Button>
                </div>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <MailOutlined style={{ fontSize: 24, color: '#EA4335' }} />
                    <div>
                      <Text strong style={{ display: 'block' }}>Gmail</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>Not connected</Text>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    size="small"
                    style={{ background: '#8C1D40', borderColor: '#8C1D40', borderRadius: 16, fontWeight: 600 }}
                  >
                    Connect
                  </Button>
                </div>

                <Button
                  type="primary"
                  style={{ background: '#FFC627', color: '#191919', borderColor: '#FFC627', fontWeight: 600, borderRadius: 6 }}
                >
                  Save
                </Button>
              </div>
            ),
          },
        ]}
      />
    </Modal>
  )
}
