import { ObjectId } from "mongodb"

/** user item coming from frontend */
export interface _UserNew {
  _id?: ObjectId
  address: string
  contract: string
  email: string
  hourlyWage: string
  magicSearch: string
  name: string
  password: string
  phone: string
  role: string
  skill: string
}

export interface _User extends _UserNew {
  _id: ObjectId
}

/** mongodb formatted customer item*/
export interface _UserNew {
  /** _id present in update action and not present in create action */
  _id?: ObjectId
  address: string
  contract: string
  email: string
  hourlyWage: string
  name: string
  password: string
  phone: string
  role: string
  skill: string
}
