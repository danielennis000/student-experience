import { useState } from 'react'
import { Typography, Popover } from 'antd'
import {
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
  BookOutlined,
  ShareAltOutlined,
  CopyOutlined,
  DownOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { mockSources } from '../data/mockData'

const { Text } = Typography

export default function FeedbackRow({ darkMode = false }: { darkMode?: boolean }) {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const popoverBorder = darkMode ? '#434343' : '#f0f0f0'
  const cardBg = darkMode ? '#262626' : '#fff'
  const cardMuted = darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const cardText = darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.65)'
  const iconHover = darkMode ? 'rgba(255,255,255,0.85)' : '#484848'

  const sourcesClickContent = (
    <div style={{ width: 380, maxHeight: 420, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: `1px solid ${popoverBorder}`,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 16 }}>Sources</span>
        <CloseOutlined
          style={{ fontSize: 14, color: darkMode ? 'rgba(255,255,255,0.45)' : '#bfbfbf', cursor: 'pointer' }}
          onClick={() => setSourcesOpen(false)}
        />
      </div>
      <div style={{ overflow: 'auto', flex: 1 }}>
        {mockSources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: 16 }}
          >
            <div
              style={{
                background: darkMode ? '#434343' : '#000',
                color: '#fff',
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 20,
                display: 'inline-block',
                marginBottom: 6,
              }}
            >
              {source.name}
            </div>
            <div style={{ background: cardBg, border: `1px solid ${popoverBorder}`, borderRadius: 12, padding: 12, boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.35)' : '0 1px 2px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 12, color: cardMuted, marginBottom: 4 }}>{source.name}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{source.title || source.name}</div>
              {source.description && (
                <div style={{ fontSize: 12, color: cardText, lineHeight: 1.4 }}>{source.description}</div>
              )}
            </div>
          </a>
        ))}
        <div style={{ marginTop: 8 }}>
          <a href="#" style={{ fontWeight: 600, fontSize: 13, color: darkMode ? '#FFC627' : '#8C1D40' }} onClick={(e) => e.preventDefault()}>
            More
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
        paddingTop: 4,
      }}
    >
      {[LikeOutlined, DislikeOutlined, MessageOutlined, BookOutlined, ShareAltOutlined, CopyOutlined].map(
        (Icon, i) => (
          <Icon
            key={i}
            style={{ fontSize: 14, color: darkMode ? 'rgba(255,255,255,0.45)' : '#bfbfbf', cursor: 'pointer' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = iconHover }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = darkMode ? 'rgba(255,255,255,0.45)' : '#bfbfbf' }}
          />
        ),
      )}
      <Text type="secondary" style={{ fontSize: 12 }}>
        Tokens: 120
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Cost: ≤ 0.18
      </Text>
      <Popover
        content={sourcesClickContent}
        trigger="click"
        placement="bottomLeft"
        open={sourcesOpen}
        onOpenChange={setSourcesOpen}
      >
        <Text
          type="secondary"
          style={{ fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 2 }}
        >
          Sources <DownOutlined style={{ fontSize: 9 }} />
        </Text>
      </Popover>
    </div>
  )
}
