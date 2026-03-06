import { useState } from 'react'
import { Card, Input, Button, Select, Typography, Space, Divider } from 'antd'
import { SendOutlined, MessageOutlined } from '@ant-design/icons'
import { mockEmailDraft, mockProfile } from '../data/mockData'

const { Text } = Typography
const { TextArea } = Input

interface EmailComposerProps {
  onSwitchToSlack: () => void
}

export default function EmailComposer({ onSwitchToSlack }: EmailComposerProps) {
  const [subject, setSubject] = useState(mockEmailDraft.subject)
  const [body, setBody] = useState(mockEmailDraft.body)
  const [to, setTo] = useState(mockEmailDraft.to)

  return (
    <Card
      style={{ border: '1px solid #e8e8e8', marginTop: 16 }}
      styles={{ body: { padding: 20 } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: '#8C1D40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          <SendOutlined style={{ color: '#fff', fontSize: 14 }} />
        </div>
        <Text strong style={{ fontSize: 16 }}>
          Email Draft
        </Text>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
          To:
        </Text>
        <Select
          value={to}
          onChange={setTo}
          style={{ width: '100%' }}
          options={mockProfile.studyGroups.map((g) => ({
            label: `${g.name} (${g.members} members)`,
            value: g.name,
          }))}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
          Subject:
        </Text>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
          Message:
        </Text>
        <TextArea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          style={{ fontFamily: 'Arial, sans-serif', resize: 'vertical' }}
        />
      </div>

      <Divider style={{ margin: '16px 0' }} />

      <Space>
        <Button type="primary" icon={<SendOutlined />}>
          Send Email
        </Button>
        <Button onClick={onSwitchToSlack} icon={<MessageOutlined />}>
          Switch to Slack
        </Button>
      </Space>
    </Card>
  )
}
