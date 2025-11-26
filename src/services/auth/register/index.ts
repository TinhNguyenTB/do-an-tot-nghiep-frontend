import axiosInstance from '@/libs/axiosInstance'
import { RegisterFormValues, RegisterResponse } from '@/services/auth/register/type'

export const register = async (body: RegisterFormValues) => {
  const { data } = await axiosInstance<RegisterResponse>({
    url: '/api/auth/register',
    data: body,
    method: 'post'
  })
  return data
}
