import { BaseResponse } from '@/services/types'

export interface LoginFormValues {
  email: string
  password: string
}

export interface UserInfo {
  id: number
  email: string
  roles: string[]
  organizationId: number | null
}

export type LoginResponse = BaseResponse<{
  userInfo: UserInfo
  accessToken: string
  refreshToken: string
}>
