import { useEffect, useState } from "react"
import type { Status } from "../types"

export function useStyles(id: string, styles: string): Status {
    const [status, setStatus] = useState<Status>(id || styles ? "loading" : "idle")

    useEffect(
        () => {
            if (!id || !styles) {
                setStatus("idle")
                return
            }

            // Fetch existing style element by id
            // It may have been added by another instance of this hook
            let style: ScriptElt = document.querySelector(
                `style[id="${id}"]`
            )

            if (!style) {
                // Create style
                style = document.createElement("style")
                style.innerHTML = styles
                style.setAttribute("data-status", "loading")
                // Add style to document body
                document.body.appendChild(style)

                // Store status in attribute on style
                // This can be read by other instances of this hook
                const setAttributeFromEvent = (event: Event) => {
                    style?.setAttribute(
                        "data-status",
                        event.type === "load" ? "ready" : "error"
                    )
                }

                style.addEventListener("load", setAttributeFromEvent)
                style.addEventListener("error", setAttributeFromEvent)
            } else {
                // Grab existing style status from attribute and set to state.
                setStatus(style.getAttribute("data-status") as Status)
            }

            // Style event handler to update status in state
            // Note: Even if the style already exists we still need to add
            // event handlers to update the state for *this* hook instance.
            const setStateFromEvent = (event: Event) => {
                setStatus(event.type === "load" ? "ready" : "error")
            }

            // Add event listeners
            style.addEventListener("load", setStateFromEvent)
            style.addEventListener("error", setStateFromEvent)

            // Remove event listeners on cleanup
            return () => {
                if (style) {
                    style.removeEventListener("load", setStateFromEvent)
                    style.removeEventListener("error", setStateFromEvent)
                }
            }
        },
        [styles] // Only re-run effect if style styles changes
    )

    return status
}

export default useStyles
