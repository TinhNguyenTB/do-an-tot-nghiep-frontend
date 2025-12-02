import { Avatar, Layout, theme, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { MENU_URL } from '@/constants/menuUrl'
import { logout } from '@/services/auth/logout'
import { useMutation } from '@tanstack/react-query'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { useNavigate } from 'react-router-dom'
import { UserInfo } from '@/services/auth/login/type'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useTranslation } from 'react-i18next'

const { Header } = Layout

const Navbar = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { toastSuccess } = useGlobalMessage()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess(data) {
      localStorage.removeItem('userInfo')
      toastSuccess(data.message)
      navigate(MENU_URL.LOGIN)
    }
  })

  const user: UserInfo = JSON.parse(localStorage.getItem('userInfo')!)
  const userNameInitial = user.name.slice(0, 1).toUpperCase()

  return (
    <Header
      style={{
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        justifyContent: 'space-between',
        background: colorBgContainer
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <Avatar
          size={{ sm: 15, md: 30, lg: 40, xl: 50 }}
          style={{ backgroundColor: '#f56a00', fontWeight: 'bold' }}
        >
          {userNameInitial}
        </Avatar>
        <h1>{user.name}</h1>
      </div>
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <Tooltip title={t('btn.logout')}>
          <LogoutOutlined
            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => mutate()}
          />
        </Tooltip>
      </div>
    </Header>
  )
}

export default Navbar
