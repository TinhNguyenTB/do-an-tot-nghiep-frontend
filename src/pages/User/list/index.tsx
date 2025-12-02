import { CoreInput } from '@/components/CoreInput'
import { Button, Form, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MENU_URL } from '@/constants/menuUrl'
import { useTranslation } from 'react-i18next'
import { TRANSLATION } from '@/constants/translates'
import { useListUser } from '@/pages/User/list/useListUser'

export const ListUserPage = () => {
  const [values, handles] = useListUser()
  const { isLoading, listUsers, columns, control, meta } = values
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
          placeholder='Nhập tên người dùng'
        />
        <CoreInput
          control={control}
          name='email'
          prefix={<SearchOutlined />}
          placeholder='Nhập email'
        />

        {/* Các nút Submit và Reset nằm ngang */}
        <Form.Item>
          <Space>
            <Button htmlType='submit' type='primary' loading={isLoading}>
              {t('btn.search')}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
      <Button
        type='primary'
        onClick={() => navigate(`${MENU_URL.USERS}/addNew`)}
        style={{ marginBottom: 20 }}
      >
        {t('btn.addNew')}
      </Button>
      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={listUsers}
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
