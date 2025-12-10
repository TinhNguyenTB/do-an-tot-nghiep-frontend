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
  MANAGE_ALL_ROLES: 'manage_all_roles',
  MANAGE_ALL_ORGANIZATIONS: 'manage_all_organizations',
  MANAGE_ALL_SUBSCRIPTIONS: 'manage_all_subscriptions',
  MANAGE_ALL_USERS: 'manage_all_users'
}
