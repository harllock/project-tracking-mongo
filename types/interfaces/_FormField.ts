import { _AutocompleteConfig } from "./_Autocomplete"
import { _Hide } from "../enum/_Hide"
import { _FieldType } from "../enum/_FieldType"

export interface _FormField {
  /** only present in type: _FieldType.AUTOCOMPLETE */
  autocompleteData?: _AutocompleteConfig
  default: string | null
  header: string
  hide: _Hide[]
  key: string
  selection: string[]
  type: _FieldType
}
