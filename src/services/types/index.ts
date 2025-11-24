export interface QueryParams {
  page?: number
  size?: number
  sort?: string
  [key: string]: any
}

export interface BaseResponse<T> {
  code: number
  message?: string
  data: T
}

export interface PaginationMeta {
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PageResponse<T> {
  code?: number
  message?: string
  data: {
    content: T[]
    meta: PaginationMeta
  }
}
