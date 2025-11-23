import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATHS } from '@/constants/paths'

export const ProtectedLayout = () => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />
  }

  return (
    <div>
      {/*  Header, Sidebar  */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
