import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DataTable, { CustomColumnType } from '@/components/DataTable'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { QueryParams } from '@/services/types'
import { Tag } from 'antd'
import { Subscription } from '@/services/subscription/type'
import { useQuerySubscriptions } from '@/services/subscription'

const SubscriptionList: React.FC = () => {
  // 1. Khai báo trạng thái QueryParams (bắt đầu từ page 1)
  const [queryParams, setQueryParams] = useState<QueryParams>({ page: 1, size: 1 })
  const { data, isLoading, error } = useQuerySubscriptions(queryParams)

  // 4. Xử lý lỗi (Nếu cần)
  if (error) {
    // Bạn có thể hiển thị một thông báo lỗi ở đây
    return (
      <div>
        Lỗi khi tải dữ liệu gói dịch vụ:{' '}
        {error instanceof Error ? error.message : 'Lỗi không xác định'}
      </div>
    )
  }

  // 5. Định nghĩa Columns (Giữ nguyên)
  const columns: CustomColumnType<Subscription>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: true
    },
    {
      title: 'Tên gói',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      searchable: true
    },
    {
      title: 'Thời hạn (Ngày)',
      dataIndex: 'duration',
      key: 'duration',
      width: 150,
      sorter: true
    },
    {
      title: 'Giá (VND)',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      sorter: true,
      render: (price: string) => new Intl.NumberFormat('vi-VN').format(Number(price)) + '₫'
    },
    {
      title: 'Giới hạn User',
      dataIndex: 'userLimit',
      key: 'userLimit',
      width: 150,
      render: (limit: number | null) => (limit === null ? <Tag color='green'>Cá nhân</Tag> : limit)
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      sorter: true,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
    }
  ]

  // 7. Render DataTable
  return (
    <div>
      <h2>Quản lý Gói Dịch vụ</h2>
      <DataTable<Subscription>
        columns={columns}
        // Dữ liệu từ useQuery
        externalData={
          data || {
            data: {
              content: [],
              meta: {
                totalItems: 0,
                currentPage: 1,
                hasNextPage: false,
                hasPreviousPage: false,
                itemsPerPage: 10,
                totalPages: 1
              }
            }
          }
        }
        isLoading={isLoading}
        initialQueryParams={queryParams}
        onQueryParamsChange={setQueryParams}
        rowKey='id'
        showResetAll={true}
      />
    </div>
  )
}

export function HomePage() {
  const { t } = useTranslation('home')
  return (
    <main>
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
      <SubscriptionList />
    </main>
  )
}
