import { RefObject } from 'react'
import { Handler } from '../types'
import { useEventListener } from './useEventListener'

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
    useEventListener(mouseEvent, event => {
        const el = ref?.current

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return
        }

        // Explicit type for "mousedown" event.
        handler(event as unknown as MouseEvent)
    })
}

export default useOnClickOutside
