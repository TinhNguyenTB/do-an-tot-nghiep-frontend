import axiosInstance from '@/libs/axiosInstance'
import { Revenue } from '@/services/analytic/revenue/type'
import { BaseResponse, QueryParams } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export const ANALYTIC_REVENUE_QUERY_KEY = `/api/analytics/revenue`

export const fetchRevenueByYear = async (params: QueryParams) => {
  const { data } = await axiosInstance<BaseResponse<Revenue[]>>({
    url: ANALYTIC_REVENUE_QUERY_KEY,
    method: 'GET',
    params
  })
  return data
}

export const useQueryRevenue = (params: QueryParams) => {
  return useQuery<BaseResponse<Revenue[]>>({
    queryKey: [ANALYTIC_REVENUE_QUERY_KEY, params],
    queryFn: () => fetchRevenueByYear(params)
  })
}
