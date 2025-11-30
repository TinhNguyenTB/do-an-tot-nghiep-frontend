import axiosInstance from '@/libs/axiosInstance'
import { Role } from '@/services/role/type'
import { PageResponse, QueryParams } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export const ROLES_QUERY_KEY = `/api/roles`

export const fetchRoles = async (params: QueryParams): Promise<PageResponse<Role>> => {
  const { data } = await axiosInstance<PageResponse<Role>>({
    url: ROLES_QUERY_KEY,
    method: 'GET',
    params
  })
  return data
}

export const useQueryRoles = (params: QueryParams) => {
  return useQuery<PageResponse<Role>>({
    queryKey: [ROLES_QUERY_KEY, params],
    queryFn: () => fetchRoles(params)
  })
}
