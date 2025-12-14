import { Drawer, Layout, Menu } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import {
  TeamOutlined,
  OrderedListOutlined,
  ApartmentOutlined,
  ContactsOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { usePermission } from '@/hooks/usePermission'
import { permissions } from '@/constants/rbac'
import { MENU_URL } from '@/constants/menuUrl'
import { useTranslation } from 'react-i18next'
import { TRANSLATION } from '@/constants/translates'
import logoUrl from '@/assets/logo.png'
import { useRbacStore } from '@/store/rbacStore'

const { Sider } = Layout

interface SidebarProps {
  isMobile: boolean
  isSidebarOpen?: boolean
  onClose?: () => void
}

interface AppMenuItem {
  label: string
  key: string
  icon?: ReactNode
  permission?: string // permission cần có để hiển thị item
  children?: AppMenuItem[] // menu con
}

function filterMenuByPermission(
  items: AppMenuItem[],
  hasPermission: (p: string) => boolean,
  isSuperAdmin?: boolean
): AppMenuItem[] {
  if (isSuperAdmin) {
    return items
  }
  return items
    .map((item) => {
      // Nếu có children → lọc children trước
      const filteredChildren = item.children
        ? filterMenuByPermission(item.children, hasPermission)
        : undefined

      const isVisible = !item.permission || hasPermission(item.permission)

      if (!isVisible && (!filteredChildren || filteredChildren.length === 0)) {
        return null
      }

      return {
        ...item,
        children: filteredChildren
      }
    })
    .filter(Boolean) as AppMenuItem[]
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isSidebarOpen, onClose }) => {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname)

  const userPermissions = useRbacStore.getState().getPermissions()
  const roles = useRbacStore((state) => state.roles)
  const { hasPermission, isSuperAdmin } = usePermission(roles, userPermissions)

  const menuItems: AppMenuItem[] = [
    {
      label: t('menu.organizations'),
      key: MENU_URL.ORGANIZATIONS,
      icon: <TeamOutlined />,
      permission: permissions.MANAGE_ALL_ORGANIZATIONS
    },
    {
      label: t('menu.users'),
      key: MENU_URL.USERS,
      icon: <ContactsOutlined />,
      permission: permissions.MANAGE_ALL_USERS
      // children: [
      //   {
      //     label: 'Nhóm 1',
      //     key: '/users/group1',
      //     permission: 'view_group1',
      //   },
      //   {
      //     label: 'Nhóm 2',
      //     key: '/users/group2',
      //     permission: 'view_group2',
      //   },
      // ],
    },
    {
      label: t('menu.subscriptions'),
      key: MENU_URL.SUBSCRIPTIONS,
      icon: <OrderedListOutlined />,
      permission: permissions.MANAGE_ALL_SUBSCRIPTIONS
    },
    {
      label: t('menu.roles'),
      key: MENU_URL.ROLES,
      icon: <ApartmentOutlined />,
      permission: permissions.MANAGE_ALL_ROLES
    }
  ]

  const filteredItems = filterMenuByPermission(menuItems, hasPermission, isSuperAdmin)

  // update selectedKey when URL change
  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname])

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key)
    if (isMobile && onClose) {
      onClose() // Đóng drawer sau khi click trên mobile
    }
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      theme='light'
      selectedKeys={[selectedKey]}
      mode='inline'
      items={filteredItems}
    />
  )

  if (isMobile) {
    // RENDER MOBILE SIDEBAR (Drawer)
    return (
      <Drawer
        placement='left'
        closable={false} // Thường không cần nút close vì click menu là đóng
        onClose={onClose}
        open={isSidebarOpen}
        width={220}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            paddingLeft: 16
          }}
        >
          <img src={logoUrl} alt='logo' style={{ height: 40, width: 40, objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, fontSize: 17 }}>Dashboard</span>
        </div>
        {menu}
      </Drawer>
    )
  }

  // RENDER DESKTOP SIDEBAR (Sider)
  return (
    <Sider
      theme='light'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {/* Logo/Tiêu đề App trên Desktop */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          paddingLeft: collapsed ? 0 : 16,
          transition: 'all 0.3s'
        }}
      >
        <img src={logoUrl} alt='logo' style={{ height: 40, width: 40, objectFit: 'contain' }} />
        {!collapsed && (
          <span style={{ marginLeft: 12, fontWeight: 700, fontSize: 16 }}>Dashboard</span>
        )}
      </div>
      {menu}
    </Sider>
  )
}

export default Sidebar
