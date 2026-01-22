import axiosInstance from '@/libs/axiosInstance'
import { VerifyOTPFormValues } from '@/services/auth/verify-otp/type'
import { BaseResponse } from '@/services/types'

export const handleVerifyOTP = async (body: VerifyOTPFormValues) => {
  const { data } = await axiosInstance<BaseResponse<{ isValid: boolean }>>({
    url: `/api/auth/verifyOTP`,
    method: 'POST',
    data: body
  })
  return data
}
