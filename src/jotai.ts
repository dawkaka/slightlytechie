import { atom } from "jotai";
import { defalutPosts } from "./contants";
import { AppState } from "../types"


const atomWithLocalStorage = (key: string, initialValue: AppState) => {
    const getInitialValue = (): AppState => {
        const item = localStorage.getItem(key)
        if (item !== null) {
            return JSON.parse(item)
        }
        return initialValue
    }
    const baseAtom = atom(getInitialValue())
    const derivedAtom = atom(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue =
                typeof update === 'function' ? update(get(baseAtom)) : update
            set(baseAtom, nextValue)
            localStorage.setItem(key, JSON.stringify(nextValue))
        }
    )
    return derivedAtom
}

export const stateAtom = atomWithLocalStorage("app", {
    profile: { image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80", name: "Jon Doe" },
    posts: defalutPosts,
})
