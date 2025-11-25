import { MENU_URL } from '@/constants/menuUrl'
import { permissions, roles } from '@/constants/rbac'
import { usePermission } from '@/hooks/usePermission'
import { AccessDeniedPage } from '@/pages/AccessDenied'
import { HomePage } from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import { NotFoundPage } from '@/pages/NotFound'
import { SubscriptionPage } from '@/pages/Subscription'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo')!)
  if (!user) {
    return <Navigate to={MENU_URL.LOGIN} replace />
  }
  return <Outlet />
}

const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo')!)
  if (user) {
    return <Navigate to={MENU_URL.HOME} replace />
  }
  return <Outlet />
}

function RBACRoute({
  requiredPermission,
  redirectTo = MENU_URL.ACCESS_DENIED
}: {
  requiredPermission: string
  redirectTo?: string
}) {
  const user = JSON.parse(localStorage.getItem('userInfo')!)
  const userRole = user.roles || roles.CLIENT
  const { hasPermission } = usePermission(userRole)
  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Routes>
      {/* <Route path={MENU_URL.HOME} element={<Navigate to={MENU_URL.LOGIN} replace />} /> */}
      <Route path={MENU_URL.HOME} element={<HomePage />} />
      {/* <Route element={<RBACRoute requiredPermission={permissions.VIEW_ADMIN_TOOLS} />}> */}
      <Route path={MENU_URL.SUBSCRIPTIONS} element={<SubscriptionPage />} />
      {/* </Route> */}
      <Route path={MENU_URL.LOGIN} element={<LoginPage />} />

      <Route path={MENU_URL.ACCESS_DENIED} element={<AccessDeniedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
