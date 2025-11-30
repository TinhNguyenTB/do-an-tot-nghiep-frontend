import { BaseResponse } from '@/services/types'

export interface RePayment {
  email: string
  password: string
}

export type RePaymentResponse = BaseResponse<{
  userId: number
  paymentId: number
  redirectUrl: string
}>

export interface User {
  id: number
  name: string
  email: string
  status: string
  organizationId: number | null
  organizationName: string | null
  createdAt: string
  roles: string[]
}

export interface UserFormValues {
  name: string
  email: string
  organizationId: number | null
  roles: string[]
}
