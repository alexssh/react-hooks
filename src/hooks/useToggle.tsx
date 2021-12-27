import { useCallback, useState } from "react"

export function useToggle(initialState: boolean = false): T {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the comopnent,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(
        () => setState(state => !state), []
    )

    return [state, toggle]
}

export default useToggle
