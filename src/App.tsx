import { AppLayout } from '@/components/Layout'
import { MENU_URL } from '@/constants/menuUrl'
import { permissions, roles } from '@/constants/rbac'
import { usePermission } from '@/hooks/usePermission'
import { AccessDeniedPage } from '@/pages/AccessDenied'
import { HomePage } from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import { NotFoundPage } from '@/pages/NotFound'
import { RegisterPage } from '@/pages/Register'
import { ListSubscriptionPage } from '@/pages/Subscription/list'
import { SaveSubscriptionPage } from '@/pages/Subscription/save'
import { ListUserPage } from '@/pages/User/list'
import { SaveUserPage } from '@/pages/User/save'
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
      {/* các route cần login */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path={MENU_URL.HOME} element={<HomePage />} />

          <Route element={<RBACRoute requiredPermission={permissions.MANAGE_ALL_SUBSCRIPTIONS} />}>
            <Route path={MENU_URL.SUBSCRIPTIONS} element={<ListSubscriptionPage />} />
            <Route path={`${MENU_URL.SUBSCRIPTIONS}/addNew`} element={<SaveSubscriptionPage />} />
            <Route path={`${MENU_URL.SUBSCRIPTIONS}/:id`} element={<SaveSubscriptionPage />} />
          </Route>

          <Route element={<RBACRoute requiredPermission={permissions.MANAGE_ALL_USERS} />}>
            <Route path={MENU_URL.USERS} element={<ListUserPage />} />
            <Route path={`${MENU_URL.USERS}/addNew`} element={<SaveUserPage />} />
            <Route path={`${MENU_URL.USERS}/:id`} element={<SaveUserPage />} />
          </Route>
        </Route>
      </Route>

      {/* các route không cần login */}
      <Route element={<UnauthorizedRoutes />}>
        <Route path={MENU_URL.LOGIN} element={<LoginPage />} />
        <Route path={MENU_URL.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route path={MENU_URL.ACCESS_DENIED} element={<AccessDeniedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
