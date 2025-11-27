import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { usePaginationAndFilter } from '@/hooks/usePaginationAndFilter'
import axiosInstance from '@/libs/axiosInstance'
import { SUBSCRIPTIONS_QUERY_KEY, useQuerySubscriptions } from '@/services/subscription'
import { Subscription } from '@/services/subscription/type'
import { PaginationMeta } from '@/services/types'
import { formatVND } from '@/utils/formatVND'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Popconfirm, TableProps } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'

const defaultFilters = {
  name: ''
}

// Định nghĩa kiểu dữ liệu cho form tìm kiếm
interface ISubscriptionFilters {
  name: string
}

export const useSubscription = () => {
  const queryClient = useQueryClient()
  const { toastSuccess, toastError } = useGlobalMessage()
  // --- SỬ DỤNG CUSTOM HOOK ---
  const { queryParams, handlePageChange, handleFilterSubmit, handleFilterReset } =
    usePaginationAndFilter(defaultFilters, 5) // Khai báo kích thước mặc định là 5

  const { data, isLoading } = useQuerySubscriptions(queryParams)

  const { control, handleSubmit, reset } = useForm<ISubscriptionFilters>({
    defaultValues: defaultFilters
  })

  const onSubmit: SubmitHandler<ISubscriptionFilters> = (data) => {
    handleFilterSubmit(data)
  }

  // Hàm xử lý Reset
  const handleReset = () => {
    reset(defaultFilters) // Reset form inputs về giá trị mặc định
    handleFilterReset(defaultFilters) // Reset trạng thái lọc và phân trang trong hook
  }

  // Xử lý Phân trang
  const handleTableChange = (page: number, pageSize: number) => {
    handlePageChange(page, pageSize)
  }

  // Cấu hình Bảng Ant Design
  const meta: PaginationMeta = data?.data?.meta || {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  }

  const columns: TableProps<Subscription>['columns'] = [
    {
      title: 'STT',
      render: (value, record, index) => {
        return (meta.currentPage - 1) * meta.itemsPerPage + index + 1
      }
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      // Sắp xếp theo thứ tự bảng chữ cái (A-Z)
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value: string) => formatVND(value)
    },
    { title: 'Số ngày sử dụng', dataIndex: 'duration' },
    { title: 'Giới hạn người dùng', dataIndex: 'userLimit' },
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <Popconfirm
            title='Xác nhận xóa'
            description={`Bạn có chắc muốn xóa gói dịch vụ: ${record.name}?`}
            onConfirm={() => confirmDelete(record)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger loading={deleteSubscriptionMutation.isPending}>
              Delete
            </Button>
          </Popconfirm>
        )
      }
    }
  ]

  const deleteSubscriptionMutation = useMutation({
    mutationFn: async (subscriptionId: string) => {
      await axiosInstance.delete(`${SUBSCRIPTIONS_QUERY_KEY}/${subscriptionId}`)
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY] })
      toastSuccess('Xóa gói dịch vụ thành công')
    },
    onError: (err: any) => {
      toastError('Có lỗi xảy ra khi xóa')
    }
  })

  const confirmDelete = (subscription: Subscription) => {
    deleteSubscriptionMutation.mutate(subscription.id.toString())
  }

  return [
    { meta, listSubscriptions: data?.data?.content || [], isLoading, columns, control },
    { handleReset, handleSubmit, handleTableChange, onSubmit }
  ] as const
}
