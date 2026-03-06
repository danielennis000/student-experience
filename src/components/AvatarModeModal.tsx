import { useEffect, useRef, useState } from 'react'
import { Modal, Spin } from 'antd'

const ANAM_AGENT_ID = '61176166-e43f-46e4-a4e8-088e0d3e2ffc'
const WIDGET_SCRIPT = 'https://unpkg.com/@anam-ai/agent-widget/dist/index.umd.js'
const DEFINE_TIMEOUT_MS = 10000

interface AvatarModeModalProps {
  open: boolean
  onClose: () => void
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

function whenDefinedWithTimeout(tagName: string, ms: number): Promise<void> {
  if (customElements.get(tagName)) return Promise.resolve()
  return Promise.race([
    customElements.whenDefined(tagName),
    new Promise<void>((_, reject) =>
      setTimeout(() => reject(new Error(`Custom element <${tagName}> not defined after ${ms}ms`)), ms)
    ),
  ])
}

export default function AvatarModeModal({ open, onClose }: AvatarModeModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !containerRef.current) return

    let mounted = true
    let el: HTMLElement | null = null

    async function init() {
      setLoading(true)
      setError(null)
      try {
        await loadScript(WIDGET_SCRIPT)
        if (!mounted || !containerRef.current) return
        await whenDefinedWithTimeout('anam-agent', DEFINE_TIMEOUT_MS)
        if (!mounted || !containerRef.current) return
        containerRef.current.innerHTML = ''
        el = document.createElement('anam-agent')
        el.setAttribute('agent-id', ANAM_AGENT_ID)
        el.setAttribute('layout', 'inline')
        containerRef.current.appendChild(el)
        await new Promise((r) => setTimeout(r, 800))
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : 'Failed to load avatar widget')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()
    return () => {
      mounted = false
      if (el && containerRef.current?.contains(el)) {
        containerRef.current.removeChild(el)
      }
    }
  }, [open])

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
      <div
        ref={containerRef}
        style={{
          width: '100%',
          minHeight: 420,
          aspectRatio: '3/2',
          background: '#fafafa',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading && <Spin size="large" />}
        {error && !loading && (
          <span style={{ color: '#ff4d4f', fontSize: 14 }}>{error}</span>
        )}
      </div>
    </Modal>
  )
}
