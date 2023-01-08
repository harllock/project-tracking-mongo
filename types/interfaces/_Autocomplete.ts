import { AutocompleteItem } from "@mantine/core"

type _IdField = "customerId" | "projectId" | "userId"
type _ResourceName = "customer" | "project" | "user"
type _ResourcePage = "customers" | "projects" | "users"

export interface _AutocompleteConfig {
  idField: _IdField
  resourceName: _ResourceName
  resourcePage: _ResourcePage
}

export type _AutocompleteHookState = {
  dropdown: {
    customers: AutocompleteItem[]
    projects: AutocompleteItem[]
    users: AutocompleteItem[]
  }
  selection: {
    customer: AutocompleteItem
    project: AutocompleteItem
    user: AutocompleteItem
  }
}

export type _AutocompleteHookAction =
  | {
      type: "loadData"
      payload: AutocompleteItem[]
      resourcePage: _ResourcePage
    }
  | {
      type: "select"
      payload: AutocompleteItem
      resourceName: _ResourceName
    }
  | {
      type: "setFormUpdateDeleteDefaultValue"
      payload: string
      resourceName: _ResourceName
    }
