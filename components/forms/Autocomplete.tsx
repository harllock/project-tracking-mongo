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
  selectedRow?: { [key: string]: string }
}

export const Autocomplete: React.FC<_Props> = ({
  autocompleteState,
  autocompleteDispatch,
  field,
  selectedRow,
}: _Props) => {
  /** the autocomplete resource name */
  const autocompleteResourceName = field.autocompleteData!.resourceName
  /** the autocomplete resource page*/
  const autocompleteResourcePage = field.autocompleteData!.resourcePage

  /**
   * for FormUpdateDelete load selectedRow current field value into the
   * state; it will be used to show field default initial value
   */

  const onChangeHandler = async (searchValue = "") => {
    /**
     * when user clicks in the autocomplete field, autocomplete state
     * will be updated with empty string (searchValue default)
     *
     * when user types in the autcomplete field, autocomplete state
     * will be updated with current searchValue
     */
    autocompleteDispatch({
      type: "setFormUpdateDeleteDefaultValue",
      payload: searchValue,
      resourceName: autocompleteResourceName,
    })

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
      value={autocompleteState.selection[autocompleteResourceName].value}
      data={autocompleteState["dropdown"][autocompleteResourcePage]}
      onClick={() => onChangeHandler()}
      onChange={(searchValue) => onChangeHandler(searchValue)}
      onItemSubmit={(selected) => onItemSubmitHandler(selected)}
      mb={"sm"}
    ></MantineAutocomplete>
  )
}
