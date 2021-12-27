# react-hooks

A set of useful hooks for prototyping.

```js
// Getting started

import {
    useElementSize,
    useEventListener,
    useScript,
    useStyles
} from "https://alexssh.github.io/react-hooks/release/latest/index.js"
```

The hooks are ready to use in [Framer](https://framer.com/projects/Examples-react-hooks--8hFHiJFebfB0pRBQ1ZYI-dDW4e).

## useDebounce

This hook helps to limit that the component is re-rendered too many times. It uses two parameters: value and debounce time (ms).


```js
import { useDebounce } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const [value, setValue] = useState(0)
    const debouncedValue = useDebounce(value, 1000)

    return (
        <button onClick={() => { setValue(value + 1) }}>
            {`Value is ${value}. Debounced value is ${debouncedValue}.`}
        </button>
    )
}
```

## useElementSize

This hook helps you to dynamically get the width and the height of an HTML element. Dimensions are updated on load, on mount/un-mount, when resizing the window and when the ref changes.

```js
import { useElementSize } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const [elementRef, { width, height }] = useElementSize()

    return (
        <div ref={elementRef}>{`The element width is ${width}px and height ${height}px`}</div>
    )
}
```

## useEventListener

It takes as parameters a eventName, a call-back functions (handler) and optionally a reference element. You can see above two examples using useRef and window based event.

```js
import { useEventListener } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const elementRef = useRef(null)

    const onScroll = (event) => {
      console.log('Window scrolled!', event)
    }

    const onClick = (event) => {
      console.log('Vutton clicked!', event)
    }

    // Example with window based event
    useEventListener('scroll', onScroll)

    // Example with element based event
    useEventListener('click', onClick, elementRef)

    return (
        <button ref={elementRef}>Click me</button>
    )
}
```

## useFetch

The hook aims to retrieve data on an API using the native Fetch API. It takes an url as first parameter and [an options object](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as second one.

```js
import { useFetch } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {

    const url = `https://reqbin.com/echo/post/json`
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Id: 78912,
            Customer: "Jason Sweet",
            Quantity: 1,
            Price: 18.0,
        })
    }
    const { data, error } = useFetch(url, options)

    if (error) return <p>There is an error.</p>
    if (!data) return <p>Loading...</p>

    return <p>{data[0].title}</p>

    return (
        <div>
            (error && "There is an error")
            (!data && "Loading...")
            (data && "Data is here!")
        </div>
    )
}
```

## useLocalStorage

Persist the state with local storage so that it remains after a page refresh. This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter. If the window object is not present, useLocalStorage() will return the default value.

```js
import { useLocalStorage } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const [someProperty, setSomeProperty] = useLocalStorage('someProperty', true)

    const toggleProperty = () => {
        setSomeProperty(prevValue => !prevValue)
    }

    return (
      <button onClick={setSomeProperty}>
        {`The current property value is ${someProperty ? `true` : `false`}`}
      </button>
    )
}
```

## useReadLocalStorage

This hook allows you to read a value from localStorage by its key. It can be useful if you just want to read without passing a default value. If the window object is not present, or if the value doesn't exist, useLocalStorage() will return null.

```js
import { useReadLocalStorage } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const someProperty = useReadLocalStorage('someProperty')

    return (
      <div>
        {`The current property value is ${someProperty ? `true` : `false`}`}
      </div>
    )
}
```
## useScreen

It retrieves `window.screen` object, also works onRezise.

```js
import { useScreen } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {

    const screen = useScreen()

    return (
        <div>
            The current window dimensions are:
            {JSON.stringify({ width: screen.width, height: screen.height })}
        </div>
    )
}
```

## useScript

The hook helps to add an external script to the page. It takes a script's link as a parameter and returns the status of the script (idle, loading, ready, error). Updated when the link changes.

```js
import { useScript } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

let token = "XXX"

export default function Component() {

    const googleMapsState = useScript(
        `https://maps.googleapis.com/maps/api/js?key=${token}&libraries=geometry`
    )

    useEffect(() => {
        if (googleMapsState === "ready") {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            })
        }
    }, [googleMapsState])

    return (
        <div id="map"/>
    )
}
```

## useStyles

The hook helps to add an external script to the page. It takes two parameters an id and inline css code. It returns the status of the script (idle, loading, ready, error). Updated when the inline style changes.

```js
import { useScript } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {

    const customStylesState = useStyles(
        "yourStylesID",
        `
            .element {
                background-color: red;
            }
        `
    )
    return (
        <div className="element"/>
    )
}
```

## useToggle

It takes a parameter with value true or false and toggles that value to opposite.

```js
import { useToggle } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const [isTextChanged, setIsTextChanged] = useToggle()

    return (
        <button onClick={setIsTextChanged}>
            {isTextChanged ? 'Toggled' : 'Click to Toggle'}
        </button>
   )
}
```

## useWindowSize

It returns a window dimension, also works onRezise.

```js
import { useScreen } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {

    const { width, height } = useWindowSize()

    return (
        <div>
            The current window dimensions are: {JSON.stringify({ width, height })}
        </div>
    )
}
```
