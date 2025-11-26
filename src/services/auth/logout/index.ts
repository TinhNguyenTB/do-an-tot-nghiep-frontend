import axiosInstance from '@/libs/axiosInstance'

type LogoutResponse = {
  statusCode: number
  message: string
}

export const logout = async () => {
  const { data } = await axiosInstance<LogoutResponse>({
    url: `api/auth/logout`,
    method: 'delete'
  })
  return data
}
