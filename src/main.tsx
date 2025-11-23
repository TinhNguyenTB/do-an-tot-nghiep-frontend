import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import 'antd/dist/reset.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { QueryClientProvider } from '@tanstack/react-query'
import '@/i18n' // Import i18n configuration
import { queryClient } from '@/libs/tanstackQuery'
import { MessageProvider } from '@/hoc/MessageProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
