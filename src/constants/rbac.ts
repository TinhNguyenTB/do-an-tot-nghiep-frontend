export const roles = {
  CLIENT: 'client',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
}

export const permissions = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_SUPPORT: 'view_support',
  VIEW_MESSAGES: 'view_messages',
  VIEW_REVENUE: 'view_revenue',
  VIEW_ADMIN_TOOLS: 'view_admin-tools'
}

export interface RoleDefinition {
  /** Các permissions trực tiếp mà role này sở hữu. */
  ownPermissions: string[]
  /** Các role khác mà role này kế thừa quyền (để xử lý đệ quy). */
  inherits: string[]
}

export interface RoleDefinitions {
  [key: string]: RoleDefinition
}

// ✨ Cấu trúc role định nghĩa kế thừa
export const roleDefinitions: RoleDefinitions = {
  [roles.CLIENT]: {
    inherits: [],
    ownPermissions: [permissions.VIEW_DASHBOARD, permissions.VIEW_SUPPORT]
  },
  [roles.MODERATOR]: {
    // MODERATOR kế thừa quyền của CLIENT
    inherits: [roles.CLIENT],
    ownPermissions: [permissions.VIEW_MESSAGES]
  },
  [roles.ADMIN]: {
    // ADMIN kế thừa quyền của MODERATOR và thêm quyền riêng
    inherits: [roles.MODERATOR],
    ownPermissions: [permissions.VIEW_REVENUE, permissions.VIEW_ADMIN_TOOLS]
  }
}
