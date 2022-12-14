import { atom } from "jotai"

import { _Message } from "../types/interfaces/_Message"

export const dataAtom = atom<{}[]>([{}])

export const mainGaugesAtom = atom<{
  [key: string]: number
}>({})

export const messageAtom = atom<_Message | null>(null)

/** make useSearch hook re-fetch data when needed */
export const refreshDataAtom = atom<boolean>(false)

export const selectedRowAtom = atom<{ [key: string]: string }>({})
