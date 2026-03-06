import { useState } from 'react'
import { Modal, Tabs, Typography, Switch, Select, Button, Input, Divider, Tag } from 'antd'
import {
  SettingOutlined,
  UserOutlined,
  ToolOutlined,
  GoogleOutlined,
  MailOutlined,
  PlusOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const AVATAR_OPTIONS = [
  { label: 'Liv', value: 'liv' },
  { label: 'Anne', value: 'anne' },
  { label: 'Mia', value: 'mia' },
  { label: 'Kevin', value: 'kevin' },
  { label: 'Richard', value: 'richard' },
]

interface SettingsModalProps {
  open: boolean
  onClose: () => void
  darkMode?: boolean
  onDarkModeChange?: (value: boolean) => void
  avatar?: string
  onAvatarChange?: (value: string) => void
}

interface McpServer {
  id: string
  name: string
  url: string
  toolsCount: number
  enabled: boolean
  tools?: string[]
}

const FIGMA_MCP_TOOLS = [
  'get_design_context',
  'get_variable_defs',
  'get_screenshot',
  'get_code_connect_map',
  'add_code_connect_map',
  'get_code_connect_suggestions',
  'send_code_connect_mappings',
  'get_metadata',
  'create_design_system_rules',
  'get_figjam',
  'get_code_for_selection',
  'map_selection_to_code_connect',
]

export default function SettingsModal({ open, onClose, darkMode = false, onDarkModeChange, avatar = 'liv', onAvatarChange }: SettingsModalProps) {
  const [language, setLanguage] = useState('auto')
  const [voice, setVoice] = useState('sol')
  const [nickname, setNickname] = useState('')
  const [role, setRole] = useState('')
  const [moreAbout, setMoreAbout] = useState('')
  const [mcpModalOpen, setMcpModalOpen] = useState(false)
  const [mcpName, setMcpName] = useState('')
  const [mcpUrl, setMcpUrl] = useState('')
  const [mcpServers, setMcpServers] = useState<McpServer[]>([
    { id: 'figma', name: 'Figma', url: 'http://127.0.0.1:3845/mcp', toolsCount: FIGMA_MCP_TOOLS.length, enabled: true, tools: FIGMA_MCP_TOOLS },
  ])
  const [toolsExpanded, setToolsExpanded] = useState<Record<string, boolean>>({})

  const cardBg = darkMode ? '#262626' : '#fafafa'
  const cardBorder = darkMode ? '1px solid #434343' : '1px solid #f0f0f0'
  const iconBg = darkMode ? '#434343' : '#e8e8e8'
  const iconColor = darkMode ? 'rgba(255,255,255,0.65)' : '#666'
  const addCardBorder = darkMode ? '1px dashed #434343' : '1px dashed #d9d9d9'

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={880}
      styles={{ body: { padding: 0, height: 560 } }}
      centered
      className={`settings-modal ${darkMode ? 'settings-modal-dark' : ''}`}
    >
      <Tabs
        tabPosition="left"
        style={{ height: 560 }}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 4, height: 28, background: '#FFC627', borderRadius: 2 }} />
                  <Title level={3} style={{ margin: 0, fontWeight: 700 }}>General</Title>
                </div>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  These settings apply to all projects for your profile within CreateAI Builder
                </Paragraph>

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Text>Appearance: Enable dark mode</Text>
                  <Switch checked={darkMode} onChange={(v) => onDarkModeChange?.(v)} />
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

                <Divider style={{ margin: '16px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Text>Avatar</Text>
                  <Select
                    value={avatar}
                    onChange={(v) => onAvatarChange?.(v)}
                    style={{ width: 140 }}
                    options={AVATAR_OPTIONS}
                  />
                </div>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 4, height: 28, background: '#FFC627', borderRadius: 2 }} />
                  <Title level={3} style={{ margin: 0, fontWeight: 700 }}>Personalization</Title>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 4, height: 28, background: '#FFC627', borderRadius: 2 }} />
                  <Title level={3} style={{ margin: 0, fontWeight: 700 }}>Tools</Title>
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '14px 16px', background: cardBg, borderRadius: 12, border: cardBorder }}>
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '14px 16px', background: cardBg, borderRadius: 12, border: cardBorder }}>
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

                <Text strong style={{ display: 'block', marginBottom: 12 }}>MCP Servers</Text>
                <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                  Configure Model Context Protocol servers. Add a server name and URL to connect tools (e.g. Figma).
                </Paragraph>

                {mcpServers.map((server) => {
                  const tools = server.tools ?? []
                  const showMore = tools.length > 6
                  const expanded = toolsExpanded[server.id] ?? false
                  const visibleTools = showMore && !expanded ? tools.slice(0, 6) : tools
                  return (
                    <div
                      key={server.id}
                      style={{ marginBottom: 16, padding: '14px 16px', background: cardBg, borderRadius: 12, border: cardBorder }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tools.length ? 12 : 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 8, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: iconColor }}>
                            {server.name.charAt(0)}
                          </div>
                          <div>
                            <Text strong style={{ display: 'block' }}>{server.name}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {server.toolsCount} {server.toolsCount === 1 ? 'tool' : 'tools'} {server.enabled ? 'enabled' : 'available'}
                            </Text>
                          </div>
                        </div>
                        <Switch checked={server.enabled} onChange={(checked) => setMcpServers((prev) => prev.map((s) => (s.id === server.id ? { ...s, enabled: checked } : s)))} />
                      </div>
                      {tools.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {visibleTools.map((tool) => (
                              <Tag key={tool} style={{ margin: 0, fontFamily: 'monospace', fontSize: 11 }}>
                                {tool}
                              </Tag>
                            ))}
                          </div>
                          {showMore && (
                            <button
                              type="button"
                              onClick={() => setToolsExpanded((prev) => ({ ...prev, [server.id]: !expanded }))}
                              style={{
                                marginTop: 8,
                                padding: 0,
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: 12,
                                color: darkMode ? '#FFC627' : '#8C1D40',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              {expanded ? (
                                <>Show less <UpOutlined style={{ fontSize: 10 }} /></>
                              ) : (
                                <>Show more <DownOutlined style={{ fontSize: 10 }} /></>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setMcpModalOpen(true)}
                  onKeyDown={(e) => e.key === 'Enter' && setMcpModalOpen(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: '14px 16px', background: cardBg, borderRadius: 12, border: addCardBorder, cursor: 'pointer' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: iconColor }}>
                    <PlusOutlined />
                  </div>
                  <div>
                    <Text strong style={{ display: 'block' }}>New MCP Server</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>Add a Custom MCP Server</Text>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title="Add MCP Server"
        open={mcpModalOpen}
        onCancel={() => { setMcpModalOpen(false); setMcpName(''); setMcpUrl('') }}
        onOk={() => {
          if (mcpName.trim() && mcpUrl.trim()) {
            setMcpServers((prev) => [...prev, { id: `mcp-${Date.now()}`, name: mcpName.trim(), url: mcpUrl.trim(), toolsCount: 0, enabled: true }])
            setMcpModalOpen(false)
            setMcpName('')
            setMcpUrl('')
          }
        }}
        okButtonProps={{ disabled: !mcpName.trim() || !mcpUrl.trim() }}
        okText="Add"
      >
        <div style={{ marginBottom: 16 }}>
          <Text style={{ display: 'block', marginBottom: 6 }}>Name</Text>
          <Input placeholder="e.g. Figma" value={mcpName} onChange={(e) => setMcpName(e.target.value)} />
        </div>
        <div>
          <Text style={{ display: 'block', marginBottom: 6 }}>URL</Text>
          <Input placeholder="e.g. http://127.0.0.1:3845/mcp" value={mcpUrl} onChange={(e) => setMcpUrl(e.target.value)} />
        </div>
      </Modal>
    </Modal>
  )
}
