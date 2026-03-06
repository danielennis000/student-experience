import { Modal } from 'antd'

// Load the widget in an iframe from a static HTML page so it runs in its own
// document with element-then-script order. Avoids React/portal and script blocking.
const WIDGET_PAGE = `${import.meta.env.BASE_URL}anam-widget.html`

interface AvatarModeModalProps {
  open: boolean
  onClose: () => void
}

export default function AvatarModeModal({ open, onClose }: AvatarModeModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      centered
      destroyOnClose
      styles={{ body: { padding: 0, minHeight: 420 } }}
      title="Avatar mode"
    >
      <iframe
        title="Anam avatar widget"
        src={WIDGET_PAGE}
        allow="microphone"
        style={{
          width: '100%',
          height: 420,
          border: 'none',
          borderRadius: 8,
          display: 'block',
        }}
      />
    </Modal>
  )
}
