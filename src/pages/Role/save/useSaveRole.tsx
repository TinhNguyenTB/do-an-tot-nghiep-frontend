import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { createRole, ROLES_QUERY_KEY, updateRole, useQueryRoleByName } from '@/services/role'
import { RoleFormValues } from '@/services/role/type'
import { useRbacStore } from '@/store/rbacStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues: RoleFormValues = {
  name: '',
  description: null,
  permissions: [],
  inheritsFrom: undefined,
  organizationId: null
}

export const useSaveRole = () => {
  const { toastSuccess } = useGlobalMessage()
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const organizationId = useRbacStore((state) => state.organizationId)

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
    if (id) {
      update({ ...data, organizationId, id })
    } else create({ ...data, organizationId })
  })

  const onCancel = () => navigate(MENU_URL.ROLES)

  const { data } = useQueryRoleByName(id as string, { enabled: !!id })

  useEffect(() => {
    if (!data?.data) return

    reset({
      ...data.data
    })
  }, [data, reset])

  return [
    { methodForm, id },
    { onSubmit, onCancel }
  ] as const
}
