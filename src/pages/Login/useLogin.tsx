import { MENU_URL } from '@/constants/menuUrl'
import { TRANSLATION } from '@/constants/translates'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { login } from '@/services/auth/login'
import { LoginFormValues, LoginResponse } from '@/services/auth/login/type'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function useLogin() {
  const { t } = useTranslation(TRANSLATION.AUTH)
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<LoginFormValues>()
  const { toastSuccess, toastError } = useGlobalMessage()

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess(data: LoginResponse) {
      toastSuccess(data.message ?? t('login.success'))
      navigate(MENU_URL.HOME)
    },
    onError(error: any) {
      toastError(t('login.error'))
    }
  })

  const onSubmit = handleSubmit(async (data: LoginFormValues) => {
    mutate(data)
  })

  return [{ control }, { onSubmit }] as const
}
