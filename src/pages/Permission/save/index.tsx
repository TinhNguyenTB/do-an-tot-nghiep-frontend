import { CoreInput } from '@/components/CoreInput'
import { CoreTextArea } from '@/components/CoreTextArea'
import { TRANSLATION } from '@/constants/translates'
import { useSavePermission } from '@/pages/Permission/save/useSaveSubscription'
import { Button, Col, Divider, Form, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { CoreSelect } from '@/components/CoreSelect'

export const SavePermissionPage = () => {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useSavePermission()
  const { methodForm, id, fields } = values
  const { onSubmit, onCancel, append, remove } = handles
  const { control } = methodForm

  return (
    <Form layout='vertical' onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <CoreInput control={control} name='name' label='Tên quyền' required />
        </Col>
        <Col span={12}>
          <CoreTextArea control={control} name='description' label='Mô tả' />
        </Col>
      </Row>

      <Divider orientation='center'>Danh sách Endpoints (API) được phép truy cập</Divider>

      {fields.map((field, index) => (
        <Row key={field.key} gutter={16} align='top' style={{ marginBottom: 16 }}>
          <Col span={6}>
            <CoreSelect
              control={control}
              label={index === 0 ? 'Method' : ''}
              labelPath='label'
              valuePath='value'
              name={`endpoints.${index}.httpMethod`}
              options={[
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
                { label: 'PUT', value: 'PUT' },
                { label: 'PATCH', value: 'PATCH' },
                { label: 'DELETE', value: 'DELETE' }
              ]}
            />
          </Col>
          <Col span={14}>
            <CoreInput
              control={control}
              name={`endpoints.${index}.endpoint`}
              label={index === 0 ? 'Path (Ví dụ: /api/v1/tasks)' : ''}
              placeholder='/api/v1/...'
            />
          </Col>
          <Col span={4}>
            <Button
              style={{ marginTop: index === 0 ? '28px' : 0 }}
              danger
              icon={<DeleteOutlined />}
              onClick={() => remove(index)}
            >
              Xóa
            </Button>
          </Col>
        </Row>
      ))}

      <Button
        type='dashed'
        onClick={() => append({ httpMethod: 'GET', endpoint: '' })}
        block
        icon={<PlusOutlined />}
        style={{ marginBottom: 24 }}
      >
        Thêm Endpoint
      </Button>

      <div className='flex justify-center gap-4'>
        <Button onClick={onCancel}>{t('btn.cancel')}</Button>
        <Button type='primary' htmlType='submit'>
          {id ? t('btn.saveChanges') : t('btn.addNew')}
        </Button>
      </div>
    </Form>
  )
}
