import { useQueryRevenue } from '@/services/analytic/revenue'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface IRevenueFilters {
  year: string
}

const defaultFilters: IRevenueFilters = {
  year: new Date().getFullYear().toString()
}

export const useAnalytic = () => {
  const methodForm = useForm<IRevenueFilters>({ defaultValues: defaultFilters })
  const { data, refetch } = useQueryRevenue(methodForm.getValues())
  const year = methodForm.watch('year')

  useEffect(() => {
    refetch()
  }, [year])

  return [{ methodForm, dataRevenue: data?.data }, {}] as const
}
