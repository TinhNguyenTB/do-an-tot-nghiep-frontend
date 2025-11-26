import axiosInstance from '@/libs/axiosInstance'
import { BaseResponse } from '@/services/types'

type RefreshTokenResponse = BaseResponse<{
  accessToken: string
}>

export const refreshTokenAPI = async () => {
  const { data } = await axiosInstance<RefreshTokenResponse>({
    url: `api/auth/refresh`,
    method: 'put'
  })
  return data
}
