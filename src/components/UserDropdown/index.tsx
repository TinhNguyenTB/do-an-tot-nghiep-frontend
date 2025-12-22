import { MENU_URL } from '@/constants/menuUrl'
import { TRANSLATION } from '@/constants/translates'
import { useRbacStore } from '@/store/rbacStore'
import { DownOutlined, UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons'
import { Dropdown, Space, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface UserDropdownProps {
  email: string
  onLogout: () => void
}

const UserDropdownComponent: React.FC<UserDropdownProps> = ({ email, onLogout }) => {
  const navigate = useNavigate()
  const { t } = useTranslation(TRANSLATION.COMMON)
  const avatar = useRbacStore((state) => state.avatar)

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('menu.profile'),
      onClick: () => navigate(MENU_URL.PROFILE)
    },
    {
      key: 'change-password',
      icon: <LockOutlined />,
      label: t('menu.change-password'),
      onClick: () => navigate(MENU_URL.CHANGE_PASSWORD)
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('btn.logout'),
      danger: true,
      onClick: onLogout
    }
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement='bottomLeft'>
      <div style={{ cursor: 'pointer' }}>
        <Space>
          <Avatar icon={<UserOutlined />} src={avatar} />
          <span>{email}</span>
          <DownOutlined />
        </Space>
      </div>
    </Dropdown>
  )
}

export const UserDropdown = React.memo(UserDropdownComponent) as typeof UserDropdownComponent
