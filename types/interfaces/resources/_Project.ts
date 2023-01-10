import { Decimal128, ObjectId } from "mongodb"

/** project item coming from frontend */
export interface _ProjectFromClient {
  _id?: string
  cost: string
  customerId: string
  days: string
  deliveryDate: string
  description: string
  name: string
  pricing: string
  startDate: string
  status: string
  userId: string
}

/** mongodb formatted project item*/
export interface _ProjectToMongo {
  _id?: ObjectId
  cost: Decimal128
  customerId: ObjectId
  days: number
  deliveryDate: Date
  description: string
  magicSearch: string
  name: string
  pricing: Decimal128
  startDate: Date
  status: string
  userId: ObjectId
}

/** mongodb formatted project item*/
export interface _ProjectFromMongo {
  _id: ObjectId
  cost: Decimal128
  customerData: []
  customerId: ObjectId
  customerName: string
  days: number
  deliveryDate: Date
  description: string
  name: string
  pricing: Decimal128
  startDate: Date
  status: string
  userData: []
  userId: ObjectId
  userName: string
}

/** project item coming from frontend */
export interface _ProjectToClient {
  _id: string
  cost: string
  customerData: []
  customerId: string
  customerName: string
  days: string
  deliveryDate: string
  description: string
  name: string
  pricing: string
  startDate: string
  status: string
  userData: []
  userId: string
  userName: string
}
