import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { handleSendOTP } from '@/services/auth/send-otp'
import { handleResetPassword } from '@/services/auth/reset-password'
import { ResetPasswordFormValues } from '@/services/auth/reset-password/type'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

export function useForgotPassword() {
  const navigate = useNavigate()
  const { toastSuccess } = useGlobalMessage()
  const { handleSubmit, control, getValues, trigger } = useForm<ResetPasswordFormValues>()

  // ⏱️ countdown (giây)
  const [countdown, setCountdown] = useState(0)

  // ⏱️ interval giảm mỗi giây
  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

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
      toastSuccess(res.message ?? 'Đã gửi OTP')
      setCountdown(res.data.expiresIn)
    }
  })

  const onSubmit = handleSubmit((data) => {
    resetPassword(data)
  })

  const onSendOTP = async (email: string) => {
    const isValid = await trigger(['email'])
    if (isValid && countdown === 0) {
      sendOTP({ email })
    }
  }

  return [
    { control, MENU_URL, loadingSendOTP, countdown },
    { onSubmit, onSendOTP, getValues }
  ] as const
}
