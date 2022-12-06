import { atom } from "jotai"

export const dataAtom = atom<{}[]>([{ a: 3 }])

export const testAtom = atom(false)
