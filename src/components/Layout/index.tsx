import React from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Layout/Sidebar'
import Navbar from '@/components/Layout/Navbar'

const { Content } = Layout

export const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Navbar />
        <Content style={{ margin: '1rem' }}>
          <div
            style={{
              padding: '1.5rem',
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
