import { useQuery, useMutation } from '@tanstack/react-query'
import {
  Card,
  Typography,
  Button,
  Tag,
  Space,
  Statistic,
  Divider,
  Modal,
  Alert,
  Row,
  Col
} from 'antd'
import {
  CalendarOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  CheckCircleFilled
} from '@ant-design/icons'
import dayjs from 'dayjs'
import {
  renewSubscription,
  SUBSCRIPTIONS_QUERY_KEY,
  fetchMySubscription
} from '@/services/subscription'
import { formatVND } from '@/utils/formatVND'

const { Title, Text } = Typography

export function CurrentSubscriptionPage() {
  // 1. Lấy dữ liệu gói hiện tại
  const { data: subData, isLoading } = useQuery({
    queryKey: [`${SUBSCRIPTIONS_QUERY_KEY}/my`],
    queryFn: fetchMySubscription
  })

  // 2. Mutation xử lý gia hạn
  const renewMutation = useMutation({
    mutationFn: () => renewSubscription({ subscriptionId: subData!.data.subscriptionId! }),
    onSuccess: (res) => {
      window.location.href = res.data.redirectUrl
    }
  })

  if (isLoading) return <Card loading title='Đang tải dữ liệu...' />

  const isExpired = dayjs(subData?.data.endDate).isBefore(dayjs())
  const daysLeft = dayjs(subData?.data.endDate).diff(dayjs(), 'day')

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            className='shadow-md border-0'
            title={
              <Space>
                <CreditCardOutlined />
                <span>Gói dịch vụ đang sử dụng</span>
              </Space>
            }
            extra={
              <Tag color={isExpired ? 'red' : 'green'}>
                {isExpired ? 'Đã hết hạn' : 'Đang hoạt động'}
              </Tag>
            }
          >
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
              <div>
                <Title level={3} className='m-0 text-blue-600'>
                  {subData?.data.subscription.name}
                </Title>
                <Text type='secondary'>ID Giao dịch: {subData?.data.paymentId}</Text>

                <div className='mt-4 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <CheckCircleFilled className='text-green-500' />
                    <Text>
                      Giới hạn người dùng:{' '}
                      <strong>{subData?.data.subscription.userLimit} user</strong>
                    </Text>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CalendarOutlined className='text-gray-400' />
                    <Text>Ngày bắt đầu: {dayjs(subData?.data.startDate).format('DD/MM/YYYY')}</Text>
                  </div>
                </div>
              </div>

              <div className='bg-gray-50 p-6 rounded-xl min-w-[250px] text-center border border-gray-100'>
                <Statistic
                  title='Thời gian còn lại'
                  value={daysLeft > 0 ? daysLeft : 0}
                  suffix='ngày'
                  valueStyle={{ color: daysLeft < 7 ? '#cf1322' : '#3f8600' }}
                />
                <Text type='secondary'>
                  Đến ngày {dayjs(subData?.data.endDate).format('DD/MM/YYYY')}
                </Text>
              </div>
            </div>

            <Divider />

            <div className='flex justify-end gap-4'>
              {/* <Button type='default' onClick={() => (window.location.href = '/subscriptions')}>
                Đổi gói khác
              </Button> */}
              <Button
                type='primary'
                icon={<HistoryOutlined />}
                size='large'
                loading={renewMutation.isPending}
                onClick={() => {
                  Modal.confirm({
                    title: 'Xác nhận gia hạn',
                    content: `Bạn sẽ gia hạn gói ${subData?.data.subscription.name} thêm ${subData?.data.subscription.duration} ngày với giá ${formatVND(subData!.data!.subscription.price!)} VND. Ngày hết hạn mới sẽ được cộng dồn.`,
                    okText: 'Thanh toán ngay',
                    cancelText: 'Để sau',
                    onOk: () => renewMutation.mutate()
                  })
                }}
              >
                Gia hạn ngay
              </Button>
            </div>
          </Card>
        </Col>

        {daysLeft < 7 && !isExpired && (
          <Col span={24}>
            <Alert
              message='Sắp hết hạn!'
              description={`Gói dịch vụ của bạn sẽ hết hạn sau ${daysLeft} ngày nữa. Hãy gia hạn ngay để không bị gián đoạn công việc.`}
              type='warning'
              showIcon
              closable
            />
          </Col>
        )}
      </Row>
    </div>
  )
}
