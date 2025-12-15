import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Form, Switch } from 'antd'
import { memo } from 'react'

interface CoreSwitchProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  disabled?: boolean
  required?: boolean
  rules?: RegisterOptions<T, Path<T>>
}

function CoreSwitchComponent<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  required = false,
  rules
}: CoreSwitchProps<T>) {
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
          <Switch
            checked={field.value}
            onChange={(val) => field.onChange(val)}
            disabled={disabled}
          />
        </Form.Item>
      )}
    />
  )
}

export const CoreSwitch = memo(CoreSwitchComponent) as typeof CoreSwitchComponent
