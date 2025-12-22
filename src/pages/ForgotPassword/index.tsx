import { CoreInput } from '@/components/CoreInput'
import { CoreOtpInput } from '@/components/CoreOtpInput'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { TRANSLATION } from '@/constants/translates'
import { useForgotPassword } from '@/pages/ForgotPassword/useForgotPassword'
import { formatCountdown } from '@/utils/formatCountdown'
import { ArrowLeftOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function ForgotPasswordPage() {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useForgotPassword()
  const { control, loadingSendOTP, MENU_URL, countdown } = values
  const { onSubmit, onSendOTP, getValues } = handles

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
            label={t('auth:resetPassword.email')}
            required
            size='large'
            rules={{
              required: t('validation.required'),
              pattern: { value: /^\S+@\S+$/, message: t('validation.email') }
            }}
            prefix={<MailOutlined />}
          />
          <div className='text-right mb-4'>
            <span
              className={`cursor-pointer ${
                loadingSendOTP || countdown > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-500'
              }`}
              onClick={() => {
                if (countdown === 0 && !loadingSendOTP) {
                  onSendOTP(getValues('email'))
                }
              }}
            >
              {countdown > 0 ? `Gửi lại sau ${formatCountdown(countdown)}` : 'Gửi OTP'}
            </span>
          </div>
          <CoreOtpInput
            control={control}
            name='otp'
            label={t('auth:resetPassword.otp')}
            required
            rules={{
              required: t('validation.required')
            }}
          />
          <CoreInput
            control={control}
            name='newPassword'
            label={t('auth:resetPassword.newPassword')}
            password
            size='large'
            required
            rules={{ required: t('validation.required') }}
            prefix={<LockOutlined />}
          />

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('btn.confirm')}
            </Button>
          </Form.Item>
          <span className='text-sm flex items-center gap-2 justify-center'>
            <ArrowLeftOutlined style={{ color: 'blue' }} />
            <Link className='text-blue-500' to={MENU_URL.LOGIN}>
              {t('btn.login')}
            </Link>
          </span>
        </Form>
      </div>
    </main>
  )
}
