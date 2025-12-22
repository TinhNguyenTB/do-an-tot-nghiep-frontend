import axiosInstance from '@/libs/axiosInstance'
import { ResetPasswordFormValues } from '@/services/auth/reset-password/type'
import { BaseResponse } from '@/services/types'

export const handleResetPassword = async (body: ResetPasswordFormValues) => {
  const { data } = await axiosInstance<BaseResponse<{ expiresIn: number }>>({
    url: `/api/auth/reset-password`,
    method: 'POST',
    data: body
  })
  return data
}
