import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import {
  createPermission,
  PERMISSIONS_QUERY_KEY,
  updatePermission,
  useQueryPermissionById
} from '@/services/permission'
import { PermissionFormValues } from '@/services/permission/type'
import { useRbacStore } from '@/store/rbacStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues: PermissionFormValues = {
  name: '',
  description: '',
  organizationId: null
}

export const useSavePermission = () => {
  const { toastSuccess } = useGlobalMessage()
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const organizationId = useRbacStore((state) => state.organizationId)

  const methodForm = useForm<PermissionFormValues>({ defaultValues })
  const { handleSubmit, reset } = methodForm

  const { mutate: create } = useMutation({
    mutationFn: createPermission,
    onSuccess(data) {
      toastSuccess(data.message ?? 'Success')
      navigate(MENU_URL.PERMISSIONS)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [PERMISSIONS_QUERY_KEY] })
    }
  })

  const { mutate: update } = useMutation({
    mutationFn: updatePermission,
    onSuccess(data) {
      toastSuccess(data.message ?? 'Success')
      navigate(MENU_URL.PERMISSIONS)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [PERMISSIONS_QUERY_KEY] })
    }
  })

  const onSubmit = handleSubmit((data) => {
    if (id) {
      update({
        ...data,
        organizationId,
        id
      })
    } else create({ ...data, organizationId })
  })

  const onCancel = () => navigate(MENU_URL.PERMISSIONS)

  const { data } = useQueryPermissionById(id as string, { enabled: !!id })

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
