import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { createRole, ROLES_QUERY_KEY, updateRole, useQueryRoleByName } from '@/services/role'
import { RoleFormValues } from '@/services/role/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues: RoleFormValues = {
  name: '',
  description: null,
  permissions: []
}

export const useSaveRole = () => {
  const { toastSuccess } = useGlobalMessage()
  const { name } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const methodForm = useForm<RoleFormValues>({ defaultValues })
  const { handleSubmit, reset } = methodForm

  const { mutate: create } = useMutation({
    mutationFn: createRole,
    onSuccess(res) {
      toastSuccess(res.message ?? 'Thành công')
      navigate(MENU_URL.ROLES)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] })
    }
  })

  const { mutate: update } = useMutation({
    mutationFn: updateRole,
    onSuccess(res) {
      toastSuccess(res.message ?? 'Thành công')
      navigate(MENU_URL.ROLES)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [ROLES_QUERY_KEY] })
    }
  })

  const onSubmit = handleSubmit((data) => {
    if (name) {
      update({ ...data, name })
    } else create(data)
  })

  const onCancel = () => navigate(MENU_URL.ROLES)

  const { data } = useQueryRoleByName(name as string, { enabled: !!name })

  useEffect(() => {
    if (data) {
      reset({ ...data.data })
    }
  }, [reset, data])

  return [
    { methodForm, name, data },
    { onSubmit, onCancel }
  ] as const
}
