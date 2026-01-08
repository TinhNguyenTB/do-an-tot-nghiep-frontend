export interface Permission {
  id: number
  name: string
  description: string
}

export interface PermissionFormValues {
  name: string
  description: string
  organizationId: number | null
}
