import { BaseResponse } from '@/services/types'

export interface LoginFormValues {
  email: string
  password: string
}

export type LoginResponse = BaseResponse<{
  authenticated: boolean
  avatarUrl: string | null
  email: string
  name: string
  token: string
}>
