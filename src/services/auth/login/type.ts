import { BaseResponse } from '@/services/types'

export interface LoginFormValues {
  email: string
  password: string
}

export interface UserInfo {
  id: number
  email: string
  name: string
  roles: string[]
  permissions: string[]
  organizationId: number | null
}

export type LoginResponse = BaseResponse<{
  userInfo: UserInfo
  accessToken: string
  refreshToken: string
}>
