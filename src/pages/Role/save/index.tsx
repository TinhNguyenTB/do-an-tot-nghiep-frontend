import { CoreInput } from '@/components/CoreInput'
import { TRANSLATION } from '@/constants/translates'
import { useSaveSubscription } from '@/pages/Subscription/save/useSaveSubscription'
import { Button, Col, Form, Row } from 'antd'
import { useTranslation } from 'react-i18next'

export const SaveRolePage = () => {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useSaveSubscription()
  const { methodForm, id } = values
  const { onSubmit, onCancel } = handles
  const { control } = methodForm

  return (
    <Form layout='vertical' onFinish={onSubmit}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} md={12} lg={6}>
          <CoreInput
            control={control}
            name='name'
            label='Tên gói dịch vụ'
            required
            rules={{ required: t('validation.required') }}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <CoreInput
            control={control}
            name='price'
            label='Giá'
            type='number'
            required
            rules={{ required: t('validation.required') }}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <CoreInput
            control={control}
            name='duration'
            label='Số ngày sử dụng'
            type='number'
            required
            rules={{ required: t('validation.required') }}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <CoreInput
            control={control}
            name='userLimit'
            label='Giới hạn người dùng'
            type='number'
            required
            rules={{ required: t('validation.required') }}
          />
        </Col>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Button danger onClick={onCancel}>
            {t('btn.cancel')}
          </Button>
          <Button type='primary' htmlType='submit'>
            {id ? t('btn.saveChanges') : t('btn.addNew')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
