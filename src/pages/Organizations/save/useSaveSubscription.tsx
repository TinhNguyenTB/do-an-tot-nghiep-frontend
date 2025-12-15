import { MENU_URL } from '@/constants/menuUrl'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import {
  createSubscription,
  SUBSCRIPTIONS_QUERY_KEY,
  updateSubscription,
  useQuerySubscriptionById
} from '@/services/subscription'
import { SubscriptionFormValues } from '@/services/subscription/type'
import { convertType } from '@/utils/convertType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const defaultValues: SubscriptionFormValues = {
  name: '',
  duration: 30,
  price: '1000',
  userLimit: 1
}

export const useSaveSubscription = () => {
  const { toastSuccess } = useGlobalMessage()
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const methodForm = useForm<SubscriptionFormValues>({ defaultValues })
  const { handleSubmit, reset } = methodForm

  const { mutate: create } = useMutation({
    mutationFn: createSubscription,
    onSuccess(data) {
      toastSuccess(data.message ?? 'Đã tạo gói dịch vụ mới.')
      navigate(MENU_URL.SUBSCRIPTIONS)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY] })
    }
  })

  const { mutate: update } = useMutation({
    mutationFn: updateSubscription,
    onSuccess(data) {
      toastSuccess(data.message ?? 'Đã cập nhật gói dịch vụ')
      navigate(MENU_URL.SUBSCRIPTIONS)
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY] })
    }
  })

  const onSubmit = handleSubmit((data) => {
    const result = convertType(data, defaultValues)
    if (id) {
      update({ ...result, id })
    } else create(result)
  })

  const onCancel = () => navigate(MENU_URL.SUBSCRIPTIONS)

  const { data } = useQuerySubscriptionById(id as string, { enabled: !!id })

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
