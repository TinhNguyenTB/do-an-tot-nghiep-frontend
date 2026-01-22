import { CoreInput } from '@/components/CoreInput'
import { Form } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { TRANSLATION } from '@/constants/translates'
import { useRegisterForm } from '@/pages/Register/RegisterForm/useRegisterForm'
import { CoreOtpInput } from '@/components/CoreOtpInput'
import { formatCountdown } from '@/utils/formatCountdown'

export function RegisterForm() {
  const { t } = useTranslation(TRANSLATION.COMMON)
  const [values, handles] = useRegisterForm()
  const { control, loadingSendOTP, countdown } = values
  const { onSendOTP, getValues } = handles

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
        <div className='text-right mb-4'>
          <span
            className={`cursor-pointer ${
              loadingSendOTP || countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500'
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
          name='password'
          label={'Mật khẩu'}
          password
          size='large'
          required
          rules={{ required: t('validation.required') }}
          prefix={<LockOutlined />}
        />

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
        <CoreInput
          control={control}
          name='organizationPhoneNumber'
          label={'Số điện thoại'}
          required
          size='large'
          rules={{
            required: t('validation.required')
          }}
        />
      </Form>
    </main>
  )
}
