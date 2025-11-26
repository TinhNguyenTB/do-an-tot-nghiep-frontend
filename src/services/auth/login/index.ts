import axiosInstance from '@/libs/axiosInstance'
import { LoginFormValues, LoginResponse } from '@/services/auth/login/type'

export const login = async (requestBody: LoginFormValues) => {
  const { data } = await axiosInstance<LoginResponse>({
    url: '/api/auth/login',
    method: 'POST',
    data: requestBody
  })
  return data
}
