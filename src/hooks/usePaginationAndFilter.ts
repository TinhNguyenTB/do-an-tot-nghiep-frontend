import { QueryParams } from '@/services/types'
import { useCallback, useMemo, useState } from 'react'

interface IFilterState {
  [key: string]: any // Cho phép bất kỳ trường filter nào
}

interface IPaginationState {
  page: number
  size: number
}

interface IUsePaginationAndFilterResult {
  pagination: IPaginationState
  searchFilters: IFilterState
  queryParams: QueryParams
  handlePageChange: (page: number, size: number) => void
  handleFilterSubmit: (data: IFilterState) => void
  handleFilterReset: (defaultValues: IFilterState) => void
}

const filterFalsyValues = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ''
    )
  )
}

export const usePaginationAndFilter = (
  defaultFilters: IFilterState = {},
  defaultPageSize: number = 5
): IUsePaginationAndFilterResult => {
  const [pagination, setPagination] = useState<IPaginationState>({
    page: 1,
    size: defaultPageSize
  })

  const [searchFilters, setSearchFilters] = useState<IFilterState>(defaultFilters)

  // 1. Tạo QueryParams (Sử dụng useMemo để tối ưu nếu cần)
  const queryParams: QueryParams = useMemo(() => {
    return {
      page: pagination.page,
      size: pagination.size,
      // Spread các trường đã được lọc từ searchFilters
      ...filterFalsyValues(searchFilters)
    }
  }, [pagination, searchFilters])

  // 2. Xử lý thay đổi Phân trang
  const handlePageChange = useCallback((page: number, size: number) => {
    setPagination({ page, size })
  }, [])

  // 3. Xử lý Submit Filter
  const handleFilterSubmit = useCallback((data: IFilterState) => {
    // Reset về trang 1 khi áp dụng filter mới
    setPagination((prev) => ({ ...prev, page: 1 }))
    setSearchFilters(data)
  }, [])

  // 4. Xử lý Reset Filter
  const handleFilterReset = useCallback(
    (defaultValues: IFilterState) => {
      // Reset về trang 1 và reset filter về giá trị mặc định
      setPagination({ page: 1, size: defaultPageSize })
      setSearchFilters(defaultValues)
    },
    [defaultPageSize]
  )

  return {
    pagination,
    searchFilters,
    queryParams,
    handlePageChange,
    handleFilterSubmit,
    handleFilterReset
  }
}
