import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { handleSendOTP } from '@/services/auth/send-otp'
import { handleResetPassword } from '@/services/auth/reset-password'
import { ResetPasswordFormValues } from '@/services/auth/reset-password/type'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export function useForgotPassword() {
  const navigate = useNavigate()
  const { toastSuccess } = useGlobalMessage()
  const { handleSubmit, control, getValues, trigger } = useForm<ResetPasswordFormValues>()

  const { mutate: resetPassword } = useMutation({
    mutationFn: handleResetPassword,
    onSuccess(res) {
      toastSuccess(res.message ?? 'Thành công')
      navigate(MENU_URL.LOGIN)
    }
  })

  const { mutate: sendOTP, isPending: loadingSendOTP } = useMutation({
    mutationFn: handleSendOTP,
    onSuccess(res) {
      toastSuccess(res.message ?? 'Thành công')
    }
  })

  const onSubmit = handleSubmit((data) => {
    resetPassword(data)
  })

  const onSendOTP = async (email: string) => {
    const isValid = await trigger(['email'])

    if (isValid) sendOTP({ email })
  }

  return [
    { control, MENU_URL, loadingSendOTP },
    { onSubmit, onSendOTP, getValues }
  ] as const
}
