import axiosInstance from '@/libs/axiosInstance'
import { PageResponse, QueryParams } from '@/services/types'
import { RePayment, RePaymentResponse, User } from '@/services/user/type'
import { useQuery } from '@tanstack/react-query'

export const USERS_QUERY_KEY = `/api/users`

export async function rePayment(requestBody: RePayment) {
  const { data } = await axiosInstance<RePaymentResponse>({
    url: '/api/users/re-payment',
    method: 'POST',
    data: requestBody
  })
  return data
}

export const fetchUsers = async (params: QueryParams) => {
  const { data } = await axiosInstance<PageResponse<User>>({
    url: USERS_QUERY_KEY,
    method: 'GET',
    params
  })
  return data
}

export const useQueryUsers = (params: QueryParams) => {
  return useQuery<PageResponse<User>>({
    queryKey: [USERS_QUERY_KEY, params],
    queryFn: () => fetchUsers(params)
  })
}
