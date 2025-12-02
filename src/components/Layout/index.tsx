import React, { useEffect, useState } from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Layout/Sidebar'
import Navbar from '@/components/Layout/Navbar'
import MobileNavbar from '@/components/Layout/MobileNavbar'

const { Content } = Layout
const MOBILE_BREAKPOINT = 768 // Định nghĩa breakpoint cho mobile

export const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  // State quản lý xem màn hình có phải mobile hay không
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT)
  // State quản lý trạng thái đóng/mở sidebar trên mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Effect để theo dõi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(isMobileNow)

      // Nếu chuyển từ mobile sang desktop, đóng mobile sidebar
      if (!isMobileNow) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Content bên trong Layout (Main Content)
  const content = (
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
  )

  if (isMobile) {
    // === CHẾ ĐỘ MOBILE ===
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* Mobile Navbar với Toggle */}
        <MobileNavbar onToggleSidebar={() => setIsSidebarOpen(true)} />

        {/* Sidebar dạng Drawer trên Mobile */}
        <Sidebar
          isMobile={true}
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <Layout>
          <Content style={{ margin: '0.5rem' }}>{content}</Content>
        </Layout>
      </Layout>
    )
  }

  // === CHẾ ĐỘ DESKTOP ===
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar isMobile={false} />
      <Layout>
        <Navbar />
        <Content style={{ margin: '1rem' }}>{content}</Content>
      </Layout>
    </Layout>
  )
}
