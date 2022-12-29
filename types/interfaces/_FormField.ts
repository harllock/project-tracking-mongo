import { _Hide } from "../enum/_Hide"
import { _FieldType } from "../enum/_FieldType"

export interface _FormField {
  default: string | null
  header: string
  hide: _Hide[]
  key: string
  selection: ["admin", "user"] | null
  type: _FieldType
}
