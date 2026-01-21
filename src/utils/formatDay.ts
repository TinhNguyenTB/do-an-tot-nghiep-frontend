import dayjs from 'dayjs'

export const formatDay = (value: string) => {
  return dayjs(value).format('DD/MM/YYYY')
}
