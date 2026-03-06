import { useState } from 'react'
import { Typography, Popover } from 'antd'
import { mockEvents, mockSources } from '../data/mockData'

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

function SourcePill({ domain }: { domain: string }) {
  const [hover, setHover] = useState(false)
  const sourceMeta = mockSources.find((s) => s.name === domain)
  const href = sourceMeta?.url ?? '#'
  const cardContent = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: 12,
        padding: 12,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        minWidth: 260,
        maxWidth: 360,
      }}
    >
      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>{domain}</div>
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
        {sourceMeta?.title ?? domain}
      </div>
      {sourceMeta?.description && (
        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', lineHeight: 1.4 }}>{sourceMeta.description}</div>
      )}
    </a>
  )
  return (
    <Popover content={cardContent} trigger="hover" placement="bottomLeft">
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'inline-block',
          marginTop: 4,
          padding: '2px 10px',
          background: hover ? '#000' : '#f5f5f5',
          border: '1px solid #e8e8e8',
          borderRadius: 9999,
          fontSize: 12,
          color: hover ? '#fff' : '#747474',
          cursor: 'pointer',
        }}
      >
        {domain}
      </span>
    </Popover>
  )
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
            <SourcePill domain={event.source} />
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
