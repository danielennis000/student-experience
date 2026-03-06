import { Drawer, Typography, Button, Divider, Avatar, Badge } from 'antd'
import {
  PlusOutlined,
  MessageOutlined,
  ExperimentOutlined,
  BookOutlined,
  ScheduleOutlined,
  RobotOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import { mockProfile, mockChatHistory, mockAIProjects } from '../data/mockData'

const { Text, Title } = Typography

interface SidebarDrawerProps {
  open: boolean
  onClose: () => void
}

const projectIcons: Record<string, React.ReactNode> = {
  chat: <MessageOutlined />,
  experiment: <ExperimentOutlined />,
  book: <BookOutlined />,
  schedule: <ScheduleOutlined />,
  robot: <RobotOutlined />,
  bulb: <BulbOutlined />,
}

export default function SidebarDrawer({ open, onClose }: SidebarDrawerProps) {
  return (
    <Drawer
      placement="left"
      open={open}
      onClose={onClose}
      width={300}
      closable={false}
      styles={{
        body: { padding: 0, display: 'flex', flexDirection: 'column', height: '100%' },
        header: { display: 'none' },
      }}
    >
      <div style={{ padding: '16px 16px 12px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          block
          size="large"
          style={{ borderRadius: 24, fontWeight: 600 }}
        >
          New Chat
        </Button>
      </div>

      <Divider style={{ margin: '0 0 8px' }} />

      <div style={{ padding: '0 16px 12px' }}>
        <Text
          type="secondary"
          style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}
        >
          AI Projects
        </Text>
      </div>

      <div style={{ padding: '0 8px' }}>
        {mockAIProjects.map((project) => (
          <div
            key={project.id}
            className={`sidebar-project-item${project.active ? ' active' : ''}`}
          >
            <Avatar
              size={32}
              style={{
                background: project.active ? '#8C1D40' : '#f0f0f0',
                color: project.active ? '#fff' : '#484848',
                fontSize: 14,
              }}
              icon={projectIcons[project.icon]}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text
                strong={project.active}
                style={{ fontSize: 14, display: 'block', lineHeight: '18px' }}
                ellipsis
              >
                {project.name}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }} ellipsis>
                {project.description}
              </Text>
            </div>
            {project.badge && (
              <Badge
                count={project.badge}
                style={{ backgroundColor: '#FFC627', color: '#191919', fontSize: 10, fontWeight: 700 }}
              />
            )}
          </div>
        ))}
      </div>

      <Divider style={{ margin: '12px 0 8px' }} />

      <div style={{ padding: '0 16px 8px' }}>
        <Text
          type="secondary"
          style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}
        >
          Recent Chats
        </Text>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
        {mockChatHistory.map((chat) => (
          <div key={chat.id} className="sidebar-history-item">
            <Text style={{ fontSize: 14, display: 'block', lineHeight: '20px' }} ellipsis>
              {chat.title}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {chat.timestamp}
            </Text>
          </div>
        ))}
      </div>

      <Divider style={{ margin: '8px 0' }} />

      <div style={{ padding: '8px 16px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar size={32} src={mockProfile.avatar} />
        <div style={{ flex: 1 }}>
          <Text strong style={{ fontSize: 14, display: 'block' }}>
            {mockProfile.name}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {mockProfile.email}
          </Text>
        </div>
      </div>
    </Drawer>
  )
}
