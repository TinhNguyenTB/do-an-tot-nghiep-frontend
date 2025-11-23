import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Input, Form } from 'antd'

interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  prefix?: React.ReactNode
  size?: 'small' | 'middle' | 'large'
  variant?: 'filled' | 'underlined' | 'borderless' | 'outlined'
  password?: boolean
  rules?: RegisterOptions<T, Path<T>>
  required?: boolean
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  prefix,
  size = 'middle',
  variant = 'outlined',
  password = false,
  rules,
  required = false
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
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
          {password ? (
            <Input.Password
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              prefix={prefix}
              size={size}
              variant={variant}
            />
          ) : (
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              prefix={prefix}
              size={size}
              variant={variant}
            />
          )}
        </Form.Item>
      )}
    />
  )
}
