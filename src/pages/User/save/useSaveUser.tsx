import { MENU_URL } from '@/constants/menuUrl'
import { UserStatus } from '@/enums'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { useQueryOrganizations } from '@/services/organization'
import { useQueryRoles } from '@/services/role'
import { createUser, updateUser, useQueryUserById, USERS_QUERY_KEY } from '@/services/user'
import { UserFormValues } from '@/services/user/type'
import { useRbacStore } from '@/store/rbacStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues: UserFormValues = {
  name: '',
  email: '',
  organizationId: null,
  status: UserStatus.ACTIVE,
  roles: null
}

export const useSaveUser = () => {
  const { toastSuccess } = useGlobalMessage()
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const organizationId = useRbacStore((state) => state.organizationId)

  const { data: roles } = useQueryRoles({ page: 1, size: 20 })

  const { data: organization } = useQueryOrganizations({ page: 1, size: 20 })

  const methodForm = useForm<UserFormValues>({ defaultValues })
  const { handleSubmit, reset } = methodForm

  const { mutate: create } = useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      toastSuccess(data.message ?? 'Đã tạo người dùng mới')
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
    if (id) {
      update({ ...data, organizationId, id })
    } else create({ ...data, organizationId })
  })

  const onCancel = () => navigate(MENU_URL.USERS)

  const { data } = useQueryUserById(id as string, { enabled: !!id })

  useEffect(() => {
    if (data) {
      reset({ ...data.data })
    }
  }, [reset, data])

  return [
    {
      methodForm,
      id,
      roleOptions: roles?.data.content ?? [],
      organizationOptions: organization?.data.content ?? []
    },
    { onSubmit, onCancel }
  ] as const
}
