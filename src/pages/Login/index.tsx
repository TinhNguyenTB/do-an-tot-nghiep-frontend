import { CoreInput } from '@/components/CoreInput'
import { Button, Form } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useLogin } from '@/pages/Login/useLogin'
import { TRANSLATION } from '@/constants/translates'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function LoginPage() {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useLogin()
  const { control } = values
  const { onSubmit } = handles

  return (
    <main
      className='flex items-center justify-center h-screen px-4 overflow-auto bg-cover bg-center'
      style={{ backgroundImage: "url('/images/bgLogin.jpg')" }}
    >
      <div className='flex flex-col w-full max-w-md bg-white opacity-80 p-6 rounded-xl shadow-md'>
        <div className='flex justify-end'>
          <LanguageSwitcher />
        </div>
        <Form layout='vertical' onFinish={onSubmit}>
          <CoreInput
            control={control}
            name='email'
            label={t('auth:login.email')}
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
            label={t('auth:login.password')}
            password
            size='large'
            required
            rules={{ required: t('validation.required') }}
            prefix={<LockOutlined />}
          />
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('btn.login')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  )
}
