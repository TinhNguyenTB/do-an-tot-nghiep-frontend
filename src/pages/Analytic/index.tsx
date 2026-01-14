import { CoreDatePicker } from '@/components/CoreDatePicker'
import { useAnalytic } from '@/pages/Analytic/useAnalytic'
import { Revenue } from '@/services/analytic/revenue/type'
import { Typography } from 'antd'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const RevenueBarChart = ({ data }: { data: Revenue[] }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' tickFormatter={(value) => `Tháng ${value}`} />
          <YAxis
            label={{ value: 'Doanh thu (VND)', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} // Tô màu nền khi hover
            formatter={(value) => [`${value?.toLocaleString()} VND`, 'Doanh thu']}
          />
          <Legend />
          {/* Thanh biểu diễn Doanh thu */}
          <Bar dataKey='totalRevenue' fill='rgb(22,104,220)' name='Doanh thu' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const AnalyticPage = () => {
  const [values, handles] = useAnalytic()
  const { methodForm, dataRevenue } = values
  const { control } = methodForm

  return (
    <form>
      <Typography.Title level={4}>Doanh thu năm</Typography.Title>
      <div className='w-1/12'>
        <CoreDatePicker control={control} name='year' picker='year' format='YYYY' />
      </div>
      <RevenueBarChart data={dataRevenue || []} />
    </form>
  )
}
