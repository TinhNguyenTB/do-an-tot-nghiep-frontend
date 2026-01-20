import {
  changeSubscription,
  fetchMySubscription,
  fetchSubscriptions,
  renewSubscription,
  SUBSCRIPTIONS_QUERY_KEY
} from '@/services/subscription'
import { formatVND } from '@/utils/formatVND'
import {
  CalendarOutlined,
  CheckCircleFilled,
  CreditCardOutlined,
  HistoryOutlined,
  RocketOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  message,
  Modal,
  Row,
  Space,
  Statistic,
  Typography
} from 'antd'
import dayjs from 'dayjs'

const { Title, Text } = Typography

export function CurrentSubscriptionPage() {
  // 1. Lấy dữ liệu gói hiện tại
  const { data: subData, isLoading } = useQuery({
    queryKey: ['my'],
    queryFn: fetchMySubscription
  })

  // Dữ liệu tất cả các gói để đổi
  const { data: allPlans } = useQuery({
    queryKey: [SUBSCRIPTIONS_QUERY_KEY],
    queryFn: fetchSubscriptions
  })

  // 3. Mutation đổi gói
  const changePlanMutation = useMutation({
    mutationFn: (newSubId: number) => changeSubscription({ newSubId }),
    onSuccess: (res) => {
      if (res.data.type === 'PAYMENT_REQUIRED') {
        window.location.href = res.data.url
      } else {
        message.success('Đổi gói thành công!')
        window.location.reload()
      }
    }
  })

  // 2. Mutation xử lý gia hạn
  const renewMutation = useMutation({
    mutationFn: () => renewSubscription({ subscriptionId: subData!.data.subscriptionId! }),
    onSuccess: (res) => {
      window.location.href = res.data.redirectUrl
    }
  })

  const getEstimatedPrice = (planPrice: number) => {
    if (!subData?.data) return planPrice
    const remainingDays = dayjs(subData.data.endDate).diff(dayjs(), 'day')
    const totalDays = subData.data.subscription.duration
    const credit = (+subData.data.subscription.price / totalDays) * Math.max(0, remainingDays)
    return Math.max(0, planPrice - credit)
  }

  if (isLoading) return <Card loading title='Đang tải dữ liệu...' />

  const daysLeft = dayjs(subData?.data.endDate).diff(dayjs(), 'day')

  return (
    <div className='max-w-[1400px] mx-auto p-6'>
      <Row gutter={[24, 24]}>
        {/* --- CỘT TRÁI: GÓI HIỆN TẠI (12 CỘT) --- */}
        <Col xs={24} lg={12}>
          <Card
            className='shadow-md border-0 h-full'
            title={
              <Space>
                <CreditCardOutlined />
                <span>Gói dịch vụ đang sử dụng</span>
              </Space>
            }
          >
            <div className='flex flex-col gap-6'>
              <div>
                <Title level={3} className='m-0 text-blue-600'>
                  {subData?.data.subscription.name}
                </Title>
                <Text type='secondary' className='text-xs'>
                  ID Giao dịch: {subData?.data.paymentId}
                </Text>

                <div className='mt-6 space-y-3'>
                  <div className='flex items-center gap-3'>
                    <CheckCircleFilled className='text-green-500' />
                    <Text>
                      Giới hạn người dùng:{' '}
                      <strong>{subData?.data.subscription.userLimit} user</strong>
                    </Text>
                  </div>
                  <div className='flex items-center gap-3'>
                    <CalendarOutlined className='text-gray-400' />
                    <Text>Ngày bắt đầu: {dayjs(subData?.data.startDate).format('DD/MM/YYYY')}</Text>
                  </div>
                </div>
              </div>

              <div className='bg-blue-50 p-6 rounded-xl text-center border border-blue-100'>
                <Statistic
                  title='Thời gian còn lại'
                  value={daysLeft > 0 ? daysLeft : 0}
                  suffix='ngày'
                  valueStyle={{ color: daysLeft < 7 ? '#cf1322' : '#3f8600', fontWeight: 'bold' }}
                />
                <Text type='secondary'>
                  Đến ngày {dayjs(subData?.data.endDate).format('DD/MM/YYYY')}
                </Text>
              </div>

              <Divider />

              <div className='flex flex-col gap-3'>
                <Button
                  type='primary'
                  block
                  icon={<HistoryOutlined />}
                  size='large'
                  loading={renewMutation.isPending}
                  onClick={() => {
                    Modal.confirm({
                      title: 'Xác nhận gia hạn',
                      content: `Bạn sẽ gia hạn gói ${subData?.data.subscription.name} thêm ${subData?.data.subscription.duration} ngày với giá ${formatVND(subData!.data!.subscription.price!)}.`,
                      okText: 'Thanh toán ngay',
                      onOk: () => renewMutation.mutate()
                    })
                  }}
                >
                  Gia hạn ngay
                </Button>

                {daysLeft < 7 && (
                  <Alert message={`Sắp hết hạn (${daysLeft} ngày nữa)`} type='warning' showIcon />
                )}
              </div>
            </div>
          </Card>
        </Col>

        {/* --- CỘT PHẢI: THAY ĐỔI GÓI (12 CỘT) --- */}
        <Col xs={24} lg={12}>
          <div className='mb-4'>
            <Title level={4}>
              <SwapOutlined /> Thay đổi gói dịch vụ
            </Title>
          </div>

          <div className='overflow-y-auto max-h-[700px] pr-2 custom-scrollbar'>
            <Row gutter={[16, 16]}>
              {allPlans?.data.content
                ?.filter((p: any) => p.id !== subData?.data.subscriptionId)
                .map((plan: any) => (
                  <Col span={24} key={plan.id}>
                    <Card
                      hoverable
                      className='border-gray-200 transition-all hover:border-blue-300 shadow-sm'
                    >
                      <div className='flex justify-between items-center'>
                        <div className='flex-1'>
                          <Title level={5} className='mb-1'>
                            {plan.name}
                          </Title>
                          <Space split={<Divider type='vertical' />}>
                            <Text strong className='text-blue-600'>
                              {formatVND(plan.price)}
                            </Text>
                            <Text type='secondary'>{plan.duration} ngày</Text>
                            <Text className='text-xs bg-gray-100 px-2 py-0.5 rounded'>
                              Giới hạn người dùng: {plan.userLimit}
                            </Text>
                          </Space>
                        </div>

                        <Button
                          type='primary'
                          ghost
                          icon={<RocketOutlined />}
                          loading={changePlanMutation.isPending}
                          onClick={() => {
                            Modal.confirm({
                              title: `Nâng cấp sang ${plan.name}`,
                              content: `Bạn cần thanh toán thêm khoảng ${formatVND(getEstimatedPrice(plan.price))} sau khi đã trừ số ngày còn lại của gói cũ.`,
                              okText: 'Tiến hành đổi gói',
                              onOk: () => changePlanMutation.mutate(plan.id)
                            })
                          }}
                        >
                          Chọn
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}
