import { CoreInput } from '@/components/CoreInput'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { TRANSLATION } from '@/constants/translates'
import { useLogin } from '@/pages/Login/useLogin'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function LoginPage() {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useLogin()
  const { control, MENU_URL } = values
  const { onSubmit, onRePayment } = handles

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
        <span className='text-sm flex items-center gap-2 justify-center'>
          Chưa có tài khoản?
          <Link className='text-blue-500' to={MENU_URL.REGISTER}>
            Đăng ký
          </Link>
        </span>
        <span className='text-sm flex items-center justify-center gap-2'>
          Tài khoản chưa kích hoạt?
          <Button type='link' style={{ padding: 0 }} onClick={onRePayment}>
            Kích hoạt ngay
          </Button>
        </span>
      </div>
    </main>
  )
}
