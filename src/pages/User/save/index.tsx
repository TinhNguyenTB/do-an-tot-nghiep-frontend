import { CoreInput } from '@/components/CoreInput'
import { CoreSelect } from '@/components/CoreSelect'
import { TRANSLATION } from '@/constants/translates'
import { useSaveUser } from '@/pages/User/save/useSaveUser'
import { Button, Col, Form, Row } from 'antd'
import { useTranslation } from 'react-i18next'

export const SaveUserPage = () => {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useSaveUser()
  const { methodForm, id, roleOptions, organizationOptions } = values
  const { onSubmit, onCancel } = handles
  const { control } = methodForm

  return (
    <Form layout='vertical' onFinish={onSubmit}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} md={12} lg={6}>
          <CoreInput
            control={control}
            name='name'
            label='Tên'
            required
            rules={{ required: t('validation.required') }}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <CoreInput
            control={control}
            name='email'
            label='Email'
            required
            rules={{
              required: t('validation.required'),
              pattern: { value: /^\S+@\S+$/, message: t('validation.email') }
            }}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <CoreSelect
            control={control}
            name='organizationId'
            label='Tổ chức'
            options={organizationOptions}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <CoreSelect
            control={control}
            name='roles'
            label='Vai trò'
            required
            mode='multiple'
            labelPath='label'
            valuePath='name'
            options={roleOptions || []}
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
