export interface Subscription {
  id: number
  name: string
  duration: number
  price: string
  userLimit: number
  createdAt: string
  updatedAt: string
}

export interface SubscriptionFormValues {
  name: string
  duration: number
  price: string
  userLimit: number
}

export interface UserSubscription {
  id: number
  userId: number
  organizationId: number
  subscriptionId: number
  startDate: string
  endDate: string
  status: string
  subscription: Subscription
}
