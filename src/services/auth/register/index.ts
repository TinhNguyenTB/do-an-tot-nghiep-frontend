import axiosInstance from '@/libs/axiosInstance'

export const register = async (body: any) => {
  const { data } = await axiosInstance.post('/api/auth/register', body)
  return data
}
