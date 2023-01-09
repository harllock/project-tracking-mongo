import { _FormField } from "./_FormField"
import { _MainGauge } from "./_MainGauge"
import { _TableField } from "./_TableField"

export interface _Meta {
  gauges: {
    main: _MainGauge[]
  }
  page: "customers" | "leads" | "projects" | "users"
  resourceName: string
  table: {
    formFields: _FormField[]
    related: []
    sortBy: string[]
    tableFields: _TableField[]
  }
  title: string
}
