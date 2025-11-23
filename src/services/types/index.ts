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

export interface PageResponse<T> {
  code?: number
  message?: string
  data: {
    content: T[]
    empty?: boolean
    first?: boolean
    last?: boolean
    number: number
    numberOfElements?: number
    pageable?: Pageable
    size?: number
    sort?: Sort
    totalElements: number
    totalPages?: number
  }
}

export interface Pageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
