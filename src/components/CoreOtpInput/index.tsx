import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Input, Space, Form } from 'antd'
import { useRef } from 'react'

interface CoreOtpInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  length?: number
  rules?: RegisterOptions<T, Path<T>>
  required?: boolean
}

export function CoreOtpInput<T extends FieldValues>({
  name,
  control,
  label,
  length = 6,
  rules,
  required = false
}: CoreOtpInputProps<T>) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const otpValue = field.value || ''.padEnd(length, '')

        const handleChange = (value: string, index: number) => {
          const otpArr = otpValue.split('')
          otpArr[index] = value.slice(-1) // Chỉ lấy 1 ký tự
          const newOtp = otpArr.join('')
          field.onChange(newOtp)

          // Chuyển sang ô tiếp theo
          if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus()
          }
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
          if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
          }
        }

        return (
          <Form.Item
            label={
              required && label ? (
                <span>
                  {label} <span style={{ color: 'red' }}>*</span>
                </span>
              ) : (
                label
              )
            }
            validateStatus={error ? 'error' : ''}
            help={error?.message}
          >
            <Space>
              {Array.from({ length }).map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el?.input || null
                  }}
                  maxLength={1}
                  style={{ width: 40, textAlign: 'center' }}
                  value={otpValue[index] || ''}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </Space>
          </Form.Item>
        )
      }}
    />
  )
}
