import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { register, validateEmail } from '@/services/auth/register'
import { RegisterFormValues } from '@/services/auth/register/type'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useRegister = () => {
  const { toastSuccess } = useGlobalMessage()
  const methodForm = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      isOrganization: false,
      organizationName: '',
      subscriptionId: undefined
    },
    mode: 'onBlur'
  })
  const { trigger, handleSubmit, getValues } = methodForm

  const { mutateAsync: validateAsync } = useMutation({
    mutationFn: validateEmail,
    onSuccess: (res) => toastSuccess(res.message ?? 'Success')
  })

  const validateFields = async (): Promise<boolean> => {
    const isValid = await trigger(['name', 'email', 'password'])

    if (isValid) {
      const validationResponse = await validateAsync({
        email: getValues('email')
      })

      return validationResponse.data.isAvailable
    }
    return false
  }

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toastSuccess('Đăng ký thành công')
      location.href = data.data.redirectUrl
    }
  })

  const onSubmit = handleSubmit((data) => {
    const { isOrganization, ...rest } = data
    mutate(rest)
  })

  return [{ methodForm }, { validateFields, onSubmit }] as const
}
