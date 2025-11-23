import { Modal, Button } from 'antd'
import { ReactNode } from 'react'

interface CoreModalProps {
  open?: boolean
  title?: string
  okText?: string
  cancelText?: string
  onCancel: () => void
  onOk: () => void
  loading?: boolean
  children: ReactNode
  footer?: ReactNode
  width?: number
}

export const CoreModal = ({
  open = false,
  title,
  okText = 'OK',
  cancelText = 'Cancel',
  onCancel,
  onOk,
  loading = false,
  children,
  footer,
  width = 600
}: CoreModalProps) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={loading}
      width={width}
      footer={
        footer ?? [
          <Button key='cancel' onClick={onCancel}>
            {cancelText}
          </Button>,
          <Button key='submit' type='primary' loading={loading} onClick={onOk}>
            {okText}
          </Button>
        ]
      }
    >
      {children}
    </Modal>
  )
}
