import { useContext } from 'react'
import { MessageContext } from '@/hoc/MessageProvider'

export const useGlobalMessage = () => {
  const context = useContext(MessageContext)

  if (!context) throw new Error('useGlobalMessage must be used within <MessageProvider>')

  const [messageApi] = context

  return {
    toastSuccess: (msg: string) => messageApi.open({ type: 'success', content: msg }),
    toastError: (msg: string) => messageApi.open({ type: 'error', content: msg }),
    toastWarning: (msg: string) => messageApi.open({ type: 'warning', content: msg }),
    toastInfo: (msg: string) => messageApi.open({ type: 'info', content: msg })
  }
}
