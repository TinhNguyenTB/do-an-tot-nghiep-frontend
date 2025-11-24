export interface Subscription {
  id: number
  name: string
  duration: number
  price: string // Chú ý: price là string
  userLimit: number | null
  createdAt: string
}
