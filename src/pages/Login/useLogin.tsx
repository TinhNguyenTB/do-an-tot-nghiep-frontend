import { PATHS } from '@/constants/paths'
import { TRANSLATION } from '@/constants/translates'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { login } from '@/services/auth/login'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

type LoginFormValues = {
  email: string
  password: string
}

export function useLogin() {
  const { t } = useTranslation(TRANSLATION.AUTH)
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<LoginFormValues>()
  const { toastSuccess, toastError } = useGlobalMessage()
  const onSubmit = handleSubmit(async (data: LoginFormValues) => {
    try {
      const res = await login(data)
      if (res.data) {
        // Lưu token vào localStorage
        const token = res.data.token
        localStorage.setItem('token', token)
        toastSuccess(t('login.success'))
        navigate(PATHS.HOME)
      }
    } catch (e) {
      toastError(t('login.error'))
      console.error('Login failed:', e)
    }
  })

  return [{ control }, { onSubmit }] as const
}
