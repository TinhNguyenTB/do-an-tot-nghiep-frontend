import { useState, useEffect, useMemo, useCallback } from 'react'
import { Table, Input, Form, Space, Button, TableProps } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { SearchOutlined, ClearOutlined } from '@ant-design/icons'
import { useDebounce } from '@/hooks/useDebounce'
import { QueryParams, PageResponse } from '@/services/types'
import {
  ColumnType,
  FilterValue,
  SorterResult,
  TablePaginationConfig
} from 'antd/es/table/interface'

export interface CustomColumnType<T> extends ColumnType<T> {
  searchable?: boolean
}

export interface DataTableProps<T> extends TableProps<T> {
  columns: CustomColumnType<T>[]
  initialQueryParams?: QueryParams
  rowKey?: keyof T
  showResetAll?: boolean
  pagination?: TablePaginationConfig
  externalData: PageResponse<T>
  isLoading?: boolean
  onQueryParamsChange?: (params: QueryParams) => void
}

const DataTable = <T extends object>({
  columns: initialColumns,
  initialQueryParams = { page: 1, size: 10 },
  rowKey = 'id' as keyof T,
  showResetAll = false,
  pagination,
  externalData,
  isLoading = false,
  onQueryParamsChange,
  ...tableProps
}: DataTableProps<T>) => {
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQueryParams)

  const { page, size, sort, ...filters } = queryParams

  const { control, reset, watch } = useForm<Record<string, string | undefined>>({
    defaultValues: filters as Record<string, string | undefined>
  })

  const watchedFilters = watch()
  const debouncedFilters = useDebounce(watchedFilters, 500)

  useEffect(() => {
    const newQueryParams = {
      ...queryParams,
      ...debouncedFilters,
      page: 1
    }
    setQueryParams(newQueryParams)
    onQueryParamsChange?.(newQueryParams) // Gọi callback khi queryParams thay đổi
  }, [debouncedFilters, onQueryParamsChange])

  const handleTableChange = (
    pagination: { current?: number; pageSize?: number },
    _tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    let newSort: string | undefined = undefined
    if (!Array.isArray(sorter) && sorter.field && sorter.order) {
      if (typeof sorter.field === 'string') {
        newSort = `${sorter.field},${sorter.order === 'ascend' ? 'asc' : 'desc'}`
      } else if (Array.isArray(sorter.field)) {
        newSort = `${String(sorter.field.slice(-1)[0])},${sorter.order === 'ascend' ? 'asc' : 'desc'}`
      }
    }

    const newQueryParams = {
      ...queryParams,
      page: pagination.current || 1,
      size: pagination.pageSize || 10,
      sort: newSort
    }

    setQueryParams(newQueryParams)
    onQueryParamsChange?.(newQueryParams) // Gọi callback khi queryParams thay đổi
  }

  const handleResetFilters = useCallback(() => {
    reset({})
    setQueryParams(initialQueryParams)
    onQueryParamsChange?.(initialQueryParams) // Gọi callback khi reset
  }, [reset, initialQueryParams, onQueryParamsChange])

  const getColumnSearchProps = useCallback(
    (dataIndex: ColumnType<T>['dataIndex']): ColumnType<T> => {
      const dataIndexString = Array.isArray(dataIndex) ? dataIndex.join('.') : String(dataIndex)

      return {
        filterDropdown: ({ setSelectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Form>
              <Controller
                name={dataIndexString}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={`Search ${dataIndexString}`}
                    style={{ marginBottom: 8, display: 'block' }}
                  />
                )}
              />
            </Form>
            <Space>
              <Button
                onClick={() => {
                  setSelectedKeys([])
                  reset({ ...watch(), [dataIndexString]: undefined })
                }}
                size='small'
                style={{ width: 90 }}
                icon={<ClearOutlined />}
              >
                Clear
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: () => true
      }
    },
    [control, reset, watch]
  )

  const columns = useMemo(() => {
    return initialColumns.map((col) => {
      if (col.searchable && col.dataIndex !== undefined && typeof col.dataIndex !== 'symbol') {
        return {
          ...col,
          ...getColumnSearchProps(col.dataIndex)
        }
      }
      return col
    })
  }, [initialColumns, getColumnSearchProps])

  const tableDataSource = externalData?.data.content || []
  const totalElements = externalData?.data.meta.totalItems || 0
  const currentPage = externalData?.data.meta.currentPage || 1

  return (
    <>
      {showResetAll && (
        <Button onClick={handleResetFilters} style={{ marginBottom: 16 }}>
          Reset
        </Button>
      )}
      <Table<T>
        columns={columns}
        dataSource={tableDataSource}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: size,
          total: totalElements,
          showSizeChanger: totalElements > 10,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total, range) => `${range[0]}-${range[1]}  of ${total} items`,
          position: ['bottomCenter']
        }}
        onChange={handleTableChange}
        rowKey={rowKey as string}
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
    </>
  )
}

export default DataTable
