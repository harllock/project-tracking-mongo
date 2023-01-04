/**
 * form createBody create the body that will be sent to create and update
 * resource apis;
 * createBody get form fields values (rawbody) and autocomplete values from
 * autocompleteState;
 * because Mantine form knows nothing about autocomplete values we get that
 * values from autocompleteState and inject them in the body beside form
 * fields value
 */

import { root } from "../root"
import { _AutocompleteHookState } from "../../types/interfaces/_Autocomplete"

interface _ObjSignature {
  [key: string]: any
}

export default (
  autocompleteState: _AutocompleteHookState,
  rawBody: _ObjSignature,
  resourceName: string
) => {
  const normalizedFormFields = _normalizeFormFields(rawBody)

  const body = _addAutocompleteFieds(
    autocompleteState,
    normalizedFormFields,
    resourceName
  )

  /** return formatted body ready to be sent to create/update apis */
  return body
}

function _normalizeFormFields(rawBody: _ObjSignature): _ObjSignature {
  const normalizedFormFields = Object.keys(rawBody).reduce(
    (obj: _ObjSignature, currentValue) => {
      /** if field is a date format the date; see root.dateFormat() for details */
      if (rawBody[currentValue] instanceof Date) {
        obj[currentValue] = root.dateFormat(rawBody[currentValue])
        /** else do not modify the field */
      } else {
        obj[currentValue] = rawBody[currentValue]
      }
      return obj
    },
    {}
  )

  return normalizedFormFields
}

function _addAutocompleteFieds(
  autocompleteState: _AutocompleteHookState,
  normalizedFormFields: _ObjSignature,
  resourceName: string
): _ObjSignature {
  let body: _ObjSignature = {}

  if (resourceName === "project") {
    body = { ...normalizedFormFields }
    body["customerId"] = autocompleteState.selection.customer.id
    body["userId"] = autocompleteState.selection.user.id
  } else {
    body = { ...normalizedFormFields }
  }

  return body
}
