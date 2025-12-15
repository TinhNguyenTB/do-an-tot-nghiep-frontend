import { BaseResponse } from '@/services/types'

export interface RegisterFormValues {
  email: string
  password: string
  name: string
  isOrganization?: boolean
  organizationName?: string
  subscriptionId: number
}

export type RegisterResponse = BaseResponse<{
  userId: number
  paymentId: number
  redirectUrl: string
}>
