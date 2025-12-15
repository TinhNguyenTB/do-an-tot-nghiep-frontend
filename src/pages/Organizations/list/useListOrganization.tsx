import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { usePaginationAndFilter } from '@/hooks/usePaginationAndFilter'
import axiosInstance from '@/libs/axiosInstance'
import { PaginationMeta } from '@/services/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Popconfirm, Space, TableProps } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MENU_URL } from '@/constants/menuUrl'
import { ORGANIZATIONS_QUERY_KEY, useQueryOrganizations } from '@/services/organization'
import { Organization } from '@/services/organization/type'
import { defaultPaginationMeta } from '@/constants/paginationMeta'

const defaultFilters = {
  name: ''
}

// Định nghĩa kiểu dữ liệu cho form tìm kiếm
interface ISubscriptionFilters {
  name: string
}

export const useListOrganization = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toastSuccess } = useGlobalMessage()
  // --- SỬ DỤNG CUSTOM HOOK ---
  const { queryParams, handlePageChange, handleFilterSubmit, handleFilterReset } =
    usePaginationAndFilter(defaultFilters, 5) // Khai báo kích thước mặc định là 5

  const { data, isLoading } = useQueryOrganizations(queryParams)

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
  const meta: PaginationMeta = data?.data?.meta || defaultPaginationMeta

  const columns: TableProps<Organization>['columns'] = [
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
    { title: 'Số lượng thành viên', dataIndex: 'userCount' },
    {
      title: 'Mô tả',
      dataIndex: 'description'
    },

    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <Space size={'large'}>
            <EditOutlined
              style={{ color: 'blue' }}
              onClick={() => navigate(`${MENU_URL.ORGANIZATIONS}/${record.id}`)}
            />

            <Popconfirm
              placement='topLeft'
              title='Xác nhận xóa'
              description={`Bạn có chắc muốn xóa tổ chức: ${record.name}?`}
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

  const deleteOrganizationMutation = useMutation({
    mutationFn: async (subscriptionId: string) => {
      await axiosInstance.delete(`${ORGANIZATIONS_QUERY_KEY}/${subscriptionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORGANIZATIONS_QUERY_KEY] })
      toastSuccess('Xóa tổ chức thành công')
    }
  })

  const confirmDelete = (org: Organization) => {
    deleteOrganizationMutation.mutate(org.id.toString())
  }

  return [
    { meta, listOrganizations: data?.data?.content || [], isLoading, columns, control },
    { handleReset, handleSubmit, handleTableChange, onSubmit }
  ] as const
}
