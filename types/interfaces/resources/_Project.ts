import { Decimal128, ObjectId } from "mongodb"

/**
 * customerData and userData arrays are not used because mongo already extract needed
 * value in aggregation (customerName and userName). Could be used to project additional
 * proprerties of related customer and user resource
 */

/** project item going to frontend */
export interface _ProjectNew {
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

export interface _Project extends _ProjectNew {
  _id: string
}

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
