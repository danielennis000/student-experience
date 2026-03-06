import { useState } from 'react'
import { Card, Button, Select, Typography, Input, Tag } from 'antd'
import { SendOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { mockSlackMessage, mockProfile } from '../data/mockData'

const { Text } = Typography
const { TextArea } = Input

interface SlackComposerProps {
  onSend: () => void
  darkMode?: boolean
}

export default function SlackComposer({ onSend, darkMode = false }: SlackComposerProps) {
  const [channel, setChannel] = useState(mockSlackMessage.channel)
  const [message, setMessage] = useState(mockSlackMessage.message)
  const borderColor = darkMode ? '#434343' : '#e8e8e8'
  const textareaBg = darkMode ? '#262626' : '#fafafa'

  return (
    <Card
      style={{ border: `1px solid ${borderColor}`, marginTop: 16 }}
      styles={{ body: { padding: 20 } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: '#4A154B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          S
        </div>
        <Text strong style={{ fontSize: 16 }}>
          Slack Message
        </Text>
        <Tag
          icon={<CheckCircleOutlined />}
          color="success"
          style={{ marginLeft: 10, borderRadius: 12 }}
        >
          No conflicts
        </Tag>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
          Channel:
        </Text>
        <Select
          value={channel}
          onChange={setChannel}
          style={{ width: '100%' }}
          options={mockProfile.studyGroups.map((g) => ({
            label: g.channel,
            value: g.channel,
          }))}
        />
      </div>

      <div
        className="slack-message-textarea"
        style={{
          background: textareaBg,
          border: `1px solid ${borderColor}`,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="borderless"
          autoSize={{ minRows: 6 }}
          style={{
            background: 'transparent',
            fontFamily: 'Arial, sans-serif',
            padding: 0,
            fontSize: 14,
            lineHeight: '22px',
            borderRadius: 0,
          }}
        />
      </div>

      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={onSend}
        style={{ background: '#4A154B', borderColor: '#4A154B' }}
      >
        Send to Slack
      </Button>
    </Card>
  )
}
