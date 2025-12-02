import React from 'react'
import { Layout, theme, Tooltip, Avatar, Button } from 'antd'
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth/logout'
import { MENU_URL } from '@/constants/menuUrl'
import { UserInfo } from '@/services/auth/login/type'

const { Header } = Layout

interface MobileNavbarProps {
  onToggleSidebar: () => void
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ onToggleSidebar }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { t } = useTranslation()
  const { toastSuccess } = useGlobalMessage()
  const navigate = useNavigate()

  const user: UserInfo = JSON.parse(localStorage.getItem('userInfo')!)

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess(data) {
      localStorage.removeItem('userInfo')
      toastSuccess(data.message)
      navigate(MENU_URL.LOGIN)
    }
  })

  // Xử lý trường hợp userInfo chưa load kịp hoặc null
  const userNameInitial = user?.name?.slice(0, 1).toUpperCase() || '?'

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

        {/* Avatar và Tên User */}
        <Avatar size={30} style={{ backgroundColor: '#f56a00', fontWeight: 'bold' }}>
          {userNameInitial}
        </Avatar>
        <h1 className='text-base font-semibold'>{user?.name}</h1>
      </div>

      {/* Controls bên phải */}
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <Tooltip title={t('btn.logout')}>
          <LogoutOutlined
            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={() => mutate()}
          />
        </Tooltip>
      </div>
    </Header>
  )
}

export default MobileNavbar
