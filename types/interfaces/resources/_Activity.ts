import { Decimal128, ObjectId } from "mongodb"

/** activity item coming from frontend */
export interface _ActivityNew {
  cost: string
  description: string
  extra: string
  hours: string
  magicSearch: string
  name: string
  projectId: string
  startDate: string
  userId: string
}

export interface _Activity extends _ActivityNew {
  _id: string
}

/** mongodb formatted activity item*/
export interface _ActivityMongo {
  /** _id present in update action and not present in create action */
  _id?: ObjectId
  cost: Decimal128
  customerData: []
  customerName: string
  description: string
  extra: Decimal128
  hours: Decimal128
  name: string
  projectData: []
  projectId: ObjectId
  projectName: string
  startDate: Date
  userData: []
  userId: ObjectId
  userName: string
}
