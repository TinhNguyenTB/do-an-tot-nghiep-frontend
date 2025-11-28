/**
 * Hàm chuyển đổi tên role (ví dụ: super_admin) thành định dạng dễ đọc (Super Admin).
 * @param roleName Tên vai trò (chuỗi).
 */
export const formatRoleName = (roleName: string): string => {
  if (!roleName) return ''
  // Thay thế dấu gạch dưới bằng khoảng trắng và chuyển đổi chữ cái đầu tiên của mỗi từ thành chữ hoa
  return roleName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Hàm trả về màu sắc Ant Design Tag dựa trên tên vai trò.
 * @param roleName Tên vai trò (chuỗi).
 */
export const getRoleColor = (roleName: string): string => {
  switch (roleName.toLowerCase()) {
    case 'super_admin':
      return 'gold' // Màu nổi bật cho quản trị viên hệ thống
    case 'org_admin':
      return 'blue' // Màu cho quản trị viên tổ chức
    case 'client':
      return 'green' // Màu cho người dùng cơ bản
    default:
      return 'default'
  }
}
