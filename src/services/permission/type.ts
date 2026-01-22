export interface Permission {
  id: number
  name: string
  organizationId?: number
  description: string
  endpoints?: {
    httpMethod: string
    endpoint: string
  }[]
}

export interface PermissionFormValues {
  name: string
  description: string
  organizationId: number | null
  endpoints?: {
    httpMethod: string
    endpoint: string
  }[]
}
