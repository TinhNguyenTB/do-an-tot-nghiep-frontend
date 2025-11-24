import { Navigate } from 'react-router-dom'
import { MENU_URL } from '@/constants/menuUrl'

interface Props {
  children: JSX.Element
}

export const PublicLayout = ({ children }: Props) => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to={MENU_URL.HOME} replace /> : children
}
