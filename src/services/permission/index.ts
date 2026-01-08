import axiosInstance from '@/libs/axiosInstance'
import { Permission, PermissionFormValues } from '@/services/permission/type'
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

export const useQueryPermissions = (params: QueryParams) => {
  return useQuery<PageResponse<Permission>>({
    queryKey: [PERMISSIONS_QUERY_KEY, params],
    queryFn: () => fetchPermissions(params)
  })
}

export const createPermission = async (body: PermissionFormValues) => {
  const { data } = await axiosInstance<BaseResponse<Permission>>({
    url: PERMISSIONS_QUERY_KEY,
    method: 'POST',
    data: body
  })
  return data
}

export const fetchPermissionById = async (id: number) => {
  const { data } = await axiosInstance<BaseResponse<Permission>>({
    url: `${PERMISSIONS_QUERY_KEY}/${id}`,
    method: 'GET'
  })
  return data
}

export const updatePermission = async (body: PermissionFormValues & { id: string }) => {
  const { id, ...requestBody } = body
  const { data } = await axiosInstance<BaseResponse<Permission>>({
    url: `${PERMISSIONS_QUERY_KEY}/${body.id}`,
    method: 'PATCH',
    data: requestBody
  })
  return data
}

type PermissionQueryOptions = Omit<
  UseQueryOptions<BaseResponse<Permission>, Error>,
  'queryKey' | 'queryFn'
>

export const useQueryPermissionById = (id: string, options?: PermissionQueryOptions) => {
  return useQuery<BaseResponse<Permission>>({
    queryKey: [PERMISSIONS_QUERY_KEY, id],
    queryFn: () => fetchPermissionById(+id),
    ...options
  })
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
