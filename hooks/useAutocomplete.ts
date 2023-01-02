import { useReducer, Dispatch } from "react"

import { _FormField } from "../types/interfaces/_FormField"
import {
  _AutocompleteHookState,
  _AutocompleteHookAction,
} from "../types/types/_AutocompleteHook"

export const useAutocomplete = () => {
  const initialState = {
    value: "",
  }

  const reducer = (
    state: _AutocompleteHookState,
    action: _AutocompleteHookAction
  ): _AutocompleteHookState => {
    switch (action.type) {
      case "update":
        return { value: action.payload }
      case "test":
        return { value: action.payload }
      default:
        throw new Error("useAutocomplete hook invalid action")
    }
  }

  /** useAutcomplete hook return a tuple: [state, dispatch] */
  return useReducer(reducer, initialState)
}
