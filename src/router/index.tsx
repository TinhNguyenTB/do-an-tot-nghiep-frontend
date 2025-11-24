import { ProtectedLayout } from '@/components/Templates/Layout/Protected'
import { PublicLayout } from '@/components/Templates/Layout/Public'
import { PATHS } from '@/constants/paths'
import { HomePage } from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '',
    element: <HomePage />
    // element: <ProtectedLayout />,
    // children: [{ path: PATHS.HOME, element: <HomePage /> }]
  },
  {
    path: PATHS.LOGIN,
    element: (
      <PublicLayout>
        <LoginPage />
      </PublicLayout>
    )
  }
])
