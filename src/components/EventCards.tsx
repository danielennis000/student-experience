import { Card, Tag, Button, Typography, Space, Row, Col } from 'antd'
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { mockEvents } from '../data/mockData'

const { Title, Text, Paragraph } = Typography

interface EventCardsProps {
  onShare: (eventId: string) => void
}

const tagColors: Record<string, string> = {
  AI: '#8C1D40',
  'Computer Science': '#8C1D40',
  Robotics: '#FFC627',
  Entrepreneurship: '#747474',
}

export default function EventCards({ onShare }: EventCardsProps) {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      {mockEvents.map((event) => (
        <Col xs={24} md={8} key={event.id}>
          <Card
            style={{ border: '1px solid #e8e8e8', height: '100%' }}
            styles={{ body: { padding: 16, display: 'flex', flexDirection: 'column', height: '100%' } }}
          >
            <div style={{ marginBottom: 8 }}>
              {event.relevance.map((tag) => (
                <Tag
                  key={tag}
                  color={tagColors[tag] || '#747474'}
                  style={{ borderRadius: 12 }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
            <Title level={5} style={{ marginBottom: 4, marginTop: 0 }}>
              {event.title}
            </Title>
            <Space direction="vertical" size={2} style={{ marginBottom: 8 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                {event.date}, {event.time}
              </Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                <EnvironmentOutlined style={{ marginRight: 4 }} />
                {event.location}
              </Text>
            </Space>
            <Paragraph
              type="secondary"
              ellipsis={{ rows: 2 }}
              style={{ fontSize: 13, marginBottom: 12, flex: 1 }}
            >
              {event.description}
            </Paragraph>
            <Button
              type="primary"
              icon={<ShareAltOutlined />}
              onClick={() => onShare(event.id)}
              block
            >
              Share with study group
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
