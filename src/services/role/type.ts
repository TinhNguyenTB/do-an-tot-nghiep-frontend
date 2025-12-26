import { Permission } from '@/services/permission/type'

export interface Role {
  name: string
  description: string | null
  inheritsFrom?: string[] // Role này kế thừa từ role nào?
  inheritedBy?: string[] // Những role nào kế thừa role này?
}

export interface RoleFormValues extends Role {
  permissions: Permission[]
}
