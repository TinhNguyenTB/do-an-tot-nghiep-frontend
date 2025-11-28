import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { usePaginationAndFilter } from '@/hooks/usePaginationAndFilter'
import axiosInstance from '@/libs/axiosInstance'
import { SUBSCRIPTIONS_QUERY_KEY, useQuerySubscriptions } from '@/services/subscription'
import { Subscription } from '@/services/subscription/type'
import { PaginationMeta } from '@/services/types'
import { formatVND } from '@/utils/formatVND'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Popconfirm, Space, TableProps } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MENU_URL } from '@/constants/menuUrl'

const defaultFilters = {
  name: ''
}

// Định nghĩa kiểu dữ liệu cho form tìm kiếm
interface ISubscriptionFilters {
  name: string
}

export const useSubscription = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toastSuccess } = useGlobalMessage()
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
      dataIndex: 'name'
      // Sắp xếp theo thứ tự bảng chữ cái (A-Z)
      // sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value: string) => formatVND(value),
      sorter: (a, b) => Number(a.price) - Number(b.price)
    },
    { title: 'Số ngày sử dụng', dataIndex: 'duration' },
    { title: 'Giới hạn người dùng', dataIndex: 'userLimit' },
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <Space size={'large'}>
            <EditOutlined
              style={{ color: 'blue' }}
              onClick={() => navigate(`${MENU_URL.SUBSCRIPTIONS}/${record.id}`)}
            />

            <Popconfirm
              placement='topLeft'
              title='Xác nhận xóa'
              description={`Bạn có chắc muốn xóa gói dịch vụ: ${record.name}?`}
              onConfirm={() => confirmDelete(record)}
              okText='Có'
              cancelText='Không'
            >
              <DeleteOutlined style={{ color: 'red' }} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const deleteSubscriptionMutation = useMutation({
    mutationFn: async (subscriptionId: string) => {
      await axiosInstance.delete(`${SUBSCRIPTIONS_QUERY_KEY}/${subscriptionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY] })
      toastSuccess('Xóa gói dịch vụ thành công')
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
