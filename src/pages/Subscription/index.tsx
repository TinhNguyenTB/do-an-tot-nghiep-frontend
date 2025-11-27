import { CoreInput } from '@/components/CoreInput'
import { useSubscription } from '@/pages/Subscription/useSubscription'
import { Button, Form, Space, Table } from 'antd'

export const SubscriptionPage = () => {
  const [values, handles] = useSubscription()
  const { error, isLoading, listSubscriptions, columns, control, meta } = values
  const { handleReset, onSubmit, handleSubmit, handleTableChange } = handles

  if (error) {
    return <div>Lỗi tải dữ liệu: {error.message}</div>
  }

  return (
    <main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20
        }}
      >
        <h2>Table Subscriptions</h2>
        <Button type='primary'>Thêm mới</Button>
      </div>

      <Form layout='vertical' onFinish={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
        <CoreInput control={control} name='name' label={'Tên'} size='large' />
        {/* Các nút Submit và Reset nằm ngang */}
        <Form.Item>
          <Space>
            <Button htmlType='submit' type='primary' loading={isLoading}>
              Tìm kiếm
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={listSubscriptions}
        rowKey={'id'}
        loading={isLoading}
        pagination={{
          current: meta.currentPage,
          pageSize: meta.itemsPerPage,
          total: meta.totalItems,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: handleTableChange,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20']
        }}
      />
    </main>
  )
}
