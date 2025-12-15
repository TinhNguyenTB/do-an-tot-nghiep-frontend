export const ROLES = {
  CLIENT: 'client',
  ORG_ADMIN: 'org_admin',
  SUPER_ADMIN: 'super_admin'
}
export const PERMISSIONS = {
  /*
   |--------------------------------------------------------------------------
   | SUBSCRIPTIONS
   |--------------------------------------------------------------------------
   */
  READ_SUBSCRIPTIONS: 'read_subscriptions',
  READ_SUBSCRIPTION_DETAILS: 'read_subscriptions_details',
  CREATE_SUBSCRIPTIONS: 'create_subscriptions',
  UPDATE_SUBSCRIPTIONS: 'update_subscriptions',
  DELETE_SUBSCRIPTIONS: 'delete_subscriptions',

  READ_SELF_SUBSCRIPTION: 'read_self_subscription',

  /*
   |--------------------------------------------------------------------------
   | PAYMENTS
   |--------------------------------------------------------------------------
   */
  READ_SELF_PAYMENTS: 'read_self_payments',

  /*
   |--------------------------------------------------------------------------
   | USERS
   |--------------------------------------------------------------------------
   */
  READ_USERS: 'read_users',
  READ_USER_DETAILS: 'read_users_details',
  CREATE_USERS: 'create_users',
  UPDATE_USERS: 'update_users',
  DELETE_USERS: 'delete_users',

  UPDATE_SELF_PROFILE: 'update_self_profile',

  /*
   |--------------------------------------------------------------------------
   | ROLES
   |--------------------------------------------------------------------------
   */
  READ_ROLES: 'read_roles',
  READ_ROLE_DETAILS: 'read_roles_details',
  CREATE_ROLES: 'create_roles',
  UPDATE_ROLES: 'update_roles',
  DELETE_ROLES: 'delete_roles',

  /*
   |--------------------------------------------------------------------------
   | PERMISSIONS
   |--------------------------------------------------------------------------
   */
  READ_PERMISSIONS: 'read_permissions',
  READ_PERMISSION_DETAILS: 'read_permissions_details',
  CREATE_PERMISSIONS: 'create_permissions',
  UPDATE_PERMISSIONS: 'update_permissions',
  DELETE_PERMISSIONS: 'delete_permissions',

  /*
   |--------------------------------------------------------------------------
   | ORGANIZATIONS
   |--------------------------------------------------------------------------
   */
  READ_ORGANIZATIONS: 'read_organizations',
  READ_ORGANIZATION_DETAILS: 'read_organization_details',
  CREATE_ORGANIZATIONS: 'create_organizations',
  UPDATE_ORGANIZATIONS: 'update_organizations',
  DELETE_ORGANIZATIONS: 'delete_organizations',

  READ_SELF_ORGANIZATION: 'read_self_organization',
  UPDATE_SELF_ORGANIZATION: 'update_self_organization',
  MANAGE_ORGANIZATION_USERS: 'manage_organization_users',

  /*
   |--------------------------------------------------------------------------
   | ENDPOINT PERMISSIONS
   |--------------------------------------------------------------------------
   */
  READ_ENDPOINT_PERMISSIONS: 'read_endpoint_permissions',
  READ_ENDPOINT_PERMISSION_DETAILS: 'read_endpoint_permissions_details',
  CREATE_ENDPOINT_PERMISSIONS: 'create_endpoint_permissions',
  UPDATE_ENDPOINT_PERMISSIONS: 'update_endpoint_permissions',
  DELETE_ENDPOINT_PERMISSIONS: 'delete_endpoint_permissions'
} as const
