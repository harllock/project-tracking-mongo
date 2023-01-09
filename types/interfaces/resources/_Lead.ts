import { Decimal128, ObjectId } from "mongodb"

/**
 * customerData and userData arrays are not used because mongo already extract needed
 * value in aggregation (customerName and userName). Could be used to project additional
 * proprerties of related customer and user resource
 */

/** lead item for the frontend */
export interface _LeadNew {
  bid: string
  customerData: []
  customerId: string
  customerName: string
  days: string
  description: string
  name: string
  pricing: string
  startDate: string
  status: string
  userData: []
  userId: string
  userName: string
}

export interface _Lead extends _LeadNew {
  _id: string
}

/** leadMongo item for the db */
export interface _LeadMongo {
  /** _id present in update action and not present in create action */
  _id?: ObjectId
  bid: string
  customerData: []
  customerId: ObjectId
  customerName: string
  days: number
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
