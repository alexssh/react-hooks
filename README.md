# react-hooks-framer

A set of useful hooks for prototyping and development collected from all over the Internet.

### Getting started in Framer

The hooks are ready to use in [Framer](https://www.framer.com/showcase/project/8hFHiJFebfB0pRBQ1ZYI/).


```js
import {
    useElementSize,
    useEventListener,
    useScript,
    useStyles
} from "https://alexssh.github.io/react-hooks/release/latest/index.js"
```


### Getting started in your react project

Install [the package](https://www.npmjs.com/package/react-hooks-pack): `npm i react-hooks-framer`

```js
// Getting started in your react project

import {
    useElementSize,
    useEventListener,
    useScript,
    useStyles
} from "react-hooks-framer"
```

## useAsync

This hook helps to indicate the status of any async request. The hooks takes an async function as the first parameter and boolean as the second one to to determine runtime immediately after rendering a component. The hook returns the value, error, and status values. Possible values for status prop are: `idle`, `pending`, `success`, `error`.

```js
import { useAsync } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const { execute, status, value, error } = useAsync(myFunction, false)

    return (
        <div>
            {status === "idle" && <div>Start your journey by clicking a button</div>}
            {status === "success" && <div>{value}</div>}
            {status === "error" && <div>{error}</div>}
            <button onClick={execute} disabled={status === "pending"}>
                {status !== "pending" ? "Click me" : "Loading..."}
            </button>
        </div>
    )
}

// An async function for testing our hook.
// Will be successful 50% of the time.
const myFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rnd = Math.random() * 10
            rnd <= 5
            ? resolve("Submitted successfully 🙌")
            : reject("Oh no there was an error 😞")
        }, 2000)
    })
}

```

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

## useDeviceDetect

React hook to detect the device type. This hook is able to detect mobile, desktop, android, iOS device and the type of rendering.


```js
import { useDeviceDetect } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {

    const detectMobile = useDeviceDetect()

    return (
        <div>
            <div>{`isAndroid`: ${detectMobile.isAndroid}}</div>
            <div>{`isIos`: ${detectMobile.isIos}}</div>
            <div>{`isMobile`: ${detectMobile.isMobile}}</div>
            <div>{`isDesktop`: ${detectMobile.isDesktop}}</div>
            <div>{`isSSR`: ${detectMobile.isSSR}}</div>
        </div>
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

## useGeolocation

This hook makes it easy to detect the user's location. It takes two parameters: [options](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) and watch (infinite position tracking).

```js
import { useGeolocation } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const happyPress = useGeolocation({ enableHightAccuracy: true }, false)

    return (
        <div>
            {error && ("Something went wrong")}
            {loading && ("Loading...")}
            {position && `Your location: ${position.coords.latitude} lat, ${position.coords.longitude} lng`}
        </div>
    )
}
```

## useInterval

Use setInterval in functional React component with the same API. Set your callback function as a first parameter and a delay (in milliseconds) for the second argument. You can also stop the timer passing null instead the delay.

```js
import { useInterval } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const [count, setCount] = useState(0)

    useInterval(() => {
        setCount(count + 1)
    }, 1000)

    return (
        return <div>{`It counts every 1s: ${count}`}</div>
    )
}
```

## useKeyPress

This hook makes it easy to detect when the user is pressing a specific key on their keyboard.

```js
import { useKeyPress } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const happyPress = useKeyPress("h")

    return (
        <div>
            {happyPress && "😊"}
        </div>
    )
}
```

## useLocalStorage

Persist the state with local storage so that it remains after a page refresh. This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter. If the window object is not present, `useLocalStorage()` will return the default value.

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

## useOnClickOutside

React hook for listening for clicks outside of a specified element.

```js
import { useOnClickOutside } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const elementRef = useRef(null)

    const handleClickOutside = () => {
        // Your custom logic here
        console.log('Clicked outside')
    }

    const handleClickInside = () => {
        // Your custom logic here
        console.log('Clicked inside')
    }

    useOnClickOutside(elementRef, handleClickOutside)

    return (
        <button ref={elementRef} onClick={handleClickInside}>Click on me!</button>
    )
}
```

## usePrevious

It uses the `useRef` hook internally for storing the previous value.

```js
import { usePrevious } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    const [count, setCount] = useState(0)
    const prevCount = usePrevious(count)

    return (
        <div>
            <h1>
                Now: {count}, before: {prevCount}
            </h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}
```

## useReadLocalStorage

This hook allows you to read a value from `localStorage` by its key. It can be useful if you just want to read without passing a default value. If the window object is not present, or if the value doesn't exist, `useLocalStorage()` will return null.

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

The hook helps to add an external script to the page. It takes a script's link as a parameter and returns the status of the script (`idle`, `loading`, `ready`, `error`). Updated when the link changes.

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

The hook helps to add an external script to the page. It takes two parameters an id and inline css code. It returns the status of the script (`idle`, `loading`, `ready`, `error`). Updated when the inline style changes.

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

## useTheme

This hook makes it easy to dynamically change the appearance of your app using CSS variables.

```js
import { useTheme } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

const theme = {
  "button-padding": "16px",
  "button-font-size": "14px",
  "button-border-radius": "4px",
  "button-border": "none",
  "button-color": "#FFF",
  "button-background": "#6772e5",
  "button-hover-border": "none",
  "button-hover-color": "#FFF",
}

export default function Component() {
    useTheme(theme)

    return (
        <div>
            <button className="button">Button</button>
        </div>
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

## useWhyDidYouUpdate

This hook makes it easy to see which prop changes are causing a component to re-render.

```js
import { useWhyDidYouUpdate } from "https://alexssh.github.io/react-hooks/release/latest/index.js"

export default function Component() {
    useWhyDidYouUpdate("Component", props)

    return <div style={props.style}>{props.count}</div>
}
```

## useWindowSize

It returns a window dimension, also works `onRezise`.

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
