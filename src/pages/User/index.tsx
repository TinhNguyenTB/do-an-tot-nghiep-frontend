import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DateTable } from '@/components/Organisms/DataTable'
import type { ColumnsType } from 'antd/es/table'
import { Button, Popconfirm } from 'antd'
import { FormInput } from '@/components/Atoms/FormInput'
import { SearchOutlined } from '@ant-design/icons'
import { FormOtpInput } from '@/components/Atoms/FormOtpInput'
import { FormSelect } from '@/components/Atoms/FormSelect'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  page?: number
  size?: number
  otp?: string
}

export default function UserPage() {
  const { control, handleSubmit, getValues } = useForm<User>({
    defaultValues: {}
  })

  const [submittedFilters, setSubmittedFilters] = useState<Partial<User>>({})

  const onSubmit = (data: User) => {
    console.log('Filters submitted:', data)
    const currentValues = getValues()
    setSubmittedFilters(currentValues)
  }

  const handleEdit = (user: User) => {
    console.log('Edit:', user)
  }

  const handleDelete = (id: number) => {
    console.log('Delete user id:', id)
  }

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: true,
      filterIcon(filtered) {
        return <SearchOutlined style={{ color: filtered ? 'blue' : undefined }} />
      },
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <FormInput
            name='firstName'
            control={control}
            placeholder='Search first name'
            prefix={<SearchOutlined />}
            rules={{ required: 'First name is required' }}
          />
          <Button type='primary' size='small' onClick={() => handleSubmit(onSubmit)()}>
            Apply
          </Button>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <FormOtpInput
            name='otp'
            control={control}
            label='Enter OTP'
            required
            rules={{
              required: 'OTP is required',
              minLength: { value: 6, message: 'OTP must be 6 digits' },
              pattern: { value: /^[0-9]+$/, message: 'OTP must be numeric' }
            }}
          />
          <Button type='primary' size='small' onClick={() => handleSubmit(onSubmit)()}>
            Apply
          </Button>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filterDropdown: () => (
        <FormSelect
          name='email'
          // label='Người dùng'
          control={control}
          options={[
            { id: 1, profile: { name: 'Nguyễn Văn A' } },
            { id: 2, profile: { name: 'Trần Thị B' } }
          ]}
          labelPath='profile.name'
          valuePath='id'
          required
          rules={{ required: 'hihi' }}
          placeholder='Chọn người dùng'
        />
      )
    }
  ]

  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-xl font-bold'>User Table</h1>
      <DateTable<User>
        columns={columns}
        endpoint='/users'
        filters={submittedFilters}
        showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} users`}
        rowActions={(record) => (
          <>
            <Button type='link' onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Popconfirm title='Are you sure?' onConfirm={() => handleDelete(record.id)}>
              <Button type='link' danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      />
    </div>
  )
}
