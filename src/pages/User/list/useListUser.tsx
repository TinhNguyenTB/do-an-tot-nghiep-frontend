import { MENU_URL } from '@/constants/menuUrl'
import { defaultPaginationMeta } from '@/constants/paginationMeta'
import { UserStatus } from '@/enums'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { usePaginationAndFilter } from '@/hooks/usePaginationAndFilter'
import axiosInstance from '@/libs/axiosInstance'
import { PaginationMeta } from '@/services/types'
import { useQueryUsers, USERS_QUERY_KEY } from '@/services/user'
import { User } from '@/services/user/type'
import { formatRoleName, getRoleColor } from '@/utils/roleUtils'
import { formatUserStatusName, getUserStatusColor } from '@/utils/statusUtils'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Popconfirm, Space, TableProps, Tag } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const defaultFilters = {
  name: '',
  email: ''
}

// Định nghĩa kiểu dữ liệu cho form tìm kiếm
interface IUserFilters {
  name: string
  email: string
}

export const useListUser = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toastSuccess } = useGlobalMessage()

  const { queryParams, handlePageChange, handleFilterSubmit, handleFilterReset } =
    usePaginationAndFilter(defaultFilters, 5)

  const { data, isLoading } = useQueryUsers(queryParams)

  const { control, handleSubmit, reset } = useForm<IUserFilters>({
    defaultValues: defaultFilters
  })

  const onSubmit: SubmitHandler<IUserFilters> = (data) => {
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

  const columns: TableProps<User>['columns'] = [
    {
      title: 'STT',
      render: (_, record, index) => {
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
      title: 'Email',
      dataIndex: 'email'
    },
    { title: 'Tổ chức', dataIndex: 'organizationName' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: UserStatus) => {
        return (
          <Tag key={status} color={getUserStatusColor(status)}>
            {formatUserStatusName(status)}
          </Tag>
        )
      }
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      render: (roles: string[]) => {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {roles.map((roleName) => (
              <Tag key={roleName} color={getRoleColor(roleName)}>
                {/* Chuyển đổi tên vai trò thành định dạng dễ đọc (ví dụ: super_admin -> Super Admin) */}
                {formatRoleName(roleName)}
              </Tag>
            ))}
          </div>
        )
      }
    },
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <Space size={'large'}>
            <EditOutlined
              style={{ color: 'blue' }}
              onClick={() => navigate(`${MENU_URL.USERS}/${record.id}`)}
            />

            <Popconfirm
              placement='topLeft'
              title='Xác nhận xóa'
              description={`Bạn có chắc muốn xóa người dùng: ${record.name}?`}
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

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await axiosInstance.delete(`${USERS_QUERY_KEY}/${userId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
      toastSuccess('Xóa gói dịch vụ thành công')
    }
  })

  const confirmDelete = (user: User) => {
    deleteUserMutation.mutate(user.id.toString())
  }

  return [
    { meta, listUsers: data?.data?.content || [], isLoading, columns, control },
    { handleReset, handleSubmit, handleTableChange, onSubmit }
  ] as const
}
