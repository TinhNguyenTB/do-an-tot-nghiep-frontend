import { Card, Button, Typography, Spin } from 'antd'
import { useFormContext, useWatch } from 'react-hook-form'
import { useQuerySubscriptions } from '@/services/subscription'
import { formatVND } from '@/utils/formatVND'
import { RegisterFormValues } from '@/services/auth/register/type'

export const SubscriptionPlan = () => {
  // Lấy các hàm cần thiết từ React Hook Form Context
  const { setValue, control } = useFormContext<RegisterFormValues>()
  const [selectedSubscriptionId, isOrganization] = useWatch({
    control,
    name: ['subscriptionId', 'isOrganization']
  })

  // Fetch danh sách các gói dịch vụ
  const { data, isLoading, isError } = useQuerySubscriptions({ page: 1, size: 20 })

  const subscriptions = data?.data.content || []
  const filteredSubscriptions = isOrganization
    ? subscriptions.filter((sub) => sub.userLimit > 1)
    : subscriptions.filter((sub) => sub.userLimit === 1)

  if (isLoading) {
    return (
      <div className='text-center'>
        <Spin tip='Đang tải gói dịch vụ...' size='large' />
      </div>
    )
  }

  if (isError || filteredSubscriptions.length === 0) {
    return (
      <div className='text-center p-10 text-red-600'>
        <Typography.Title level={4}>Không tìm thấy gói dịch vụ nào.</Typography.Title>
        <p>Vui lòng thử lại sau.</p>
      </div>
    )
  }

  // Hàm xử lý chọn gói dịch vụ
  const handleSelect = (id: number) => {
    // Cập nhật giá trị vào trường 'subscriptionId' của form
    setValue('subscriptionId', id, { shouldValidate: true })
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {filteredSubscriptions.map((sub) => (
        <Card
          key={sub.id}
          title={sub.name}
          className={`
            border-2 transition-all duration-300 
            ${selectedSubscriptionId === sub.id ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:shadow-md'}
          `}
          actions={[
            <Button
              type={selectedSubscriptionId === sub.id ? 'primary' : 'default'}
              onClick={() => handleSelect(sub.id)}
            >
              {selectedSubscriptionId === sub.id ? 'Đã Chọn' : 'Chọn Gói Này'}
            </Button>
          ]}
        >
          <div className='text-center'>
            <Typography.Title level={3} className='!mb-0'>
              {formatVND(sub.price)}
            </Typography.Title>
            <Typography.Text type='secondary'>{sub.duration} ngày</Typography.Text>
          </div>
          <p className='mt-4 text-sm space-y-2'>✅ Giới hạn người dùng: {sub.userLimit}</p>
        </Card>
      ))}
    </div>
  )
}
