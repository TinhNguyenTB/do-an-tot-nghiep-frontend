import { MENU_URL } from '@/constants/menuUrl'
import { roles } from '@/constants/rbac'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { createUser, updateUser, useQueryUserById, USERS_QUERY_KEY } from '@/services/user'
import { UserFormValues } from '@/services/user/type'
import { convertType } from '@/utils/convertType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues: UserFormValues = {
  name: '',
  email: '',
  organizationId: null,
  roles: [roles.CLIENT.toLocaleUpperCase()]
}

export const useSaveUser = () => {
  const { toastSuccess } = useGlobalMessage()
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const methodForm = useForm<UserFormValues>({ defaultValues })
  const { handleSubmit, reset } = methodForm

  const { mutate: create } = useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      toastSuccess(data.message ?? 'Đã tạo người dùng mới.')
      navigate(MENU_URL.USERS)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
    }
  })

  const { mutate: update } = useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      toastSuccess(data.message ?? 'Đã cập nhật người dùng')
      navigate(MENU_URL.USERS)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
    }
  })

  const onSubmit = handleSubmit((data) => {
    const result = convertType(data, defaultValues)
    if (id) {
      update({ ...result, id })
    } else create(result)
    console.log(data)
  })

  const onCancel = () => navigate(MENU_URL.SUBSCRIPTIONS)

  const { data } = useQueryUserById(id as string, { enabled: !!id })

  useEffect(() => {
    if (data) {
      reset({ ...data.data })
    }
  }, [reset, data])

  return [
    { methodForm, id },
    { onSubmit, onCancel }
  ] as const
}
