import { CoreInput } from '@/components/CoreInput'
import { TRANSLATION } from '@/constants/translates'
import { useChangePassword } from '@/pages/ChangePassword/useChangePassword'
import { Button, Form } from 'antd'
import { useTranslation } from 'react-i18next'

export const ChangePasswordPage = () => {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useChangePassword()
  const { control } = values
  const { onSubmit } = handles

  return (
    <main className='flex flex-col max-w-md mx-auto'>
      <Form layout='vertical' onFinish={onSubmit}>
        <CoreInput
          control={control}
          name='oldPassword'
          label={'Mật khẩu cũ'}
          required
          size='large'
          password
          rules={{
            required: t('validation.required')
          }}
        />
        <CoreInput
          control={control}
          name='newPassword'
          label={'Mật khẩu mới'}
          password
          size='large'
          required
          rules={{ required: t('validation.required') }}
        />
        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </main>
  )
}
