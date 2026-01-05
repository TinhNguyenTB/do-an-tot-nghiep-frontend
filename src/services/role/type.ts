import { Permission } from '@/services/permission/type'

export interface Role {
  id: number
  name: string
  description: string | null
  inheritsFrom?: { id: number; name: string }[] // Role này kế thừa từ role nào?
  inheritedBy?: { id: number; name: string }[] // Những role nào kế thừa role này?
}

export interface RoleFormValues {
  name: string
  description: string | null
  inheritsFrom?: number[] // id role array
  permissions: Permission[]
}
