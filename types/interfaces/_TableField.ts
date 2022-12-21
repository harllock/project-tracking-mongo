import { _FieldType } from "../enum/_FieldType"

export interface _TableField {
  color: string | null /** custom color when needed*/
  header: string
  key: string
  type: _FieldType
  width: string
}
