export interface Subscription {
  id: number
  name: string
  duration: number
  price: string
  userLimit: number
  createdAt: string
}

export interface SubscriptionFormValues {
  name: string
  duration: number
  price: string
  userLimit: number
}
