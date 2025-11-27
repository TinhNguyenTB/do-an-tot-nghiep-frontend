export const roles = {
  CLIENT: 'client',
  ORG_ADMIN: 'org_admin',
  SUPER_ADMIN: 'super_admin'
}

export const permissions = {
  // CLIENT
  READ_SELF_SUBSCRIPTION: 'read_self_subscription',
  UPDATE_SELF_PROFILE: 'update_self_profile',
  MANAGE_SUBSCRIPTION: 'manage_subscription',
  READ_PAYMENTS: 'read_payments',

  // ORG ADMIN
  MANAGE_ORGANIZATION_USERS: 'manage_organization_users',
  READ_ORGANIZATION_DETAILS: 'read_organization_details',
  UPDATE_ORGANIZATION_DETAILS: 'update_organization_details',

  // SUPER ADMIN
  MANAGE_SYSTEM_ROLES: 'manage_system_roles',
  MANAGE_ALL_ORGANIZATIONS: 'manage_all_organizations',
  MANAGE_ALL_SUBSCRIPTIONS: 'manage_all_subscriptions',
  MANAGE_ALL_USERS: 'manage_all_users'
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
    ownPermissions: [
      permissions.READ_SELF_SUBSCRIPTION,
      permissions.UPDATE_SELF_PROFILE,
      permissions.MANAGE_SUBSCRIPTION,
      permissions.READ_PAYMENTS
    ]
  },
  [roles.ORG_ADMIN]: {
    inherits: [roles.CLIENT],
    ownPermissions: [
      permissions.MANAGE_ORGANIZATION_USERS,
      permissions.READ_ORGANIZATION_DETAILS,
      permissions.UPDATE_ORGANIZATION_DETAILS
    ]
  },
  [roles.SUPER_ADMIN]: {
    inherits: [roles.ORG_ADMIN],
    ownPermissions: [
      permissions.MANAGE_SYSTEM_ROLES,
      permissions.MANAGE_ALL_ORGANIZATIONS,
      permissions.MANAGE_ALL_SUBSCRIPTIONS,
      permissions.MANAGE_ALL_USERS
    ]
  }
}
