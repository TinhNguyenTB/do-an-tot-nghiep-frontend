interface UsePermissionResult {
  hasPermission: (permission: string) => boolean
}

export const usePermission = (allowedPermissions: string[] = []): UsePermissionResult => {
  const hasPermission = (permission: string): boolean => {
    return allowedPermissions.includes(permission)
  }

  return { hasPermission }
}
