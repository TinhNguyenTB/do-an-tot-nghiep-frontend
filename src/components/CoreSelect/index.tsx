import { Control, Controller, Path, RegisterOptions, useFormState } from 'react-hook-form'
import { Select, Form, SelectProps } from 'antd'
import { get } from 'lodash'
import { memo } from 'react'

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
  mode?: SelectProps['mode']
}

function CoreSelectComponent<
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
  disabled = false,
  mode
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
            mode={mode}
            options={mappedOptions}
            placeholder={placeholder}
            disabled={disabled}
            showSearch
            // value={mappedOptions.some((opt) => opt.value === field.value) ? field.value : undefined}
            // onChange={(value) => field.onChange(value || undefined)}
            value={
              mode === 'multiple' || mode === 'tags'
                ? Array.isArray(field.value)
                  ? field.value
                  : []
                : field.value
            }
            // THAY ĐỔI 3: Điều chỉnh onChange để xử lý giá trị khi chọn nhiều
            // Khi mode='multiple', value luôn là mảng (hoặc []).
            // field.onChange xử lý mảng này trực tiếp.
            onChange={(value) => {
              if (mode === 'multiple' || mode === 'tags') {
                // Nếu chọn nhiều, Ant Design Select trả về mảng (hoặc [] nếu clear hết)
                field.onChange(value)
              } else {
                // Nếu chọn đơn, giá trị có thể là undefined khi clear
                field.onChange(value || undefined)
              }
            }}
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
          />
        )}
      />
    </Form.Item>
  )
}

export const CoreSelect = memo(CoreSelectComponent) as typeof CoreSelectComponent
