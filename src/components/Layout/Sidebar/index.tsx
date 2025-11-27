import { Layout, Menu } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { TeamOutlined, OrderedListOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { usePermission } from '@/hooks/usePermission'
import { UserInfo } from '@/services/auth/login/type'
import { permissions } from '@/constants/rbac'
import { MENU_URL } from '@/constants/menuUrl'

const { Sider } = Layout

interface AppMenuItem {
  label: string
  key: string
  icon?: ReactNode
  permission?: string // permission cần có để hiển thị item
  children?: AppMenuItem[] // menu con
}

function filterMenuByPermission(
  items: AppMenuItem[],
  hasPermission: (p: string) => boolean
): AppMenuItem[] {
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

const menuItems: AppMenuItem[] = [
  {
    label: 'Tổ chức',
    key: MENU_URL.ORGANIZATIONS,
    icon: <TeamOutlined />,
    permission: permissions.MANAGE_ALL_ORGANIZATIONS
  },
  {
    label: 'Người dùng',
    key: MENU_URL.USERS,
    icon: <UserOutlined />,
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
    label: 'Gói dịch vụ',
    key: MENU_URL.SUBSCRIPTIONS,
    icon: <OrderedListOutlined />,
    permission: permissions.MANAGE_ALL_SUBSCRIPTIONS
  }
]

const Sidebar = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname)

  const user: UserInfo = JSON.parse(localStorage.getItem('userInfo')!)
  const { hasPermission } = usePermission(user.roles)
  const filteredItems = filterMenuByPermission(menuItems, hasPermission)

  // update selectedKey when URL change
  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname])

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key)
  }

  return (
    <Sider
      theme='light'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        onClick={handleMenuClick}
        theme='light'
        selectedKeys={[selectedKey]}
        mode='inline'
        items={filteredItems}
      />
    </Sider>
  )
}

export default Sidebar
