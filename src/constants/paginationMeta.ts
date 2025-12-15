import { PaginationMeta } from '@/services/types'

export const defaultPaginationMeta: PaginationMeta = {
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false
}
