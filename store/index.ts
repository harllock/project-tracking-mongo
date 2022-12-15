import { atom } from "jotai"

import { _Message } from "../types/interfaces/_Message"

export const dataAtom = atom<{}[]>([{}])

export const mainGaugesAtom = atom<{
  [key: string]: number
}>({ count: 0 })

export const messageAtom = atom<_Message | null>(null)

/** only set by Pagination component and used to skip pages in db */
export const offsetAtom = atom<number>(0)

/** make useSearch hook re-fetch data when needed */
export const refreshDataAtom = atom<boolean>(false)

export const magicSearchAtom = atom<string>("")

export const selectedRowAtom = atom<{ [key: string]: string }>({})
