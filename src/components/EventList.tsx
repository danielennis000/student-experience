import { Typography } from 'antd'
import { mockEvents } from '../data/mockData'

const { Text, Paragraph } = Typography

function renderDetail(detail: string) {
  const parts = detail.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export default function EventList() {
  return (
    <div style={{ fontSize: 15, lineHeight: '24px', color: '#191919' }}>
      <Paragraph style={{ marginBottom: 16 }}>
        Here are some <strong>Arizona State University (ASU) events</strong> happening
        today, Thursday, March 5, 2026 that you might be interested in:
      </Paragraph>

      <Paragraph style={{ fontWeight: 600, marginBottom: 12 }}>
        🎓 Academic &amp; Campus Events
      </Paragraph>

      {mockEvents.map((event, idx) => (
        <div key={event.id} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {idx + 1}. {event.title}
          </div>
          <div style={{ paddingLeft: 16 }}>
            {event.details.map((detail, j) => (
              <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 2 }}>
                <span style={{ color: '#747474' }}>•</span>
                <span>{renderDetail(detail)}</span>
              </div>
            ))}
            <span
              style={{
                display: 'inline-block',
                marginTop: 4,
                padding: '2px 10px',
                background: '#f5f5f5',
                border: '1px solid #e8e8e8',
                borderRadius: 4,
                fontSize: 12,
                color: '#747474',
              }}
            >
              {event.source}
            </span>
          </div>
        </div>
      ))}

      <Paragraph style={{ marginTop: 16 }}>
        <Text>
          Would you like me to list sports games or athletic events happening today for
          ASU (like Sun Devil teams)?
        </Text>
      </Paragraph>
    </div>
  )
}
