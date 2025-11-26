import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { register } from '@/services/auth/register'
import { RegisterFormValues } from '@/services/auth/register/type'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form'

export const useRegister = () => {
  const { toastSuccess, toastError } = useGlobalMessage()
  const methodForm = useForm<RegisterFormValues>({ mode: 'onBlur' })
  const { trigger, handleSubmit } = methodForm

  const validateFields = async (): Promise<boolean> => {
    // Kích hoạt validation cho các trường cần thiết
    const isValid = await trigger(['name', 'email', 'password'])

    if (isValid) return true
    return false
  }

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toastSuccess('Đăng ký thành công')
      location.href = data.data.redirectUrl
    },
    onError: (err: any) => {
      toastError('Có lỗi xảy ra')
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return [{ methodForm }, { validateFields, onSubmit }] as const
}
