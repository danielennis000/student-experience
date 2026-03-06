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

export default function FeedbackRow() {
  const [sourcesOpen, setSourcesOpen] = useState(false)

  const sourcesClickContent = (
    <div style={{ width: 380, maxHeight: 420, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 16 }}>Sources</span>
        <CloseOutlined
          style={{ fontSize: 14, color: '#bfbfbf', cursor: 'pointer' }}
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
                background: '#000',
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
            <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>{source.name}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{source.title || source.name}</div>
              {source.description && (
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)', lineHeight: 1.4 }}>{source.description}</div>
              )}
            </div>
          </a>
        ))}
        <div style={{ marginTop: 8 }}>
          <a href="#" style={{ fontWeight: 600, fontSize: 13, color: '#8C1D40' }} onClick={(e) => e.preventDefault()}>
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
            style={{ fontSize: 14, color: '#bfbfbf', cursor: 'pointer' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#484848' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#bfbfbf' }}
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
