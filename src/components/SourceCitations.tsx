import { Typography } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { mockSources } from '../data/mockData'

const { Text } = Typography

export default function SourceCitations() {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <GlobalOutlined style={{ fontSize: 13, color: '#747474' }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          Based on {mockSources.length} sources
        </Text>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {mockSources.map((source, i) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-pill"
            title={source.url}
          >
            <span className="source-num">{i + 1}</span>
            {source.favicon && (
              <img
                src={source.favicon}
                alt=""
                style={{ width: 14, height: 14, borderRadius: 2 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
            <span>{source.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
