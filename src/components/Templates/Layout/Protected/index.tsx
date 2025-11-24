import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { MENU_URL } from '@/constants/menuUrl'

export const ProtectedLayout = () => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to={MENU_URL.LOGIN} state={{ from: location }} replace />
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
