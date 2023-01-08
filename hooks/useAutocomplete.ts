import { useReducer } from "react"

import { root } from "../helpers/root"

import type {
  _AutocompleteHookState,
  _AutocompleteHookAction,
} from "../types/interfaces/_Autocomplete"

const defaultSelection = {
  customer: { value: "", _id: "" },
  project: { value: "", _id: "" },
  user: { value: "", _id: "" },
}

export const useAutocomplete = (selection = defaultSelection) => {
  const initialState: _AutocompleteHookState = {
    dropdown: {
      customers: [],
      projects: [],
      users: [],
    },
    selection,
  }

  const reducer = (
    state: _AutocompleteHookState,
    action: _AutocompleteHookAction
  ): _AutocompleteHookState => {
    try {
      switch (action.type) {
        case "loadData":
          /**
           * load autocomplete data fetched from dedicated resource api
           * into the state dropdown
           */
          return _loadData(state, action)

        case "select":
          /**
           * insert selected autocomplete value into the state selection
           */
          return _select(state, action)

        case "setFormUpdateDeleteDefaultValue":
          /**
           * set the autocomplete state value that is used for two-way
           * binding of the autocomplete field value
           */
          return _setFormUpdateDeleteDefaultValue(state, action)

        default:
          /** throw new error if action is invalid */
          throw new Error("useAutocomplete hook invalid action")
      }
    } catch (error) {
      root.logError({
        section: "hooks",
        summary: "useAutocomplete custom hook not working",
        where: "hooks/useAutcomplete.ts",
        stack: error,
      })
      /** always return the state */
      return state
    }
  }

  /** useAutcomplete hook (useReducer) return a tuple: [state, dispatch] */
  return useReducer(reducer, initialState)
}

function _loadData(
  state: _AutocompleteHookState,
  action: _AutocompleteHookAction
) {
  if (action.type === "loadData") {
    const data = action.payload
    const resourcePage = action.resourcePage
    return {
      ...state,
      dropdown: { ...state.dropdown, [resourcePage]: data },
    }
  }
  return { ...state }
}

function _select(
  state: _AutocompleteHookState,
  action: _AutocompleteHookAction
) {
  if (action.type === "select") {
    const item = action.payload
    const resourceName = action.resourceName
    return { ...state, selection: { ...state.selection, [resourceName]: item } }
  }
  return { ...state }
}

function _setFormUpdateDeleteDefaultValue(
  state: _AutocompleteHookState,
  action: _AutocompleteHookAction
) {
  if (action.type === "setFormUpdateDeleteDefaultValue") {
    const value = action.payload
    const resourceName = action.resourceName
    return {
      ...state,
      selection: { ...state.selection, [resourceName]: value },
    }
  }
  return { ...state }
}
