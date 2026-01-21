import { UserStatus } from '@/enums'

export const getUserStatusBadge = (status: UserStatus) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return { label: 'Đang hoạt động', color: 'success' }
    case UserStatus.PENDING:
      return { label: 'Chưa kích hoạt', color: 'warning' }
    case UserStatus.EXPIRED:
      return { label: 'Đã hết hạn', color: 'default' }
    case UserStatus.SUSPENDED:
      return { label: 'Đang bị khóa', color: 'error' }
    default:
      return { label: 'Không xác định', color: 'default' }
  }
}
