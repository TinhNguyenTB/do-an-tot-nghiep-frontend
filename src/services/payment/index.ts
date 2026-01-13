import axiosInstance from '@/libs/axiosInstance'
import { PaymentHistory } from '@/services/payment/type'
import { PageResponse } from '@/services/types'

export const fetchOrgPaymentHistoryInfinite = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const { data } = await axiosInstance<PageResponse<PaymentHistory>>({
    url: `/api/payments/history`,
    method: 'GET',
    params: {
      page: pageParam,
      size: 10
    }
  })

  return data
}
