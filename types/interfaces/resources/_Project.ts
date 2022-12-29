import { ObjectId } from "mongodb"

export interface _User {
  _id?: ObjectId
  cost: number
  customer: ObjectId
  days: number
  deliveryDate: string
  description: string
  magicSearch?: string
  name: string
  pricing: number
  startDate: string
  status: string
  user: ObjectId
}