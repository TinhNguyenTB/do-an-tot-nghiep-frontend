import axiosInstance from '@/libs/axiosInstance'
import { Role, RoleFormValues } from '@/services/role/type'
import { BaseResponse, PageResponse, QueryParams } from '@/services/types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const ROLES_QUERY_KEY = `/api/roles`

export const fetchRoles = async (params: QueryParams) => {
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

export const createRole = async (body: RoleFormValues) => {
  const { data } = await axiosInstance<BaseResponse<RoleFormValues>>({
    url: ROLES_QUERY_KEY,
    method: 'POST',
    data: body
  })
  return data
}

export const fetchRoleByName = async (name: string) => {
  const { data } = await axiosInstance<BaseResponse<RoleFormValues>>({
    url: `${ROLES_QUERY_KEY}/${name}`,
    method: 'GET'
  })
  return data
}

type RoleQueryOptions = Omit<
  UseQueryOptions<BaseResponse<RoleFormValues>, Error>,
  'queryKey' | 'queryFn'
>

export const useQueryRoleByName = (name: string, options?: RoleQueryOptions) => {
  return useQuery<BaseResponse<RoleFormValues>>({
    queryKey: [ROLES_QUERY_KEY, name],
    queryFn: () => fetchRoleByName(name),
    ...options
  })
}

export const updateRole = async (body: RoleFormValues & { name: string }) => {
  const { name, ...requestBody } = body
  const { data } = await axiosInstance<BaseResponse<RoleFormValues>>({
    url: `${ROLES_QUERY_KEY}/${body.name}`,
    method: 'PATCH',
    data: requestBody
  })
  return data
}
