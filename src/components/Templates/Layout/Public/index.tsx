import { Navigate } from 'react-router-dom'
import { PATHS } from '@/constants/paths'

interface Props {
  children: JSX.Element
}

export const PublicLayout = ({ children }: Props) => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to={PATHS.HOME} replace /> : children
}
