import { atom } from "jotai"

export const dataAtom = atom<{}[]>([{}])

export const mainGaugesAtom = atom<{
  [key: string]: number
}>({})

export const refreshDataAtom = atom<boolean>(false)

export const selectedRowAtom = atom<{ [key: string]: string }>({})
