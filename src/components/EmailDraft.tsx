import { useState } from 'react'
import { Typography, Input } from 'antd'
import { mockEmailDraft } from '../data/mockData'

const { Text, Paragraph } = Typography
const { TextArea } = Input

interface EmailDraftProps {
  onSwitchToSlack: () => void
}

export default function EmailDraft({ onSwitchToSlack }: EmailDraftProps) {
  const [subject] = useState(mockEmailDraft.subject)
  const [body, setBody] = useState(mockEmailDraft.body)

  return (
    <div>
      <div
        style={{
          border: '1px solid #e8e8e8',
          borderRadius: 24,
          padding: '20px 24px',
          marginBottom: 16,
        }}
      >
        <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>
          Email
        </Text>

        <div style={{ marginBottom: 16 }}>
          <strong>Subject</strong> {subject}
        </div>

        <div className="email-draft-textarea">
          <TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            variant="borderless"
            autoSize={{ minRows: 6 }}
            style={{
              padding: 0,
              fontSize: 15,
              lineHeight: '24px',
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#191919',
              resize: 'none',
              borderRadius: 0,
            }}
          />
        </div>
      </div>

      <Paragraph style={{ fontSize: 15, lineHeight: '24px', color: '#484848' }}>
        Feel free to make any changes directly to the draft. When you're ready, I can send it for you. Or you can {' '}
        <a
          onClick={onSwitchToSlack}
          style={{ color: '#8C1D40', textDecoration: 'underline', cursor: 'pointer' }}
        >
          send it via Slack
        </a>
        .
      </Paragraph>
    </div>
  )
}
