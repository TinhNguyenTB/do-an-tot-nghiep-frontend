import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  PROFILE_QUERY_KEY,
  updateProfile,
  uploadAvatar,
  useQueryProfile
} from '@/services/auth/profile'
import { useEffect } from 'react'
import { ProfileFormValues } from '@/services/auth/profile/type'
import { useForm } from 'react-hook-form'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { useRbacStore } from '@/store/rbacStore'

export const useProfile = () => {
  const queryClient = useQueryClient()
  const { toastSuccess } = useGlobalMessage()
  const { control, handleSubmit, reset } = useForm<ProfileFormValues>()
  const { data, isLoading } = useQueryProfile()

  useEffect(() => {
    if (data?.data) {
      reset({ name: data.data.name })
    }
  }, [data, reset])

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      toastSuccess(res.message ?? 'Cập nhật thành công')
      useRbacStore.getState().updateProfile({ name: res.data.name })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] })
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (res) => {
      toastSuccess(res.message ?? 'Đổi avatar thành công')
      useRbacStore.getState().updateProfile({ avatar: res.data.avatar })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] })
  })

  const onSubmit = handleSubmit((data) => {
    updateProfileMutation.mutate(data)
  })

  const handleUploadAvatar = (file: File) => {
    uploadAvatarMutation.mutate(file)
    return false // chặn upload mặc định của antd
  }

  return [
    { control, isLoading, uploadAvatarMutation, data, updateProfileMutation },
    { onSubmit, handleUploadAvatar }
  ] as const
}
