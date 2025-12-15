import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Form, Checkbox } from 'antd'

interface CoreCheckboxProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  required?: boolean
  rules?: RegisterOptions<T, Path<T>>
}

export function CoreCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  required = false,
  rules
}: CoreCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          valuePropName='checked'
          validateStatus={error ? 'error' : ''}
          help={error?.message}
        >
          <Checkbox
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            disabled={disabled}
          >
            {required && label ? (
              <span>
                {label} <span style={{ color: 'red' }}>*</span>
              </span>
            ) : (
              label
            )}
          </Checkbox>
        </Form.Item>
      )}
    />
  )
}
