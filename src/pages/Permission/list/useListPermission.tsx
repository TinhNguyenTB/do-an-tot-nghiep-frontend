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
import { defaultPaginationMeta } from '@/constants/paginationMeta'
import { Permission } from '@/services/permission/type'
import { PERMISSIONS_QUERY_KEY, useQueryPermissions } from '@/services/permission'

const defaultFilters = {
  name: ''
}

// Định nghĩa kiểu dữ liệu cho form tìm kiếm
interface IPermissionFilters {
  name: string
}

export const useListPermission = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toastSuccess } = useGlobalMessage()
  const { queryParams, handlePageChange, handleFilterSubmit, handleFilterReset } =
    usePaginationAndFilter(defaultFilters, 5) // Khai báo kích thước mặc định là 5

  const { data, isLoading } = useQueryPermissions(queryParams)

  const { control, handleSubmit, reset } = useForm<IPermissionFilters>({
    defaultValues: defaultFilters
  })

  const onSubmit: SubmitHandler<IPermissionFilters> = (data) => {
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

  const columns: TableProps<Permission>['columns'] = [
    {
      title: 'STT',
      render: (_, __, index) => {
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
              onClick={() => navigate(`${MENU_URL.PERMISSIONS}/${record.id}`)}
            />

            <Popconfirm
              placement='topLeft'
              title='Xác nhận xóa'
              description={`Bạn có chắc muốn xóa quyền: ${record.name}?`}
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

  const deletePermissionMutation = useMutation({
    mutationFn: async (permissionId: number) => {
      await axiosInstance.delete(`${PERMISSIONS_QUERY_KEY}/${permissionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERMISSIONS_QUERY_KEY] })
      toastSuccess('Xóa quyền thành công')
    }
  })

  const confirmDelete = (permission: Permission) => {
    deletePermissionMutation.mutate(permission.id)
  }

  return [
    { meta, listPermissions: data?.data?.content || [], isLoading, columns, control },
    { handleReset, handleSubmit, handleTableChange, onSubmit }
  ] as const
}
