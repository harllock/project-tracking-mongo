import { useReducer } from "react"

import { root } from "../helpers/root"

import type {
  _AutocompleteHookState,
  _AutocompleteHookAction,
} from "../types/interfaces/_Autocomplete"

export const useAutocomplete = () => {
  const initialState: _AutocompleteHookState = {
    dropdown: {
      customers: [],
      projects: [],
      users: [],
    },
    selection: {
      customer: { value: "" },
      project: { value: "" },
      user: { value: "" },
    },
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
           * into the state
           */
          const resourcePage =
            action.resourcePage /** initialize here for correct typing */
          return _loadData(state, action, resourcePage)

        case "select":
          const resourceName =
            action.resourceName /** initialize here for correct typing */
          return _select(state, action, resourceName)

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
  action: _AutocompleteHookAction,
  resourcePage: string
) {
  const data = action.payload
  return {
    ...state,
    dropdown: { ...state.dropdown, [resourcePage]: data },
  }
}

function _select(
  state: _AutocompleteHookState,
  action: _AutocompleteHookAction,
  resourceName: string
) {
  const item = action.payload
  return { ...state, selection: { ...state.selection, [resourceName]: item } }
}
