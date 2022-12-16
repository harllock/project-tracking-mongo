import { ObjectId } from "mongodb"

export interface _User {
  _id?: ObjectId
  address: string
  contract: string
  email: string
  hourlyWage: string
  magicSearch?: string
  name: string
  password: string
  phone: string
  role: string
  skill: string
}
