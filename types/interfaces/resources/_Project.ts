import { Decimal128, ObjectId } from "mongodb"

/** project item coming from frontend */
export interface _ProjectNew {
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

export interface _Project extends _ProjectNew {
  _id: string
}

/** mongodb formatted project item*/
export interface _ProjectMongo {
  /** _id present in update action and not present in create action */
  _id?: ObjectId
  cost: Decimal128
  customerData: []
  customerId: ObjectId
  customerName: string
  days: number
  deliveryDate: Date
  description: string
  magicSearch: string
  name: string
  pricing: Decimal128
  startDate: Date
  status: string
  userData: []
  userId: ObjectId
  userName: string
}
