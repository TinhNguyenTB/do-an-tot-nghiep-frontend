import { CoreInput } from '@/components/CoreInput'
import { useListSubscription } from '@/pages/Subscription/list/useListSubscription'
import { Button, Form, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MENU_URL } from '@/constants/menuUrl'
import { useTranslation } from 'react-i18next'
import { TRANSLATION } from '@/constants/translates'

export const ListSubscriptionPage = () => {
  const [values, handles] = useListSubscription()
  const { isLoading, listSubscriptions, columns, control, meta, canCreateSubscription } = values
  const { handleReset, onSubmit, handleSubmit, handleTableChange } = handles
  const navigate = useNavigate()
  const { t } = useTranslation(TRANSLATION.COMMON)

  return (
    <main>
      <Form layout='inline' onFinish={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
        <CoreInput
          control={control}
          name='name'
          prefix={<SearchOutlined />}
          placeholder='Nhập tên gói dịch vụ'
        />
        <Form.Item>
          <Space>
            <Button htmlType='submit' type='primary' loading={isLoading}>
              {t('btn.search')}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
      {canCreateSubscription && (
        <Button
          type='primary'
          onClick={() => navigate(`${MENU_URL.SUBSCRIPTIONS}/addNew`)}
          style={{ marginBottom: 20 }}
        >
          {t('btn.addNew')}
        </Button>
      )}
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
