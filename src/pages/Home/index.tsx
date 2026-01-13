import { useQuerySystemCounts } from '@/services/analytic/counts'
import { useQueryProfile } from '@/services/auth/profile'
import { useRbacStore } from '@/store/rbacStore'
import {
  ApartmentOutlined,
  BankOutlined,
  CreditCardOutlined,
  DollarOutlined,
  IssuesCloseOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Alert, Card, Col, Row, Statistic, Typography } from 'antd'

export function HomePage() {
  const { data, isFetching, error } = useQuerySystemCounts()
  const organizationId = useRbacStore((state) => state.organizationId)
  const { data: profile } = useQueryProfile()

  if (isFetching) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4'>
        {Array.from({ length: 4 }).map((i, index) => {
          return <div key={index} className='h-28 bg-gray-100 rounded-lg animate-pulse'></div>
        })}
      </div>
    )
  }
  if (error) {
    return (
      <Alert
        message='Lỗi Tải Dữ Liệu'
        description={'Không có dữ liệu tổng quan hệ thống.'}
        type='error'
        showIcon
        style={{ margin: '20px' }}
      />
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        {profile?.data.organization !== null && (
          <Col xs={24}>
            <Typography.Title level={2}>{profile?.data.organization.name}</Typography.Title>
          </Col>
        )}
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ marginBottom: '16px' }}>
            <Statistic
              title='Tổng Số Người Dùng'
              value={data?.data.totalUsers}
              formatter={(value) => (value ? value.toLocaleString() : '0')}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        {organizationId === null && (
          <>
            <Col xs={24} sm={12} lg={8}>
              <Card style={{ marginBottom: '16px' }}>
                <Statistic
                  title='Tổng Số Tổ Chức'
                  value={data?.data.totalOrganizations}
                  formatter={(value) => (value ? value.toLocaleString() : '0')}
                  prefix={<BankOutlined style={{ color: '#52c41a' }} />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card style={{ marginBottom: '16px' }}>
                <Statistic
                  title='Tổng Số Gói Dịch Vụ'
                  value={data?.data.totalSubscriptions}
                  formatter={(value) => (value ? value.toLocaleString() : '0')}
                  prefix={<DollarOutlined style={{ color: '#fadb14' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card style={{ marginBottom: '16px' }}>
                <Statistic
                  title='Tổng Số giao dịch'
                  value={data?.data.totalPayments}
                  formatter={(value) => (value ? value.toLocaleString() : '0')}
                  prefix={<CreditCardOutlined style={{ color: 'pink' }} />}
                />
              </Card>
            </Col>
          </>
        )}
        {organizationId !== null && (
          <>
            <Col xs={24} sm={12} lg={8}>
              <Card style={{ marginBottom: '16px' }}>
                <Statistic
                  title='Tổng Số Vai trò'
                  value={data?.data.totalRoles}
                  formatter={(value) => (value ? value.toLocaleString() : '0')}
                  prefix={<ApartmentOutlined style={{ color: '#52c41a' }} />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card style={{ marginBottom: '16px' }}>
                <Statistic
                  title='Tổng Số Quyền'
                  value={data?.data.totalPermissions}
                  formatter={(value) => (value ? value.toLocaleString() : '0')}
                  prefix={<IssuesCloseOutlined style={{ color: '#fadb14' }} />}
                />
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  )
}
