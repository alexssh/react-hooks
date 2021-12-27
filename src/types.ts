export type Status = "idle" | "loading" | "ready" | "error"
export type ScriptElt = HTMLScriptElement | null

export type Cache<T> = { [url: string]: T }

export type Action<T> = | { type: 'loading' } | { type: 'fetched'; payload: T } | { type: 'error'; payload: Error }

export type SetValue<T> = Dispatch<SetStateAction<T>>

export type Value<T> = T | null
