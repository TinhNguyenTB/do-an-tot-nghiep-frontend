import axiosInstance from '@/libs/axiosInstance'
import { BaseResponse, PageResponse, QueryParams } from '@/services/types'
import { RePayment, RePaymentResponse, User, UserFormValues } from '@/services/user/type'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

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

export const fetchUserById = async (id: string) => {
  const { data } = await axiosInstance<BaseResponse<User>>({
    url: `${USERS_QUERY_KEY}/${id}`,
    method: 'GET'
  })
  return data
}

type UserQueryOptions = Omit<UseQueryOptions<BaseResponse<User>, Error>, 'queryKey' | 'queryFn'>

export const useQueryUserById = (id: string, options?: UserQueryOptions) => {
  return useQuery<BaseResponse<User>>({
    queryKey: [USERS_QUERY_KEY, id],
    queryFn: () => fetchUserById(id),
    ...options
  })
}

export const createUser = async (body: UserFormValues) => {
  const { data } = await axiosInstance<BaseResponse<UserFormValues>>({
    url: USERS_QUERY_KEY,
    method: 'POST',
    data: body
  })
  return data
}

export const updateUser = async (body: UserFormValues & { id: string }) => {
  const { id, ...requestBody } = body
  const { data } = await axiosInstance<BaseResponse<User>>({
    url: `${USERS_QUERY_KEY}/${body.id}`,
    method: 'PATCH',
    data: requestBody
  })
  return data
}
