import { useState, useEffect } from 'react'
import { Typography, Popover } from 'antd'
import { mockEvents, mockSources } from '../data/mockData'
import StreamingText from './StreamingText'

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

function SourcePill({ domain, darkMode }: { domain: string; darkMode?: boolean }) {
  const [hover, setHover] = useState(false)
  const sourceMeta = mockSources.find((s) => s.name === domain)
  const href = sourceMeta?.url ?? '#'
  const cardBg = darkMode ? '#262626' : '#fff'
  const cardBorder = darkMode ? '1px solid #434343' : '1px solid #f0f0f0'
  const cardMuted = darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const cardText = darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.65)'
  const cardContent = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: cardBg,
        border: cardBorder,
        borderRadius: 12,
        padding: 12,
        boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.35)' : '0 1px 2px rgba(0,0,0,0.04)',
        minWidth: 260,
        maxWidth: 360,
      }}
    >
      <div style={{ fontSize: 12, color: cardMuted, marginBottom: 4 }}>{domain}</div>
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
        {sourceMeta?.title ?? domain}
      </div>
      {sourceMeta?.description && (
        <div style={{ fontSize: 12, color: cardText, lineHeight: 1.4 }}>{sourceMeta.description}</div>
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
          background: hover ? (darkMode ? '#525252' : '#000') : (darkMode ? '#262626' : '#f5f5f5'),
          border: darkMode ? '1px solid #434343' : '1px solid #e8e8e8',
          borderRadius: 9999,
          fontSize: 12,
          color: hover ? '#fff' : (darkMode ? 'rgba(255,255,255,0.65)' : '#747474'),
          cursor: 'pointer',
        }}
      >
        {domain}
      </span>
    </Popover>
  )
}

interface EventListProps {
  darkMode?: boolean
  streaming?: boolean
  onStreamComplete?: () => void
}

export default function EventList({ darkMode = false, streaming = false, onStreamComplete }: EventListProps) {
  const textColor = darkMode ? 'rgba(255,255,255,0.85)' : '#191919'
  
  // Build full text content
  const buildFullText = () => {
    let text = 'Here are some Arizona State University (ASU) events happening today, Thursday, March 5, 2026 that you might be interested in:\n\n'
    text += '🎓 Academic & Campus Events\n\n'
    mockEvents.forEach((event, idx) => {
      text += `${idx + 1}. ${event.title}\n`
      event.details.forEach((detail) => {
        // Strip markdown bold markers for plain text streaming
        const plainDetail = detail.replace(/\*\*/g, '')
        text += `  • ${plainDetail}\n`
      })
      text += `  [${event.source}]\n\n`
    })
    text += 'Would you like me to list sports games or athletic events happening today for ASU (like Sun Devil teams)?'
    return text
  }

  const fullText = buildFullText()

  if (!streaming) {
    return (
      <div style={{ fontSize: 15, lineHeight: '24px', color: textColor }}>
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
              <SourcePill domain={event.source} darkMode={darkMode} />
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

  // Streaming mode: simple plain text stream
  return (
    <div style={{ fontSize: 15, lineHeight: '24px', color: textColor, whiteSpace: 'pre-wrap' }}>
      <StreamingText text={fullText} speed={12} onComplete={onStreamComplete} />
    </div>
  )
}
