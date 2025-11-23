import { Control, Controller, Path, RegisterOptions, useFormState } from 'react-hook-form'
import { Select, Form } from 'antd'
import { get } from 'lodash'

interface Props<TOption extends Record<string, any>, TFormValues extends Record<string, any>> {
  name: Path<TFormValues>
  control: Control<TFormValues>
  options: TOption[]
  label?: string
  placeholder?: string
  labelPath?: Path<TOption>
  valuePath?: Path<TOption>
  required?: boolean
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>
  disabled?: boolean
}

export function CoreSelect<
  TOption extends Record<string, any>,
  TFormValues extends Record<string, any>
>({
  name,
  label,
  control,
  options,
  placeholder,
  labelPath = 'name' as Path<TOption>,
  valuePath = 'id' as Path<TOption>,
  required = false,
  rules = {},
  disabled = false
}: Props<TOption, TFormValues>) {
  const mappedOptions = options.map((item) => ({
    label: get(item, labelPath),
    value: get(item, valuePath)
  }))
  const { errors } = useFormState({ control })
  const errorMessage = get(errors, name)?.message

  return (
    <Form.Item
      label={label}
      required={required}
      validateStatus={get(errors, name) ? 'error' : ''}
      help={typeof errorMessage === 'string' ? errorMessage : undefined}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            options={mappedOptions}
            placeholder={placeholder}
            disabled={disabled}
            showSearch
            value={mappedOptions.some((opt) => opt.value === field.value) ? field.value : undefined}
            onChange={(value) => field.onChange(value || undefined)}
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
          />
        )}
      />
    </Form.Item>
  )
}
