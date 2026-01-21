export interface PaymentHistory {
  id: number
  userId: number
  subscriptionId: number
  amount: string
  paymentType: string
  paymentDate: string
  status: string
  transactionId: string
  user: {
    id: number
    name: string
    email: string
  }
  subscription: {
    name: string
    duration: number
  }
}

export interface TransactionHistory {
  id: number
  userId: number
  subscriptionId: number
  amount: string
  paymentType: string
  paymentDate: string
  status: string
  transactionId: string
  user: {
    id: number
    name: string
    email: string
    organization: {
      name: string
    }
  }
  subscription: {
    name: string
  }
}
