import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Input, Form } from 'antd'
import { memo } from 'react'

interface CoreTextAreaProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  variant?: 'filled' | 'underlined' | 'borderless' | 'outlined'

  autoSize?: boolean | { minRows: number; maxRows: number }
  maxLength?: number

  rules?: RegisterOptions<T, Path<T>>
  required?: boolean
}

function CoreTextAreaComponent<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  size = 'middle',
  variant = 'outlined',
  autoSize = { minRows: 3, maxRows: 6 },
  maxLength,
  rules,
  required = false
}: CoreTextAreaProps<T>) {
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
          <Input.TextArea
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            variant={variant}
            autoSize={autoSize}
            maxLength={maxLength}
            onChange={(e) => {
              field.onChange(e.target.value || '')
            }}
          />
        </Form.Item>
      )}
    />
  )
}

export const CoreTextArea = memo(CoreTextAreaComponent) as typeof CoreTextAreaComponent
