import { CoreInput } from '@/components/CoreInput'
import logoUrl from '@/assets/logo.png'
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
    <main className='min-h-screen flex p-10 bg-slate-100'>
      {/* LEFT */}
      <div className='hidden lg:flex w-2/5 items-center justify-end'>
        <div className='text-center space-y-6'>
          <img src={logoUrl} alt='logo' className='mx-auto' style={{ width: 120 }} />
          <p className='text-2xl font-semibold'>Hệ thống quản lý tài khoản</p>
        </div>
      </div>

      {/* RIGHT - LOGIN FORM */}
      <div className='flex w-full lg:w-3/5 items-center justify-center lg:bg-transparent'>
        <div className='w-full max-w-xl bg-white p-6 rounded-md shadow-lg'>
          <h2 className='text-xl font-semibold mb-6'>{t('btn.login')}</h2>

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

            <div className='flex justify-between text-sm mb-4'>
              <Link to={MENU_URL.FORGOT_PASSWORD} className='text-blue-500 hover:underline'>
                {t('auth:login.forgotPassword')}
              </Link>
            </div>

            <Form.Item>
              <Button type='primary' htmlType='submit' block size='large'>
                {t('btn.login')}
              </Button>
            </Form.Item>
          </Form>

          <div className='text-center text-sm mt-4'>
            Chưa có tài khoản?{' '}
            <Link className='text-blue-500' to={MENU_URL.REGISTER}>
              Đăng ký
            </Link>
          </div>

          <div className='text-center text-sm mt-2'>
            Tài khoản chưa kích hoạt?
            <Button type='link' onClick={onRePayment} style={{ padding: 0 }}>
              Kích hoạt ngay
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
