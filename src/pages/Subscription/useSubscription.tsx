import { usePaginationAndFilter } from '@/hooks/usePaginationAndFilter'
import { useQuerySubscriptions } from '@/services/subscription'
import { Subscription } from '@/services/subscription/type'
import { PaginationMeta } from '@/services/types'
import { formatVND } from '@/utils/formatVND'
import { useQueryClient } from '@tanstack/react-query'
import { TableProps } from 'antd'
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

  // --- SỬ DỤNG CUSTOM HOOK ---
  const { pagination, queryParams, handlePageChange, handleFilterSubmit, handleFilterReset } =
    usePaginationAndFilter(defaultFilters, 5) // Khai báo kích thước mặc định là 5

  const { data, isLoading, error } = useQuerySubscriptions(queryParams)

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
      title: 'Name',
      dataIndex: 'name',
      // Sắp xếp theo thứ tự bảng chữ cái (A-Z)
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (value: string) => formatVND(value)
    },
    { title: 'Duration (Days)', dataIndex: 'duration' }
    // {
    //   title: 'Actions',
    //   render: (_, record) => {
    //     return (
    //       <Popconfirm
    //         title='Delete the Subscription'
    //         description={`Are you sure to delete plan: ${record.name}?`}
    //         onConfirm={() => confirmDelete(record)}
    //         okText='Yes'
    //         cancelText='No'
    //       >
    //         <Button danger loading={deleteSubscriptionMutation.isPending}>
    //           Delete
    //         </Button>
    //       </Popconfirm>
    //     )
    //   }
    // }
  ]

  // --- 4. useMutation cho thao tác Delete (Giả định có API Delete) ---
  // const deleteSubscriptionMutation = useMutation({
  //   mutationFn: async (subscriptionId: string) => {
  //     // Giả định API DELETE /api/subscriptions/:id
  //     const { data } = await axiosInstance.delete<any>(`${BASE_URL}/${subscriptionId}`)
  //     return data
  //   },
  //   onSuccess: () => {
  //     // Invalidate query để tự động re-fetch danh sách mới nhất
  //     queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY] })
  //     notification.success({
  //       message: 'Xóa gói đăng ký thành công'
  //     })
  //   },
  //   onError: (err: any) => {
  //     notification.error({
  //       message: 'Có lỗi xảy ra khi xóa',
  //       description: err.message || 'Lỗi không xác định'
  //     })
  //   }
  // })

  // const confirmDelete = (subscription: Subscription) => {
  //   deleteSubscriptionMutation.mutate(subscription.id.toString())
  // }

  return [
    { meta, listSubscriptions: data?.data?.content || [], isLoading, error, columns, control },
    { handleReset, handleSubmit, handleTableChange, onSubmit }
  ] as const
}
