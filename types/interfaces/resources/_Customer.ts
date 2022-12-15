import { ObjectId } from "mongodb"

export interface _Customer {
  _id?: ObjectId
  address: string
  addressNumber: string
  cap: string
  city: string
  contactPerson: string
  contactPersonEmail: string
  contactPersonPhone: string
  country: string
  magicSearch?: string
  name: string
  phone: string
  vat: string
  [key: string]: string | undefined | ObjectId
}
