export interface Permission {
  id: number
  name: string
  organizationId?: number
  description: string
}

export interface PermissionFormValues {
  name: string
  description: string
  organizationId: number | null
}
