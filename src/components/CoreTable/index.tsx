import { Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'
import { useMemo } from 'react'

interface Props<T extends { id: number }> {
  columns: ColumnsType<T>
  data: T[]
  totalElements: number
  currentPage: number
  pageSize: number
  loading: boolean

  onPaginationChange: (pagination: TablePaginationConfig) => void
  onSortChange: (field: string | string[] | null, order: 'ascend' | 'descend' | null) => void

  filters?: Record<string, any>
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  paginationPosition?:
    | 'bottomCenter'
    | 'bottomLeft'
    | 'bottomRight'
    | 'none'
    | 'topCenter'
    | 'topLeft'
    | 'topRight'
  showTotal?: (total: number, range: [number, number]) => string
}

export function DataTableRenderOnly<T extends { id: number }>({
  columns,
  data,
  totalElements,
  currentPage,
  pageSize,
  loading,
  onPaginationChange,
  onSortChange,
  filters = {},
  showSizeChanger = false,
  showQuickJumper = false,
  paginationPosition = 'bottomCenter',
  showTotal
}: Props<T>) {
  /**
   * Xử lý sự kiện thay đổi bảng (phân trang, sắp xếp, lọc)
   */
  const handleTableChange = (
    newPagination: TablePaginationConfig,
    _: any, // Bỏ qua tham số lọc của Ant Design vì chúng ta quản lý nó qua React Hook Form/filters
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    // 1. Thông báo cho component cha về thay đổi phân trang
    // Component cha sẽ gọi lại API với page và pageSize mới
    onPaginationChange(newPagination)

    // 2. Thông báo cho component cha về thay đổi sắp xếp
    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter

    if (currentSorter?.field && currentSorter?.order) {
      // Gửi field và order lên component cha
      onSortChange(String(currentSorter.field), currentSorter.order)
    } else {
      onSortChange(null, null)
    }
  }

  const mergedColumns = useMemo(() => {
    return [
      ...columns.map((col) => {
        // Áp dụng filteredValue cho các cột có dataIndex là string
        // Điều này cho phép Ant Design highlight filter icon nếu có giá trị trong `filters`
        if ('dataIndex' in col && typeof col.dataIndex === 'string') {
          return {
            ...col,
            filteredValue: filters[col.dataIndex] || null
          }
        }
        return col
      })
    ]
  }, [columns, filters])

  return (
    <Table
      scroll={{ x: 'max-content' }}
      rowKey='id'
      columns={mergedColumns}
      dataSource={data || []}
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalElements,

        showSizeChanger: showSizeChanger,
        showQuickJumper: showQuickJumper,
        pageSizeOptions: ['5', '10', '20', '50'],
        position: [paginationPosition],
        showTotal
      }}
      onChange={handleTableChange}
    />
  )
}
