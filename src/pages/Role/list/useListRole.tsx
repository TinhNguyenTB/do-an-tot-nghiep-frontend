import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { usePaginationAndFilter } from '@/hooks/usePaginationAndFilter'
import axiosInstance from '@/libs/axiosInstance'
import { PaginationMeta } from '@/services/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Popconfirm, Space, TableProps, Tag } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MENU_URL } from '@/constants/menuUrl'
import { ROLES_QUERY_KEY, useQueryRoles } from '@/services/role'
import { Role } from '@/services/role/type'
import { formatRoleName, getRoleColor } from '@/utils/roleUtils'
import { ROLES } from '@/constants/rbac'
import { defaultPaginationMeta } from '@/constants/paginationMeta'

const defaultFilters = {
  name: ''
}

// Định nghĩa kiểu dữ liệu cho form tìm kiếm
interface IRoleFilters {
  name: string
}

export const useListRole = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toastSuccess } = useGlobalMessage()

  const { queryParams, handlePageChange, handleFilterSubmit, handleFilterReset } =
    usePaginationAndFilter(defaultFilters, 5)

  const { data, isLoading } = useQueryRoles(queryParams)

  const { control, handleSubmit, reset } = useForm<IRoleFilters>({
    defaultValues: defaultFilters
  })

  const onSubmit: SubmitHandler<IRoleFilters> = (data) => {
    handleFilterSubmit(data)
  }

  const handleReset = () => {
    reset(defaultFilters) // Reset form inputs về giá trị mặc định
    handleFilterReset(defaultFilters) // Reset trạng thái lọc và phân trang trong hook
  }

  const handleTableChange = (page: number, pageSize: number) => {
    handlePageChange(page, pageSize)
  }

  const meta: PaginationMeta = data?.data?.meta || defaultPaginationMeta

  const columns: TableProps<Role>['columns'] = [
    {
      title: 'STT',
      render: (_, __, index) => {
        return (meta.currentPage - 1) * meta.itemsPerPage + index + 1
      }
    },
    {
      title: 'Tên',
      render(_, record) {
        return <Tag color={getRoleColor(record.name)}>{formatRoleName(record.name)}</Tag>
      }
    },
    { title: 'Mô tả', dataIndex: 'description' },
    {
      title: 'Kế thừa từ',
      render(_, record) {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {record.inheritsFrom.map((item) => (
              <Tag key={item.parent.name} color={getRoleColor(item.parent.name)}>
                {formatRoleName(item.parent.name)}
              </Tag>
            ))}
          </div>
        )
      }
    },
    {
      title: 'Kế thừa bởi',
      render(_, record) {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {record.inheritedBy.map((item) => (
              <Tag key={item.child.name} color={getRoleColor(item.child.name)}>
                {formatRoleName(item.child.name)}
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
              onClick={() => navigate(`${MENU_URL.ROLES}/${record.name}`)}
            />
            {record.name !== ROLES.SUPER_ADMIN && (
              <Popconfirm
                placement='topLeft'
                title='Xác nhận xóa'
                description={`Bạn có chắc muốn xóa vai trò: ${formatRoleName(record.name)}?`}
                onConfirm={() => confirmDelete(record)}
                okText='Có'
                cancelText='Không'
              >
                <DeleteOutlined style={{ color: 'red' }} />
              </Popconfirm>
            )}
          </Space>
        )
      }
    }
  ]

  const deleteRoleMutation = useMutation({
    mutationFn: async (name: string) => {
      await axiosInstance.delete(`${ROLES_QUERY_KEY}/${name}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] })
      toastSuccess('Xóa gói vai trò thành công')
    }
  })

  const confirmDelete = (role: Role) => {
    deleteRoleMutation.mutate(role.name)
  }

  return [
    { meta, listSubscriptions: data?.data?.content || [], isLoading, columns, control },
    { handleReset, handleSubmit, handleTableChange, onSubmit }
  ] as const
}
