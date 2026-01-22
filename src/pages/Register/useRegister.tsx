import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { register, validateEmail } from '@/services/auth/register'
import { RegisterFormValues } from '@/services/auth/register/type'
import { handleVerifyOTP } from '@/services/auth/verify-otp'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useRegister = () => {
  const { toastSuccess, toastError } = useGlobalMessage()
  const methodForm = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      organizationName: '',
      subscriptionId: undefined,
      organizationPhoneNumber: ''
    },
    mode: 'onBlur'
  })
  const { trigger, handleSubmit, getValues } = methodForm

  const { mutateAsync: validateAsync } = useMutation({
    mutationFn: validateEmail,
    onSuccess: (res) => toastSuccess(res.message ?? 'Success')
  })

  const { mutateAsync: validateOTP } = useMutation({
    mutationFn: handleVerifyOTP
  })

  const validateFields = async (): Promise<boolean> => {
    const isValid = await trigger([
      'name',
      'email',
      'password',
      'otp',
      'organizationName',
      'organizationPhoneNumber'
    ])

    if (isValid) {
      const validationResponse = await validateAsync({
        email: getValues('email')
      })

      const validationOTPResponse = await validateOTP({
        email: getValues('email'),
        otp: getValues('otp')
      })

      return validationResponse.data.isAvailable && validationOTPResponse.data.isValid
    }
    return false
  }

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toastSuccess('Đăng ký thành công. Chuyển đến trang thanh toán')
      location.href = data.data.redirectUrl
    }
  })

  const onSubmit = handleSubmit((data) => {
    if (!data.subscriptionId) {
      toastError('Vui lòng chọn gói dịch vụ')
      return
    }
    mutate(data)
  })

  return [{ methodForm }, { validateFields, onSubmit }] as const
}
