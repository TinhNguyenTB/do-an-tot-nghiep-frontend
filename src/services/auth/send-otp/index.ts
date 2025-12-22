import axiosInstance from '@/libs/axiosInstance'
import { ForgotPasswordFormValues } from '@/services/auth/send-otp/type'
import { BaseResponse } from '@/services/types'

export const handleSendOTP = async (body: ForgotPasswordFormValues) => {
  const { data } = await axiosInstance<BaseResponse<{ expiresIn: number }>>({
    url: `/api/auth/forgot-password`,
    method: 'POST',
    data: body
  })
  return data
}
