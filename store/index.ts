import { atom } from "jotai"

export const dataAtom = atom<{}[]>([{}])
export const refreshDataAtom = atom<boolean>(false)
export const selectedRowAtom = atom<{}>({})
