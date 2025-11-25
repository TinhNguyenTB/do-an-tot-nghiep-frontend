import { RoleDefinitions } from '@/constants/rbac'

/**
 * Tính toán tất cả permissions của một role, bao gồm cả quyền kế thừa.
 * Sử dụng Set để đảm bảo các quyền không bị trùng lặp.
 * * @param roleName Tên của role cần kiểm tra (ví dụ: 'ADMIN', 'MANAGER').
 * @param definitions Cấu trúc roleDefinitions (chứa ownPermissions và inherits).
 * @param resolvedPermissions Set chứa các permissions đã tổng hợp (dùng cho đệ quy).
 * @returns Mảng các permissions duy nhất.
 */
export const resolveRolePermissions = (
  roleName: string,
  definitions: RoleDefinitions,
  resolvedPermissions: Set<string> = new Set()
): string[] => {
  // Nếu role không tồn tại trong definitions, trả về permissions đã tổng hợp
  if (!definitions[roleName]) {
    return Array.from(resolvedPermissions)
  }

  const roleDef = definitions[roleName]

  // 1. Thêm quyền riêng của role hiện tại vào Set
  roleDef.ownPermissions.forEach((permission) => resolvedPermissions.add(permission))

  // 2. Xử lý quyền kế thừa (Đệ quy)
  if (roleDef.inherits && roleDef.inherits.length > 0) {
    for (const inheritedRole of roleDef.inherits) {
      // Gọi đệ quy cho role kế thừa và tiếp tục tổng hợp vào cùng một Set
      resolveRolePermissions(inheritedRole, definitions, resolvedPermissions)
    }
  }

  // Trả về mảng permissions đã tổng hợp (chỉ ở cấp đệ quy cao nhất)
  return Array.from(resolvedPermissions)
}
