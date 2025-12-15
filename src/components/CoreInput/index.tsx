import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Input, Form } from 'antd'
import { memo } from 'react'

interface CoreInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  type?: 'text' | 'number'
  disabled?: boolean
  prefix?: React.ReactNode
  size?: 'small' | 'middle' | 'large'
  variant?: 'filled' | 'underlined' | 'borderless' | 'outlined'
  password?: boolean
  rules?: RegisterOptions<T, Path<T>>
  required?: boolean
}

function CoreInputComponent<T extends FieldValues>({
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
}: CoreInputProps<T>) {
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

export const CoreInput = memo(CoreInputComponent) as typeof CoreInputComponent
