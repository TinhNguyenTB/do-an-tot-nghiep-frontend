import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MENU_URL } from '@/constants/menuUrl'
import { logout } from '@/services/auth/logout'
import { useMutation } from '@tanstack/react-query'
import { Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const { t } = useTranslation('home')
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess(data) {
      localStorage.removeItem('userInfo')
      message.success(data.message)
      navigate(MENU_URL.LOGIN)
    }
  })

  return (
    <main>
      <LanguageSwitcher /> <h1>{t('welcome')}</h1>
      <Button type='primary' loading={isPending} onClick={() => mutate()}>
        logout
      </Button>
    </main>
  )
}
