import { ObjectId } from "mongodb"

/** customer item coming from frontend */
export interface _CustomerNew {
  address: string
  addressNumber: string
  cap: string
  city: string
  contactPerson: string
  contactPersonEmail: string
  contactPersonPhone: string
  country: string
  magicSearch: string
  name: string
  phone: string
  vat: string
}

export interface _Customer extends _CustomerNew {
  _id: ObjectId
}

/** mongodb formatted customer item*/
export interface _CustomerMongo {
  /** _id present in update action and not present in create action */
  _id?: ObjectId
  address: string
  addressNumber: string
  cap: string
  city: string
  contactPerson: string
  contactPersonEmail: string
  contactPersonPhone: string
  country: string
  name: string
  phone: string
  vat: string
}
