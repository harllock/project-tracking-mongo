import { Autocomplete as MantineAutocomplete } from "@mantine/core"
import { Dispatch } from "react"

import { _FormField } from "../../types/interfaces/_FormField"
import {
  _AutocompleteHookState,
  _AutocompleteHookAction,
} from "../../types/types/_AutocompleteHook"

interface _Props {
  autocompleteState: _AutocompleteHookState
  autocompleteDispatch: Dispatch<_AutocompleteHookAction>
  field: _FormField
}

export const Autocomplete: React.FC<_Props> = ({
  autocompleteState,
  autocompleteDispatch,
  field,
}: _Props) => {
  return (
    <MantineAutocomplete
      label={field.header}
      value={autocompleteState.value}
      data={["a", "b", "c"]}
      onChange={(searchValue) =>
        autocompleteDispatch({ type: "update", payload: searchValue })
      }
      mb={"sm"}
    ></MantineAutocomplete>
  )
}
