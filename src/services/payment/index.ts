import axiosInstance from '@/libs/axiosInstance'
import { PaymentHistory, TransactionHistory } from '@/services/payment/type'
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

export const fetchTransactionHistoryInfinite = async ({
  pageParam = 1
}: {
  pageParam?: number
}) => {
  const { data } = await axiosInstance<PageResponse<TransactionHistory>>({
    url: `/api/payments/transaction`,
    method: 'GET',
    params: {
      page: pageParam,
      size: 10
    }
  })

  return data
}
