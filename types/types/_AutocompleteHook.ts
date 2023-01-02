export type _AutocompleteHookState = {
  value: string
}

export type _AutocompleteHookAction =
  | {
      type: "update"
      payload: string
    }
  | { type: "test"; payload: string }
