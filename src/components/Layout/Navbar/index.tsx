import { Layout, theme } from 'antd'
import { MENU_URL } from '@/constants/menuUrl'
import { logout } from '@/services/auth/logout'
import { useMutation } from '@tanstack/react-query'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useRbacStore } from '@/store/rbacStore'
import { UserDropdown } from '@/components/UserDropdown'

const { Header } = Layout

const Navbar = () => {
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

  const email = useRbacStore((state) => state.email)

  return (
    <Header
      style={{
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        justifyContent: 'flex-end',
        background: colorBgContainer
      }}
    >
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <UserDropdown email={email} onLogout={() => mutate()} />
      </div>
    </Header>
  )
}

export default Navbar
