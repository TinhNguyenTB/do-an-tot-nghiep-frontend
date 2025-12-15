import { RegisterFormValues } from '@/services/auth/register/type'
import { useFormContext, useWatch } from 'react-hook-form'

export const useRegisterForm = () => {
  const { control } = useFormContext<RegisterFormValues>()
  const isOrganization = useWatch({ control, name: 'isOrganization' })

  return [{ control, isOrganization }, {}] as const
}
