import axiosInstance from '@/libs/axiosInstance'
import {
  RegisterFormValues,
  RegisterResponse,
  ValidateEmailResponse
} from '@/services/auth/register/type'
import { BaseResponse } from '@/services/types'

export const register = async (body: RegisterFormValues) => {
  const { data } = await axiosInstance<RegisterResponse>({
    url: '/api/auth/register',
    data: body,
    method: 'post'
  })
  return data
}

export const validateEmail = async (body: { email: string }) => {
  const { data } = await axiosInstance<ValidateEmailResponse>({
    url: '/api/auth/check-email',
    data: body,
    method: 'post'
  })
  return data
}

export const handleSendOTPRegister = async (body: { email: string }) => {
  const { data } = await axiosInstance<BaseResponse<{ expiresIn: number }>>({
    url: `/api/users/sendOTP`,
    method: 'POST',
    data: body
  })
  return data
}
