import { PublicLayout } from '@/components/Templates/Layout/Public'
import { MENU_URL } from '@/constants/menuUrl'
import { HomePage } from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import { SubscriptionPage } from '@/pages/Subscription'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '',
    element: <HomePage />
    // element: <ProtectedLayout />,
    // children: [{ path: PATHS.HOME, element: <HomePage /> }]
  },
  {
    path: MENU_URL.LOGIN,
    element: (
      <PublicLayout>
        <LoginPage />
      </PublicLayout>
    )
  },
  {
    path: MENU_URL.SUBSCRIPTIONS,
    element: <SubscriptionPage />
  }
])
