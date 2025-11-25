import { useMemo } from 'react'
import { RoleDefinitions } from '@/constants/rbac'
import { roleDefinitions } from '@/constants/rbac'
import { resolveRolePermissions } from '@/utils/rbac-resolver'

interface UsePermissionResult {
  hasPermission: (permission: string) => boolean
}

/**
 * Hook tùy chỉnh để quản lý và kiểm tra quyền dựa trên nhiều role của người dùng.
 * @param userRoles Mảng các role hiện tại của người dùng (ví dụ: ['ADMIN', 'MANAGER']).
 * @returns Đối tượng chứa hàm hasPermission.
 */
export const usePermission = (userRoles: string[] = []): UsePermissionResult => {
  // ✨ 1. Tính toán danh sách quyền đầy đủ từ TẤT CẢ các roles
  const allowedPermissions: string[] = useMemo(() => {
    // 1.1. Kiểm tra nếu không có roles nào được cung cấp
    if (!userRoles || userRoles.length === 0) {
      return []
    }

    // Khởi tạo một Set để chứa tất cả permissions duy nhất
    const allPermissions = new Set<string>()

    // 1.2. Lặp qua từng role của người dùng
    userRoles.forEach((roleName) => {
      // Gọi hàm resolve để lấy permissions cho role hiện tại (bao gồm kế thừa)
      const permissionsForRole = resolveRolePermissions(
        roleName,
        roleDefinitions as RoleDefinitions
      )

      // 1.3. Thêm tất cả permissions của role đó vào Set chung
      permissionsForRole.forEach((permission) => {
        allPermissions.add(permission)
      })
    })

    // Trả về mảng các permissions duy nhất đã tổng hợp
    return Array.from(allPermissions)
  }, [userRoles]) // Tính toán lại khi danh sách roles thay đổi

  // ✨ 2. Hàm kiểm tra quyền (Logic này không đổi)
  const hasPermission = (permission: string): boolean => {
    return allowedPermissions.includes(permission)
  }

  // 3. Trả về hàm kiểm tra
  return { hasPermission }
}
