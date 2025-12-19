import axiosInstance from '@/libs/axiosInstance'
import { BaseResponse } from '@/services/types'
import { ChangePasswordFormValues } from '@/services/auth/change-password/type'

export const handleChangePassword = async (body: ChangePasswordFormValues) => {
  const { data } = await axiosInstance<BaseResponse<{ userId: number }>>({
    url: `/api/auth/change-password`,
    method: 'PATCH',
    data: body
  })
  return data
}
