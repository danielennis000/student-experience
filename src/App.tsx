import { ConfigProvider } from 'antd'
import { asuTheme } from './theme/asuTheme'
import ChatLayout from './components/ChatLayout'

export default function App() {
  return (
    <ConfigProvider theme={asuTheme}>
      <ChatLayout />
    </ConfigProvider>
  )
}
