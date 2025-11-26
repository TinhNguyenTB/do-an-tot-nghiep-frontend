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
