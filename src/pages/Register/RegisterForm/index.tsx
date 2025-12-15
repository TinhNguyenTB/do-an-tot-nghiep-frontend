import { CoreInput } from '@/components/CoreInput'
import { Form } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { TRANSLATION } from '@/constants/translates'
import { useRegisterForm } from '@/pages/Register/RegisterForm/useRegisterForm'
import { CoreCheckbox } from '@/components/CoreCheckbox'

export function RegisterForm() {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values] = useRegisterForm()
  const { control, isOrganization } = values

  return (
    <main className='flex items-center justify-center'>
      <Form layout='vertical' className='w-1/3'>
        <CoreInput
          control={control}
          name='name'
          label={'Tên'}
          required
          size='large'
          rules={{
            required: t('validation.required')
          }}
          prefix={<UserOutlined />}
        />
        <CoreInput
          control={control}
          name='email'
          label={'Email'}
          required
          size='large'
          rules={{
            required: t('validation.required'),
            pattern: { value: /^\S+@\S+$/, message: t('validation.email') }
          }}
          prefix={<MailOutlined />}
        />
        <CoreInput
          control={control}
          name='password'
          label={'Mật khẩu'}
          password
          size='large'
          required
          rules={{ required: t('validation.required') }}
          prefix={<LockOutlined />}
        />
        <CoreCheckbox control={control} name='isOrganization' label='Là tổ chức' />
        {isOrganization && (
          <CoreInput
            control={control}
            name='organizationName'
            label={'Tên tổ chức'}
            required
            size='large'
            rules={{
              required: t('validation.required')
            }}
          />
        )}
      </Form>
    </main>
  )
}
