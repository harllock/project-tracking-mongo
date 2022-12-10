import { _FormField } from "./_FormField"
import { _TableField } from "./_TableField"

export interface _Meta {
  page: string
  resourceName: string
  table: {
    formFields: _FormField[]
    tableFields: _TableField[]
  }
}
