import { useContext } from 'react'
import { MessageContext } from '@/hoc/MessageProvider'

export const useGlobalMessage = () => {
  const context = useContext(MessageContext)

  if (!context) throw new Error('useGlobalMessage must be used within <MessageProvider>')

  const [messageApi] = context

  return {
    success: (msg: string) => messageApi.open({ type: 'success', content: msg }),
    error: (msg: string) => messageApi.open({ type: 'error', content: msg }),
    warning: (msg: string) => messageApi.open({ type: 'warning', content: msg }),
    info: (msg: string) => messageApi.open({ type: 'info', content: msg })
  }
}
