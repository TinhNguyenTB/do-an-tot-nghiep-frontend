import axiosInstance from '@/libs/axiosInstance'
import { ProfileFormValues, UserProfile } from '@/services/auth/profile/type'
import { BaseResponse, QueryParams } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export const PROFILE_QUERY_KEY = '/api/auth/profile'

export const getMyProfile = async () => {
  const { data } = await axiosInstance<BaseResponse<UserProfile>>({
    method: 'GET',
    url: PROFILE_QUERY_KEY
  })
  return data
}

export const useQueryProfile = () => {
  return useQuery<BaseResponse<UserProfile>>({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: () => getMyProfile()
  })
}

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await axiosInstance.postForm<BaseResponse<{ avatar: string }>>(
    `/api/auth/upload-avatar`,
    formData
  )

  return data
}

export const updateProfile = async (body: ProfileFormValues) => {
  const { data } = await axiosInstance.patch(PROFILE_QUERY_KEY, body)
  return data
}
