import { UserStatus } from '@/enums'

/**
 * Hàm trả về màu sắc Ant Design Tag dựa trên UserStatus.
 * @param status Trạng thái người dùng (UserStatus).
 */
export const getUserStatusColor = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'green'
    case UserStatus.PENDING:
      return 'gold' // Đang chờ thanh toán
    case UserStatus.EXPIRED:
      return 'red'
    case UserStatus.SUSPENDED:
      return 'volcano' // Bị đình chỉ/khóa
    default:
      return 'default'
  }
}

/**
 * Hàm chuyển đổi tên status (ví dụ: SUSPENDED) thành định dạng dễ đọc.
 * @param status Trạng thái người dùng (UserStatus).
 */
export const formatUserStatusName = (status: UserStatus): string => {
  if (!status) return ''
  // Chuyển đổi thành chữ hoa/chữ thường tùy thuộc vào style mong muốn
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  // Hoặc giữ nguyên chữ hoa: return status;
}
