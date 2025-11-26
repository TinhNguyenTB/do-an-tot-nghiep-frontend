import axiosInstance from '@/libs/axiosInstance'
import { RePayment, RePaymentResponse } from '@/services/user/type'

export async function rePayment(requestBody: RePayment) {
  const { data } = await axiosInstance<RePaymentResponse>({
    url: '/api/users/re-payment',
    method: 'POST',
    data: requestBody
  })
  return data
}
