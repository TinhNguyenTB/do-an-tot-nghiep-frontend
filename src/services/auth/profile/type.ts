export interface UserProfile {
  id: number
  email: string
  name: string
  status: string
  avatar: string | null
  createdAt: string
  organization: {
    id: number
    name: string
    description: string | null
  }
  roles: string[]
}

export interface ProfileFormValues {
  name: string
}

export interface Profile {
  id: number
  name: string
  email: string
  avatar: string | null
  organizationId: number | null
}
