import { RegisterForm } from '@/pages/Register/RegisterForm'
import { SubscriptionPlan } from '@/pages/Register/SubscriptionPlan'
import { useRegister } from '@/pages/Register/useRegister'
import { Button, Steps, Typography } from 'antd'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'

export const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [values, handles] = useRegister()
  const { methodForm } = values
  const { validateFields, onSubmit } = handles

  const steps = [
    {
      title: 'Nhập thông tin',
      content: <RegisterForm />
    },
    {
      title: 'Chọn gói dịch vụ',
      content: <SubscriptionPlan />
    }
  ]
  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const handleNextStep = async () => {
    // Chỉ validate khi ở bước 1
    if (currentStep === 0) {
      const isStepValid = await validateFields() // Lấy kết quả validation (true/false)

      if (!isStepValid) {
        // KHÔNG HỢP LỆ: Dừng lại và không chuyển bước
        return
      }
    }

    // HỢP LỆ hoặc đã qua bước validation: Chuyển sang bước tiếp theo
    setCurrentStep(currentStep + 1)
  }

  return (
    <main className='p-10'>
      <Typography.Title level={2} className='text-center'>
        Đăng ký tài khoản
      </Typography.Title>
      <Steps current={currentStep} items={items} />

      <FormProvider {...methodForm}>
        {/* Hiển thị Nội dung Step hiện tại */}
        <div className='p-6 mt-5'>{steps[currentStep].content}</div>
      </FormProvider>
      <div className='flex justify-center gap-4'>
        {currentStep < steps.length - 1 && (
          <Button type='primary' onClick={handleNextStep}>
            Chuyển sang bước 2
          </Button>
        )}

        {currentStep > 0 && (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>Quay lại bước 1</Button>
        )}

        {/* NÚT SUBMIT Ở BƯỚC  2 */}
        {currentStep === steps.length - 1 && (
          <Button type='primary' onClick={onSubmit}>
            Hoàn tất Đăng ký
          </Button>
        )}
      </div>
    </main>
  )
}
