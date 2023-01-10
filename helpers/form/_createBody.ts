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

/** normalize fields coming from Mantine form */
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

/** add fields coming from autocomplete reducer state */
function _addAutocompleteFieds(
  autocompleteState: _AutocompleteHookState,
  normalizedFormFields: _ObjSignature,
  resourceName: string
): _ObjSignature {
  /** spread fields coming from Mantine form */
  let body: _ObjSignature = { ...normalizedFormFields }

  if (resourceName === "project" || resourceName === "lead") {
    /** add related resources ids */
    body["customerId"] = autocompleteState.selection.customer._id
    body["userId"] = autocompleteState.selection.user._id
  }
  if (resourceName === "activity") {
    /** add related resources ids */
    /**
     * note that customerId is not added because customer is not related
     * to activity; customer is only used to filter project during form
     * create and update submission
     */
    body["projectId"] = autocompleteState.selection.project._id
    body["userId"] = autocompleteState.selection.user._id
  } else {
    /**
     * if resource has not autocomplete fields just return fields from
     * Mantine Form
     */
    body = { ...normalizedFormFields }
  }

  /**
   * remove fields not going go mongodb, following fields are present
   * depending on the action (create / update) and the resource
   */
  delete body.cost /** dynamically calculated in create/update apis */
  delete body.customerData
  delete body.customerName
  delete body.projectData
  delete body.projectName
  delete body.userData
  delete body.userName

  return body
}
