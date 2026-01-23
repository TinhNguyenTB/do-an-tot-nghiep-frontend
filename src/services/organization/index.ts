import axiosInstance from '@/libs/axiosInstance'
import { Organization } from '@/services/organization/type'
import { PageResponse, QueryParams } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export const ORGANIZATIONS_QUERY_KEY = `/api/organizations`

export const fetOrganizations = async (params: QueryParams) => {
  const { data } = await axiosInstance<PageResponse<Organization>>({
    url: ORGANIZATIONS_QUERY_KEY,
    method: 'GET',
    params
  })
  return data
}

export const useQueryOrganizations = (params: QueryParams) => {
  return useQuery<PageResponse<Organization>>({
    queryKey: [ORGANIZATIONS_QUERY_KEY, params],
    queryFn: () => fetOrganizations(params)
  })
}

export const UpdateOrganizationStatus = async (body: { id: number; isActive: boolean }) => {
  const { data } = await axiosInstance<PageResponse<{ isActive: boolean }>>({
    url: `${ORGANIZATIONS_QUERY_KEY}/status`,
    method: 'POST',
    data: body
  })
  return data
}
