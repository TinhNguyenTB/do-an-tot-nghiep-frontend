import { BaseResponse } from '@/services/types'

export interface LoginFormValues {
  email: string
  password: string
}

export type LoginResponse = BaseResponse<{
  userInfo: {
    id: number
    email: string
    roles: string[]
    organizationId: number | null
  }
  accessToken: string
  refreshToken: string
}>
