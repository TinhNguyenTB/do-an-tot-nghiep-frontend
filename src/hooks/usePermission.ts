import { ROLES } from '@/constants/rbac'

interface UsePermissionResult {
  hasPermission: (permission: string) => boolean
  isSuperAdmin: boolean
}

export const usePermission = (
  roles: string[],
  allowedPermissions: string[] = []
): UsePermissionResult => {
  const isSuperAdmin = roles.includes(ROLES.SUPER_ADMIN)
  const hasPermission = (permission: string): boolean => {
    return allowedPermissions.includes(permission)
  }

  return { hasPermission, isSuperAdmin }
}
