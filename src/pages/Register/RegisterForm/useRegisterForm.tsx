import { RegisterFormValues } from '@/pages/Register/useRegister'
import { useFormContext } from 'react-hook-form'

export const useRegisterForm = () => {
  const { control, trigger } = useFormContext<RegisterFormValues>()

  return [{ control }, {}] as const
}
