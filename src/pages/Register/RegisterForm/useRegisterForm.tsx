import { handleSendOTPRegister } from '@/services/auth/register'
import { RegisterFormValues } from '@/services/auth/register/type'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const useRegisterForm = () => {
  const { control, trigger, getValues } = useFormContext<RegisterFormValues>()

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

  const { mutate: sendOTP, isPending: loadingSendOTP } = useMutation({
    mutationFn: handleSendOTPRegister,
    onSuccess(res) {
      message.success(res.message ?? 'Đã gửi OTP')
      setCountdown(res.data.expiresIn)
    }
  })

  const onSendOTP = async (email: string) => {
    const isValid = await trigger(['email'])
    if (isValid && countdown === 0) {
      sendOTP({ email })
    }
  }

  return [
    { control, loadingSendOTP, countdown },
    { onSendOTP, getValues }
  ] as const
}
