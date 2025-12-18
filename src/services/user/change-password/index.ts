import axiosInstance from '@/libs/axiosInstance'
import { BaseResponse } from '@/services/types'
import { ChangePasswordFormValues } from '@/services/user/change-password/type'

export const handleChangePassword = async (body: ChangePasswordFormValues) => {
  const { data } = await axiosInstance<BaseResponse<{ userId: number }>>({
    url: `/api/users/change-password`,
    method: 'POST',
    data: body
  })
  return data
}
