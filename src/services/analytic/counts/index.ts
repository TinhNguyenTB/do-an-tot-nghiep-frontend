import axiosInstance from '@/libs/axiosInstance'
import { SystemCounts } from '@/services/analytic/counts/type'
import { BaseResponse } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export const ANALYTIC_COUNTS_QUERY_KEY = `/api/analytics/counts`

export const fetchSystemCounts = async () => {
  const { data } = await axiosInstance<BaseResponse<SystemCounts>>({
    url: ANALYTIC_COUNTS_QUERY_KEY,
    method: 'GET'
  })
  return data
}

export const useQuerySystemCounts = () => {
  return useQuery<BaseResponse<SystemCounts>>({
    queryKey: [ANALYTIC_COUNTS_QUERY_KEY],
    queryFn: () => fetchSystemCounts()
  })
}
