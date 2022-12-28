import { _Hide } from "../enum/_Hide"
import { _FieldType } from "../enum/_FieldType"
import { _Role } from "../enum/_Role"

export interface _FormField {
  default: string | null
  header: string
  hide: _Hide[]
  key: string
  selection: _Role[] | null
  type: _FieldType
}
