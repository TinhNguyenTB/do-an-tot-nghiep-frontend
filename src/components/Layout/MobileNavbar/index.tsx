import React from 'react'
import { Layout, theme, Button } from 'antd'
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth/logout'
import { MENU_URL } from '@/constants/menuUrl'
import { useRbacStore } from '@/store/rbacStore'

const { Header } = Layout

interface MobileNavbarProps {
  onToggleSidebar: () => void
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ onToggleSidebar }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { toastSuccess } = useGlobalMessage()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess(data) {
      useRbacStore.getState().logout()
      toastSuccess(data.message)
      navigate(MENU_URL.LOGIN)
    }
  })

  return (
    <Header
      style={{
        padding: '0 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: colorBgContainer,
        height: 50 // Chiều cao nhỏ hơn trên mobile
      }}
    >
      <div className='flex items-center gap-3'>
        {/* Nút Toggle Sidebar */}
        <Button
          type='text'
          icon={<MenuOutlined style={{ fontSize: '1.2rem' }} />}
          onClick={onToggleSidebar}
        />
      </div>

      {/* Controls bên phải */}
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <LogoutOutlined
          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
          onClick={() => mutate()}
        />
      </div>
    </Header>
  )
}

export default MobileNavbar
