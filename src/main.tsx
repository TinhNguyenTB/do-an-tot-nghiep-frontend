import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import 'antd/dist/reset.css'
import { QueryClientProvider } from '@tanstack/react-query'
import '@/i18n'
import { queryClient } from '@/libs/tanstackQuery'
import { MessageProvider } from '@/hoc/MessageProvider'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import ThemeProvider from '@/hoc/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <BrowserRouter basename='/'>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </MessageProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
