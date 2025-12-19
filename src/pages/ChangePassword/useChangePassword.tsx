import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { logout } from '@/services/auth/logout'
import { handleChangePassword } from '@/services/auth/change-password'
import { ChangePasswordFormValues } from '@/services/auth/change-password/type'
import { useRbacStore } from '@/store/rbacStore'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const useChangePassword = () => {
  const { toastSuccess } = useGlobalMessage()
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<ChangePasswordFormValues>()

  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSuccess() {
      useRbacStore.getState().logout()
      navigate(MENU_URL.LOGIN)
    }
  })

  const { mutate } = useMutation({
    mutationFn: handleChangePassword,
    onSuccess(data) {
      handleLogout()
      toastSuccess(data.message ?? 'Thành công')
    }
  })

  const onSubmit = handleSubmit((data: ChangePasswordFormValues) => {
    mutate(data)
  })

  return [{ control }, { handleSubmit, onSubmit }] as const
}
