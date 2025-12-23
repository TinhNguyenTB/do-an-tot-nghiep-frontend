import { CoreInput } from '@/components/CoreInput'
import { TRANSLATION } from '@/constants/translates'
import { PermissionSplitter } from '@/pages/Role/PermissionSplitter'
import { useSaveRole } from '@/pages/Role/save/useSaveRole'
import { Button, Col, Form, Row } from 'antd'
import { useTranslation } from 'react-i18next'

export const SaveRolePage = () => {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useSaveRole()
  const { methodForm, name, data } = values
  const { onSubmit, onCancel } = handles
  const { control, setValue } = methodForm

  return (
    <Form layout='vertical' onFinish={onSubmit}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} md={12}>
          <CoreInput
            control={control}
            name='name'
            label='Tên vai trò'
            required
            rules={{ required: t('validation.required') }}
          />
        </Col>
        <Col xs={24} md={12}>
          <CoreInput control={control} name='description' label='Mô tả' />
        </Col>
        <Col xs={24}>
          <PermissionSplitter
            value={data?.data.permissions || []} // optional khi edit
            onChange={(permissions) => {
              setValue('permissions', permissions, { shouldDirty: true })
            }}
          />
        </Col>
        <Col
          xs={24}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem' }}
        >
          <Button danger onClick={onCancel}>
            {t('btn.cancel')}
          </Button>
          <Button type='primary' htmlType='submit'>
            {name ? t('btn.saveChanges') : t('btn.addNew')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
