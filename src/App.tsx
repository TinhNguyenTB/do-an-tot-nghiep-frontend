import { AppLayout } from '@/components/Layout'
import { MENU_URL } from '@/constants/menuUrl'
import { PERMISSIONS } from '@/constants/rbac'
import { usePermission } from '@/hooks/usePermission'
import { AccessDeniedPage } from '@/pages/AccessDenied'
import { HomePage } from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import { NotFoundPage } from '@/pages/NotFound'
import { ListOrganizationPage } from '@/pages/Organizations/list'
import { RegisterPage } from '@/pages/Register'
import { ListRolePage } from '@/pages/Role/list'
import { ListSubscriptionPage } from '@/pages/Subscription/list'
import { SaveSubscriptionPage } from '@/pages/Subscription/save'
import { ListUserPage } from '@/pages/User/list'
import { SaveUserPage } from '@/pages/User/save'
import { useRbacStore } from '@/store/rbacStore'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const ProtectedRoutes = () => {
  const isLoggedIn = useRbacStore((state) => state.isLoggedIn)
  if (!isLoggedIn()) {
    return <Navigate to={MENU_URL.LOGIN} replace />
  }
  return <Outlet />
}

const UnauthorizedRoutes = () => {
  const isLoggedIn = useRbacStore((state) => state.isLoggedIn)
  if (isLoggedIn()) {
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
  const permissions = useRbacStore.getState().getPermissions()
  const roles = useRbacStore((state) => state.roles)
  const { hasPermission, isSuperAdmin } = usePermission(roles, permissions)
  if (isSuperAdmin) {
    return <Outlet />
  }
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

          {/* Gói dịch vụ */}
          <Route element={<RBACRoute requiredPermission={PERMISSIONS.READ_SUBSCRIPTIONS} />}>
            <Route path={MENU_URL.SUBSCRIPTIONS} element={<ListSubscriptionPage />} />
            <Route path={`${MENU_URL.SUBSCRIPTIONS}/addNew`} element={<SaveSubscriptionPage />} />
            <Route path={`${MENU_URL.SUBSCRIPTIONS}/:id`} element={<SaveSubscriptionPage />} />
          </Route>

          {/* Người dùng */}
          <Route element={<RBACRoute requiredPermission={PERMISSIONS.READ_USERS} />}>
            <Route path={MENU_URL.USERS} element={<ListUserPage />} />
            <Route path={`${MENU_URL.USERS}/addNew`} element={<SaveUserPage />} />
            <Route path={`${MENU_URL.USERS}/:id`} element={<SaveUserPage />} />
          </Route>

          {/* Vai trò */}
          <Route element={<RBACRoute requiredPermission={PERMISSIONS.READ_ROLES} />}>
            <Route path={MENU_URL.ROLES} element={<ListRolePage />} />
            {/* <Route path={`${MENU_URL.USERS}/addNew`} element={<SaveUserPage />} />
            <Route path={`${MENU_URL.USERS}/:id`} element={<SaveUserPage />} /> */}
          </Route>

          {/* Tổ chức */}
          <Route element={<RBACRoute requiredPermission={PERMISSIONS.READ_ORGANIZATIONS} />}>
            <Route path={MENU_URL.ORGANIZATIONS} element={<ListOrganizationPage />} />
            {/* <Route path={`${MENU_URL.USERS}/addNew`} element={<SaveUserPage />} />
            <Route path={`${MENU_URL.USERS}/:id`} element={<SaveUserPage />} /> */}
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
