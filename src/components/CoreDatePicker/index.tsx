import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { DatePicker, Form } from 'antd'
import { memo } from 'react'
import type { DatePickerProps } from 'antd'
import dayjs from 'dayjs'

interface CoreDatePickerProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
  format?: string
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  rules?: RegisterOptions<T, Path<T>>
  required?: boolean
  disabledDate?: DatePickerProps['disabledDate']
  showTime?: boolean
}

function CoreDatePickerComponent<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  picker = 'date',
  format = 'DD/MM/YYYY',
  disabled = false,
  size = 'middle',
  rules,
  required = false,
  disabledDate,
  showTime = false
}: CoreDatePickerProps<T>) {
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
          <DatePicker
            value={field.value ? dayjs(field.value, format) : null}
            onChange={(_, dateString) => {
              field.onChange(dateString || null)
            }}
            placeholder={placeholder}
            picker={picker}
            format={format}
            disabled={disabled}
            size={size}
            disabledDate={disabledDate}
            showTime={showTime}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}
    />
  )
}

export const CoreDatePicker = memo(CoreDatePickerComponent) as typeof CoreDatePickerComponent
