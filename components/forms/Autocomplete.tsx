import {
  Autocomplete as MantineAutocomplete,
  AutocompleteItem,
} from "@mantine/core"
import { Dispatch } from "react"

import { root } from "../../helpers/root"
import { _FormField } from "../../types/interfaces/_FormField"
import {
  _AutocompleteHookState,
  _AutocompleteHookAction,
} from "../../types/interfaces/_Autocomplete"

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
  /** the autocomplete resource name */
  const autocompleteResourceName = field.autocompleteData!.resourceName
  /** the autocomplete resource page*/
  const autocompleteResourcePage = field.autocompleteData!.resourcePage

  const onChangeHandler = async (searchValue = "") => {
    /** fetch autocomplete data from dedicated api */
    const data = await root.httpPost(`/api/common/autocomplete`, {
      resource: autocompleteResourceName,
      searchValue,
    })
    autocompleteDispatch({
      type: "loadData",
      payload: data,
      resourcePage: autocompleteResourcePage,
    })
  }

  const onItemSubmitHandler = (selected: AutocompleteItem) => {
    autocompleteDispatch({
      type: "select",
      payload: selected,
      resourceName: autocompleteResourceName,
    })
  }

  return (
    <MantineAutocomplete
      label={field.header}
      data={autocompleteState["dropdown"][autocompleteResourcePage]}
      onClick={() => onChangeHandler()}
      onChange={(searchValue) => onChangeHandler(searchValue)}
      onItemSubmit={(selected) => onItemSubmitHandler(selected)}
      mb={"sm"}
    ></MantineAutocomplete>
  )
}
