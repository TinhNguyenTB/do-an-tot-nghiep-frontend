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
