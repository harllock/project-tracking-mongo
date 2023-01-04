import { Decimal128, ObjectId } from "mongodb"

export interface _Project {
  _id: ObjectId
  cost: string
  customerData: []
  customerId: ObjectId
  customerName: string
  days: string
  deliveryDate: string
  description: string
  magicSearch?: string
  name: string
  pricing: string
  startDate: string
  status: string
  userData: []
  userId: ObjectId
  userName: string
}

export interface _ProjectMongo {
  _id: ObjectId
  cost: Decimal128
  customerId: ObjectId
  customerName: string
  days: number
  deliveryDate: Date
  description: string
  magicSearch?: string
  name: string
  pricing: Decimal128
  startDate: Date
  status: string
  userId: ObjectId
  userName: string
}
