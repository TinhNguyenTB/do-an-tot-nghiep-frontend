import { useInfiniteQuery } from '@tanstack/react-query'
import { Typography, Spin, Card, Tag, Empty, Divider } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { fetchOrgPaymentHistoryInfinite } from '@/services/payment'
import { formatVND } from '@/utils/formatVND'

const { Title, Text } = Typography

export const PaymentHistoryPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['payments/history'],
    queryFn: fetchOrgPaymentHistoryInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta
      return meta.hasNextPage ? meta.currentPage + 1 : undefined
    }
  })

  // Flatten dữ liệu từ các trang thành một mảng duy nhất
  const payments = useMemo(() => data?.pages.flatMap((page) => page.data.content) ?? [], [data])

  // Hook xử lý cuộn vô hạn
  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage && !isFetchingNextPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'green'
      case 'FAILED':
        return 'red'
      case 'PENDING':
        return 'orange'
      default:
        return 'default'
    }
  }

  if (isLoading)
    return (
      <div className='flex justify-center p-10'>
        <Spin size='large' tip='Đang tải lịch sử...' />
      </div>
    )

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <Title level={3} className='mb-6  pb-2'>
        Lịch sử thanh toán
      </Title>

      {payments.length === 0 && !isLoading && <Empty description='Chưa có giao dịch nào' />}

      <div className='space-y-4'>
        {payments.map((payment) => (
          <Card
            key={payment.id}
            hoverable
            className='border-l-4'
            style={{ borderLeftColor: getStatusColor(payment.status) }}
          >
            <div className='flex justify-between items-start'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1'>
                  <Text className='text-lg'>{payment.subscription?.name}</Text>
                  <Tag color={payment.paymentType === 'REGISTER' ? 'blue' : 'purple'}>
                    {payment.paymentType}
                  </Tag>
                </div>
                <div className='text-gray-500 text-sm font-mono mb-2'>
                  TransactionID: {payment.transactionId || 'Chưa có mã'}
                </div>
                <Text type='secondary'>
                  Thanh toán bởi:{' '}
                  <span className='text-gray-700'>
                    {payment.user?.name} ({payment.user.email})
                  </span>
                </Text>
              </div>

              <div className='text-right'>
                <div className='text-xl font-bold text-red-500 mb-1'>
                  -{formatVND(payment.amount)}
                </div>
              </div>
            </div>

            <Divider className='my-3' />

            <div className='flex justify-between items-center text-xs text-gray-400'>
              <span>{dayjs(payment.paymentDate).format('DD MMMM, YYYY HH:mm')}</span>
              {payment.status === 'SUCCESS' && <Text type='success'>Giao dịch thành công</Text>}
              {payment.status === 'FAILED' && <Text type='danger'>Giao dịch thất bại</Text>}
            </div>
          </Card>
        ))}
      </div>

      {/* Điểm kích hoạt load more */}
      <div ref={loadMoreRef} className='py-6 text-center'>
        {isFetchingNextPage ? (
          <Spin tip='Đang tải thêm...' />
        ) : hasNextPage ? (
          <Text type='secondary'>Cuộn để xem thêm</Text>
        ) : (
          <Divider plain>Bạn đã xem hết lịch sử</Divider>
        )}
      </div>
    </div>
  )
}
