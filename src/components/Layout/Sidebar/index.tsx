import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import {
  PlayCircleOutlined,
  UnorderedListOutlined,
  RiseOutlined,
  TeamOutlined,
  OrderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const { Sider } = Layout

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Tổ chức', '/organizations', <TeamOutlined />),
  getItem('Người dùng', '/users', <UserOutlined />),
  getItem('Gói dịch vụ', '/subscriptions', <OrderedListOutlined />)
  // getItem('Team', 'sub2', <TeamOutlined />, [
  //     getItem('Team 1', '6'),
  //     getItem('Team 2', '8')
  // ]),
  // getItem('Categories', '/categories', <UnorderedListOutlined />),

  // getItem('Levels', '/levels', <RiseOutlined />)
]

const Sidebar = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname)

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
        items={items}
      />
    </Sider>
  )
}

export default Sidebar
