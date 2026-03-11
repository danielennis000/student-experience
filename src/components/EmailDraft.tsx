import { useState } from 'react'
import { Typography, Input, Select } from 'antd'
import { CheckCircleFilled, SendOutlined } from '@ant-design/icons'
import { mockEmailDraft, mockBioEmailDraft } from '../data/mockData'

const { Text, Paragraph } = Typography
const { TextArea } = Input

// Mock study group members (biology class context)
const STUDY_GROUP_MEMBERS = [
  { label: 'Sarah Chen', value: 'sarah.chen@asu.edu' },
  { label: 'Marcus Rivera', value: 'marcus.rivera@asu.edu' },
  { label: 'Emily Park', value: 'emily.park@asu.edu' },
  { label: 'James Torres', value: 'james.torres@asu.edu' },
  { label: 'Priya Patel', value: 'priya.patel@asu.edu' },
]

// Professor recipient for BIO 181
const PROFESSOR_RECIPIENT = [
  { label: 'Dr. Wilson (BIO 181)', value: 'jwilson@asu.edu' },
]

interface EmailDraftProps {
  onSwitchToSlack?: () => void
  onSend?: () => void
  darkMode?: boolean
  isBioEmail?: boolean
}

export default function EmailDraft({ onSwitchToSlack, onSend, darkMode = false, isBioEmail = false }: EmailDraftProps) {
  const emailData = isBioEmail ? mockBioEmailDraft : mockEmailDraft
  const recipientOptions = isBioEmail ? PROFESSOR_RECIPIENT : STUDY_GROUP_MEMBERS
  const defaultRecipients = isBioEmail 
    ? ['jwilson@asu.edu']
    : ['sarah.chen@asu.edu', 'marcus.rivera@asu.edu', 'emily.park@asu.edu']
  
  const [recipients, setRecipients] = useState<string[]>(defaultRecipients)
  const [subject, setSubject] = useState(emailData.subject)
  const [body, setBody] = useState(emailData.body)
  const borderColor = darkMode ? '#434343' : '#e8e8e8'
  const textColor = darkMode ? 'rgba(255,255,255,0.85)' : '#191919'
  const mutedColor = darkMode ? 'rgba(255,255,255,0.65)' : '#484848'
  const bgColor = darkMode ? '#141414' : '#fff'
  const hoverBg = darkMode ? '#262626' : '#f5f5f5'

  return (
    <div>
      <div
        style={{
          border: `1px solid ${borderColor}`,
          borderRadius: 24,
          padding: '20px 24px',
          marginBottom: 16,
          background: bgColor,
        }}
      >
        {/* Header: Email label + Account info + Send icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <Text type="secondary" style={{ fontSize: 14 }}>
            Email
          </Text>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Account info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: mutedColor }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
              </svg>
              <span>dennis4@asu.edu</span>
              <CheckCircleFilled style={{ color: '#52c41a', fontSize: 12 }} />
              <span style={{ fontSize: 11, color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>connected</span>
            </div>
            
            {/* Send icon button */}
            <div
              onClick={onSend}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
                background: hoverBg,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#303030' : '#e8e8e8'}
              onMouseLeave={(e) => e.currentTarget.style.background = hoverBg}
            >
              <SendOutlined style={{ fontSize: 14, color: darkMode ? 'rgba(255,255,255,0.85)' : '#8C1D40' }} />
            </div>
          </div>
        </div>

        {/* To field - editable recipients */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <strong style={{ color: textColor, fontSize: 15, marginTop: 4, flexShrink: 0 }}>To</strong>
            <Select
              mode="multiple"
              value={recipients}
              onChange={setRecipients}
              options={recipientOptions}
              variant="borderless"
              style={{ flex: 1, fontSize: 15 }}
              placeholder="Add recipients"
              maxTagCount="responsive"
              dropdownStyle={{
                background: bgColor,
                border: `1px solid ${borderColor}`,
              }}
              tagRender={(props) => {
                const { label, closable, onClose } = props
                return (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '2px 8px',
                      background: darkMode ? '#262626' : '#f5f5f5',
                      border: `1px solid ${borderColor}`,
                      borderRadius: 4,
                      fontSize: 13,
                      color: textColor,
                      marginRight: 4,
                      marginBottom: 4,
                    }}
                  >
                    {label}
                    {closable && (
                      <span
                        onClick={onClose}
                        style={{ cursor: 'pointer', marginLeft: 2, opacity: 0.6 }}
                      >
                        ×
                      </span>
                    )}
                  </span>
                )
              }}
            />
          </div>
        </div>

        {/* Subject field - editable */}
        <div style={{ marginBottom: 16 }}>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            variant="borderless"
            prefix={<strong style={{ marginRight: 8, color: textColor }}>Subject</strong>}
            style={{
              padding: 0,
              fontSize: 15,
              color: textColor,
            }}
          />
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
              color: textColor,
              resize: 'none',
              borderRadius: 0,
            }}
          />
        </div>
      </div>

      <Paragraph style={{ fontSize: 15, lineHeight: '24px', color: mutedColor }}>
        {isBioEmail ? (
          <>Feel free to make any changes directly to the draft. When you're ready, I can send it for you.</>
        ) : (
          <>
            Feel free to make any changes directly to the draft. When you're ready, I can send it for you. Or you can {' '}
            <a
              onClick={onSwitchToSlack}
              style={{ color: darkMode ? '#FFC627' : '#8C1D40', textDecoration: 'underline', cursor: 'pointer' }}
            >
              send it via Slack
            </a>
            .
          </>
        )}
      </Paragraph>
    </div>
  )
}
