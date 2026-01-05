import { Control, Controller, Path, RegisterOptions, useFormState } from 'react-hook-form'
import { Select, Form, SelectProps } from 'antd'
import { get } from 'lodash'
import { memo, useMemo } from 'react'

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
  onChangeValue?: (value: any, option: any) => void
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
  mode,
  onChangeValue
}: Props<TOption, TFormValues>) {
  const mappedOptions = useMemo(
    () =>
      options.map((item) => ({
        label: get(item, labelPath),
        value: get(item, valuePath)
      })),
    [options, labelPath, valuePath]
  )

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
            value={
              mode === 'multiple' || mode === 'tags'
                ? Array.isArray(field.value)
                  ? field.value
                  : []
                : field.value
            }
            onChange={(value, option) => {
              let nextValue: any

              if (mode === 'multiple' || mode === 'tags') {
                nextValue = Array.isArray(value) ? value : []
              } else {
                nextValue = value || undefined
              }

              field.onChange(nextValue)

              if (onChangeValue) {
                onChangeValue(nextValue, option)
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
