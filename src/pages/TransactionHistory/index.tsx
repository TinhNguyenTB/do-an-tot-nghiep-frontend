import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { fetchTransactionHistoryInfinite } from '@/services/payment'
import { formatVND } from '@/utils/formatVND'
import { BankOutlined } from '@ant-design/icons'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Badge, Card, Empty, Space, Spin, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'

const { Title, Text } = Typography

export const TransactionHistoryPage = () => {
  // 1. Fetch dữ liệu với bộ lọc
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['api/payments/transaction'],
    queryFn: fetchTransactionHistoryInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta
      return meta.hasNextPage ? meta.currentPage + 1 : undefined
    }
  })

  const payments = useMemo(() => data?.pages.flatMap((page) => page.data.content) ?? [], [data])
  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage && !isFetchingNextPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'success'
      case 'FAILED':
        return 'error'
      case 'PENDING':
        return 'processing'
      default:
        return 'default'
    }
  }

  if (isLoading)
    return (
      <div className='flex justify-center p-10'>
        <Spin size='large' />
      </div>
    )

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-4'>
        <Title level={2}>Lịch sử giao dịch</Title>
      </div>

      {payments.length === 0 && <Empty description='Không tìm thấy dữ liệu giao dịch' />}

      <div className='grid grid-cols-1 gap-4'>
        {payments.map((payment) => (
          <Card
            key={payment.id}
            className='shadow-sm border-l-4'
            style={{ borderLeftColor: payment.status === 'SUCCESS' ? '#52c41a' : '#d9d9d9' }}
          >
            <div className='flex flex-col md:flex-row justify-between gap-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-2'>
                  <Tag color='cyan'>{payment.subscription?.name}</Tag>
                  <Badge status={getStatusBadge(payment.status) as any} text={payment.status} />
                </div>

                <Space direction='vertical' size={2}>
                  <Text strong className='text-md'>
                    {payment.user?.name} ({payment.user?.email})
                  </Text>
                  <Space className='text-gray-500 text-xs'>
                    <BankOutlined />
                    <Text type='secondary'>
                      Tổ chức: {payment.user?.organization?.name || 'Cá nhân'}
                    </Text>
                  </Space>
                  <Text className='text-xs font-mono text-gray-400'>
                    Mã: {payment.transactionId || 'N/A'}
                  </Text>
                </Space>
              </div>

              <div className='flex flex-col items-end justify-between border-l pl-6 border-gray-100'>
                <div className='text-right'>
                  <div className='text-xs text-gray-400'>Số tiền thanh toán</div>
                  <div
                    className={`text-xl font-bold ${payment.status === 'SUCCESS' ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    {formatVND(payment.amount)}
                  </div>
                </div>
                <Text className='text-gray-400' style={{ fontSize: '11px' }}>
                  {dayjs(payment.paymentDate).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div ref={loadMoreRef} className='py-8 text-center'>
        {isFetchingNextPage && <Spin tip='Đang tải thêm...' />}
        {hasNextPage && <Text type='secondary'>Cuộn để xem thêm</Text>}
      </div>
    </div>
  )
}
