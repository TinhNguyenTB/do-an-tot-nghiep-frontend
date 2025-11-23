import React from 'react'
import { message } from 'antd'

export const MessageContext = React.createContext<ReturnType<typeof message.useMessage> | null>(
  null
)

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const messageApi = message.useMessage()

  return (
    <MessageContext.Provider value={messageApi}>
      {messageApi[1] /* contextHolder */}
      {children}
    </MessageContext.Provider>
  )
}
