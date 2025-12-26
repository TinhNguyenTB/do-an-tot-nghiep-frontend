import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import {
  createRole,
  ROLES_QUERY_KEY,
  updateRole,
  useQueryRoleByName,
  useQueryRoles
} from '@/services/role'
import { RoleFormValues } from '@/services/role/type'
import { convertArrayToArrayObject } from '@/utils/convertArrayToArrayObject'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues: RoleFormValues = {
  name: '',
  description: null,
  permissions: [],
  inheritsFrom: []
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
    let outPutInheritsFrom = []
    const { inheritsFrom } = data
    if (inheritsFrom && inheritsFrom?.length > 0) {
      outPutInheritsFrom = convertArrayToArrayObject(inheritsFrom, 'name')
      if (name) {
        // @ts-ignore
        update({ ...data, name, inheritsFrom: outPutInheritsFrom })
        // @ts-ignore
      } else create({ ...data, inheritsFrom: outPutInheritsFrom })
    } else {
      if (name) {
        update({ ...data, name })
      } else create(data)
    }
  })

  const onCancel = () => navigate(MENU_URL.ROLES)
  const { data: roles } = useQueryRoles({ page: 1, size: 20 })

  const { data } = useQueryRoleByName(name as string, { enabled: !!name })

  useEffect(() => {
    if (!data?.data) return

    reset({
      name: data.data.name,
      description: data.data.description,
      permissions: data.data.permissions ?? [],
      //@ts-ignore
      inheritsFrom: data.data.inheritsFrom?.map((p) => p.name) ?? []
    })
  }, [data, reset])

  return [
    { methodForm, name, roleOptions: roles?.data.content, data },
    { onSubmit, onCancel }
  ] as const
}
