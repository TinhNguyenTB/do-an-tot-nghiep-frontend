import { MENU_URL } from '@/constants/menuUrl'
import { TRANSLATION } from '@/constants/translates'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { login } from '@/services/auth/login'
import { LoginFormValues } from '@/services/auth/login/type'
import { rePayment } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function useLogin() {
  const { t } = useTranslation(TRANSLATION.AUTH)
  const navigate = useNavigate()
  const { toastSuccess } = useGlobalMessage()
  const { handleSubmit, control } = useForm<LoginFormValues>()

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      // Lưu userInfo vào localStorage
      localStorage.setItem('userInfo', JSON.stringify(data.data.userInfo))
      toastSuccess(data.message ?? t('login.success'))
      navigate(MENU_URL.HOME)
    }
  })

  const { mutate: handleRePayment } = useMutation({
    mutationFn: rePayment,
    onSuccess: (data) => {
      location.href = data.data.redirectUrl
    }
  })

  const onSubmit = handleSubmit((data: LoginFormValues) => {
    mutate(data)
  })

  const onRePayment = handleSubmit((data: LoginFormValues) => {
    handleRePayment(data)
  })

  return [
    { control, MENU_URL },
    { onSubmit, onRePayment }
  ] as const
}
