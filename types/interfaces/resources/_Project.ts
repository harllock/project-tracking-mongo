import { ObjectId } from "mongodb"

export interface _Project {
  _id?: ObjectId
  cost: number
  customerData: []
  customerId: ObjectId
  customerName: string
  days: number
  deliveryDate: string
  description: string
  magicSearch?: string
  name: string
  pricing: number
  startDate: string
  status: string
  userData: []
  userId: ObjectId
  userName: string
}
