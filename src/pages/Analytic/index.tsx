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

const RevenueBarChart = ({ data }: { data: typeof monthlyRevenueData }) => {
  return (
    <form>
      <div style={{ width: '100%', height: 400 }}>
        <h2>Doanh thu năm 2025</h2>

        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
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
    </form>
  )
}

// Định dạng đầu vào từ hàm getMonthlyRevenueStatistics:
// [ { month: 1, totalRevenue: 12000 }, { month: 2, totalRevenue: 19000 }, ... ]

const monthlyRevenueData = [
  { month: 1, name: 'Tháng 1', totalRevenue: 12000 },
  { month: 2, name: 'Tháng 2', totalRevenue: 19000 },
  { month: 3, name: 'Tháng 3', totalRevenue: 15500 },
  { month: 4, name: 'Tháng 4', totalRevenue: 22000 },
  { month: 5, name: 'Tháng 5', totalRevenue: 28000 },
  { month: 6, name: 'Tháng 6', totalRevenue: 31000 },
  { month: 7, name: 'Tháng 7', totalRevenue: 25000 },
  { month: 8, name: 'Tháng 8', totalRevenue: 35000 },
  { month: 9, name: 'Tháng 9', totalRevenue: 30000 },
  { month: 10, name: 'Tháng 10', totalRevenue: 40000 },
  { month: 11, name: 'Tháng 11', totalRevenue: 45000 },
  { month: 12, name: 'Tháng 12', totalRevenue: 38000 }
]

export const AnalyticPage = () => {
  return <RevenueBarChart data={monthlyRevenueData} />
}
