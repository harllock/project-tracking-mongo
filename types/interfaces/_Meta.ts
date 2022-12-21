import { _FormField } from "./_FormField"
import { _MainGauge } from "./_MainGauge"
import { _TableField } from "./_TableField"

export interface _Meta {
  gauges: {
    main: _MainGauge[]
  }
  page: string
  resourceName: string
  table: {
    formFields: _FormField[]
    name: string
    related: []
    sortBy: string[]
    tableFields: _TableField[]
  }
}
