import { Avatar, Button, Col, Form, Input, Row, Spin, Typography, Upload } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { useProfile } from '@/pages/Profile/useProfile'
import { CoreInput } from '@/components/CoreInput'
import { TRANSLATION } from '@/constants/translates'
import { useTranslation } from 'react-i18next'

export const ProfilePage = () => {
  const [values, handles] = useProfile()
  const { t } = useTranslation(TRANSLATION.COMMON)
  const { control, isLoading, uploadAvatarMutation, data, updateProfileMutation } = values
  const { handleUploadAvatar, onSubmit } = handles

  if (isLoading) {
    return (
      <div className='flex justify-center mt-20'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <main className='mx-auto'>
      <Typography.Title level={3}>Hồ sơ cá nhân</Typography.Title>

      <div className='p-6 flex gap-8'>
        {/* AVATAR */}
        <div className='flex flex-col items-center gap-2'>
          <Avatar size={120} src={data?.data.avatar} icon={<UserOutlined />} />
          <Upload showUploadList={false} beforeUpload={handleUploadAvatar} accept='image/*'>
            <Button
              className='mt-3'
              icon={<UploadOutlined />}
              loading={uploadAvatarMutation.isPending}
            >
              Đổi ảnh
            </Button>
          </Upload>
        </div>

        {/* INFO */}
        <Form onFinish={onSubmit} layout='vertical'>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} md={12}>
              <CoreInput
                control={control}
                name='name'
                label='Tên'
                required
                rules={{ required: t('validation.required') }}
              />
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label='Email'>
                <Input value={data?.data.email} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label='Vai trò'>
                <Input value={data?.data.roles.join(', ')} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label='Tổ chức'>
                <Input value={data?.data.organization?.name ?? ''} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Button type='primary' htmlType='submit' loading={updateProfileMutation.isPending}>
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  )
}
