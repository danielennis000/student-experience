import { Typography } from 'antd'
import {
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
  BookOutlined,
  ShareAltOutlined,
  CopyOutlined,
  DownOutlined,
} from '@ant-design/icons'

const { Text } = Typography

export default function FeedbackRow() {
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
      <div style={{ flex: 1 }} />
      <Text type="secondary" style={{ fontSize: 12 }}>
        Tokens: 120
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Cost: ≤ 0.18
      </Text>
      <Text
        type="secondary"
        style={{ fontSize: 12, cursor: 'pointer' }}
      >
        Sources <DownOutlined style={{ fontSize: 9 }} />
      </Text>
    </div>
  )
}
