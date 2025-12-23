import axiosInstance from '@/libs/axiosInstance'
import { Permission } from '@/services/permission/type'
import { BaseResponse, PageResponse, QueryParams } from '@/services/types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const PERMISSIONS_QUERY_KEY = `/api/permissions`

export const fetchPermissions = async (params: QueryParams) => {
  const { data } = await axiosInstance<PageResponse<Permission>>({
    url: PERMISSIONS_QUERY_KEY,
    method: 'GET',
    params
  })
  return data
}

export const fetchPermissionInfinite = async ({
  pageParam = 1,
  queryKey
}: {
  pageParam?: number
  queryKey: (string | { search: string })[]
}) => {
  const [, { search }] = queryKey as [string, { search: string }]

  const { data } = await axiosInstance<PageResponse<Permission>>({
    url: PERMISSIONS_QUERY_KEY,
    method: 'GET',
    params: {
      page: pageParam,
      size: 10,
      search
    }
  })

  return data
}
