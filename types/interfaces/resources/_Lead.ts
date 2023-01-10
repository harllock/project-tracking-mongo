import { Decimal128, ObjectId } from "mongodb"

/** lead item coming from frontend */
export interface _LeadNew {
  bid: string
  customerId: string
  days: string
  description: string
  magicSearch: string
  name: string
  pricing: string
  startDate: string
  status: string
  userId: string
}

export interface _Lead extends _LeadNew {
  _id: string
}

/** mongodb formatted lead item*/
export interface _LeadMongo {
  /** _id present in update action and not present in create action */
  _id?: ObjectId
  bid: string
  customerData: []
  customerId: ObjectId
  customerName: string
  days: number
  description: string
  name: string
  pricing: Decimal128
  startDate: Date
  status: string
  userData: []
  userId: ObjectId
  userName: string
}
