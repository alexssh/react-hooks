# react-hooks-framer

A set of useful hooks for prototyping and development collected from all over the Internet.

### Getting started in your react project

Install [the package](https://www.npmjs.com/package/react-hooks-pack): `npm i react-hooks-framer`. These hooks are ready to use in [Framer](https://www.framer.com/showcase/project/8hFHiJFebfB0pRBQ1ZYI/) / [Instant NPM](https://www.framer.com/sites/npm/).

```js
// Getting started in your react project

import {
    useElementSize,
    useEventListener,
    useScript,
    useStyles
} from "react-hooks-framer"
```

---

- [useAsync](https://github.com/alexssh/react-hooks#useasync)
- [useDebounce](https://github.com/alexssh/react-hooks#usedebounce)
- [useDeviceDetect](https://github.com/alexssh/react-hooks#usedevicedetect)
- [useElementSize](https://github.com/alexssh/react-hooks#useelementsize)
- [useEventListener](https://github.com/alexssh/react-hooks#useeventlistener)
- [useFetch](https://github.com/alexssh/react-hooks#usefetch)
- [useFirstMount](https://github.com/alexssh/react-hooks#usefirstmount)
- [useGeolocation](https://github.com/alexssh/react-hooks#usegeolocation)
- [useInterval](https://github.com/alexssh/react-hooks#useinterval)
- [useKeyPress](https://github.com/alexssh/react-hooks#usekeypress)
- [useLocalStorage](https://github.com/alexssh/react-hooks#uselocalstorage)
- [useOnClickOutside](https://github.com/alexssh/react-hooks#useonclickoutside)
- [useOnScreen](https://github.com/alexssh/react-hooks#useonscreen)
- [usePrevious](https://github.com/alexssh/react-hooks#useprevious)
- [useReadLocalStorage](https://github.com/alexssh/react-hooks#usereadlocalstorage)
- [useScreen](https://github.com/alexssh/react-hooks#usescreen)
- [useScript](https://github.com/alexssh/react-hooks#usescript)
- [useStyles](https://github.com/alexssh/react-hooks#usestyles)
- [useTheme](https://github.com/alexssh/react-hooks#usetheme)
- [useToggle](https://github.com/alexssh/react-hooks#usetoggle)
- [useWhyDidYouUpdate](https://github.com/alexssh/react-hooks#usewhydidyouupdate)
- [useWindowSize](https://github.com/alexssh/react-hooks#usewindowsize)


## useAsync

This hook helps to indicate the status of any async request. The hooks takes an async function as the first parameter and a boolean value as the second one to determine runtime immediately after rendering a component. The hook returns the value, error, and status value. Possible values for status property are: `idle`, `pending`, `success`, `error`.

```js
import { useAsync } from "react-hooks-framer"

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

This hook helps to limit re-rendering of a component too many times. It uses two parameters: value and debounce time (ms).


```js
import { useDebounce } from "react-hooks-framer"

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

This hook helps to detect a platform, system and rendering type.


```js
import { useDeviceDetect } from "react-hooks-framer"

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

This hook helps you to dynamically get width and height of an HTML element. Dimensions are updated on load, on mount/un-mount, when resizing the window and when the ref changes.

```js
import { useElementSize } from "react-hooks-framer"

export default function Component() {
    const [elementRef, { width, height }] = useElementSize()

    return (
        <div ref={elementRef}>
            {`The element width is ${width}px and height ${height}px`}
        </div>
    )
}
```

## useEventListener

This hook helps to add any event listeners to your components. This hook does all the associated actions: checking if addEventListener is supported, adding the event listener, and removal it on cleanup. It takes as parameters an event name, a call-back function (handler) and optionally an element reference.

```js
import { useEventListener } from "react-hooks-framer"

export default function Component() {
    const elementRef = useRef(null)

    const onScroll = (event) => {
      console.log('Window scrolled!', event)
    }

    const onClick = (event) => {
      console.log('Button clicked!', event)
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

The hook aims to retrieve data on an API using the native Fetch API. It takes an API url as the first parameter and [an options object](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options) as the second one.

```js
import { useFetch } from "react-hooks-framer"

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

## useFirstMount

This hook allows you to determine if the render of the component in which it is called is the first one, or new renders have already occurred. Basically, it can be useful for executing code once in a component, regardless of its further renders.

```js
import { useFirstMount } from "react-hooks-framer"

export default function Component() {
    const { isFirstMount } = useFirstMount()

    return (
        <div>
            {isFirstMount && ("First mount!")}
            {!isFirstMount && ("The component has been mounted again!")}
        </div>
    )
}
```

## useGeolocation

This hook makes it easy to detect the user's location. It takes two parameters: [options](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) and watch (infinite position tracking).

```js
import { useGeolocation } from "react-hooks-framer"

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

This hook helps to use `setInterval` in functional React component with the same API. Set your callback function as a first parameter and a delay (in milliseconds) for the second argument. You can also stop the timer passing null instead the delay.

```js
import { useInterval } from "react-hooks-framer"

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

This hook makes it easy to detect when a user is pressing the specific key on their keyboard.

```js
import { useKeyPress } from "react-hooks-framer"

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

This hooks helps to persist the state with the local storage so that it remains after a page refresh. This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter. If the window object is not present, `useLocalStorage()` will return the default value.

```js
import { useLocalStorage } from "react-hooks-framer"

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

This hook helps to listen any clicks outside of a specified element.

```js
import { useOnClickOutside } from "react-hooks-framer"

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

## useOnScreen

This hook allows you to easily detect when an element is visible on the screen as well as specify how much of the element should be visible before being considered on screen. It takes a reference, an offset value, and a threshold value as parameters.

```js
import { useOnScreen } from "react-hooks-framer"

export default function Component() {
    const ref = useRef()
    const onScreen = useOnScreen(ref, "-300px", 0);

    return (
        <div>
            <div style={{ height: "100vh" }}>
                <h1>Scroll down to next section 👇</h1>
            </div>
            <div
                ref={ref}
                style={{
                    height: "100vh",
                    backgroundColor: onScreen ? "#23cebd" : "#efefef"
                }}
            >
                {onScreen ? (<h1>Hey I am on the screen</h1>) : <h1>Scroll down 👇</h1>}
            </div>
        </div>
    )
}
```

## usePrevious

This hook helps storing the previous value.

```js
import { usePrevious } from "react-hooks-framer"

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

This hook allows you to read a value from `localStorage` by its key. It can be useful if you just want to read without passing the default value. If the window object is not present, or if the value doesn't exist, `useLocalStorage()` will return null.

```js
import { useReadLocalStorage } from "react-hooks-framer"

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

This hook helps to retrieve the `window.screen` object. Also, it works when `onRezise` is triggered.

```js
import { useScreen } from "react-hooks-framer"

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
import { useScript } from "react-hooks-framer"

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

The hook helps to add styles to the page. It takes two parameters an id and inline css code. It returns the status of the script (`idle`, `loading`, `ready`, `error`). It will be updated when inline styles changes.

```js
import { useScript } from "react-hooks-framer"

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
        <div className="element">Hello world!</div>
    )
}
```

## useTheme

This hook makes it easy to dynamically change the appearance of your app using CSS variables. It gets an object of css variables as a parameter.

```js
import { useTheme } from "react-hooks-framer"

const theme_light = {
  "button-background": "#6772e5",
}

const theme_dark = {
  "button-background": "#d1d4f1",
}

export default function Component() {

    const [theme, setTheme] = useState("theme_light")

    useTheme(theme)

    return (
        <div>
            <button
                className="button"
                onClick={() => setTheme("theme_light" ? "theme_dark" : "theme_light")}
            >
                Button
            </button>
        </div>
   )
}
```

## useToggle

This hooks helps to toggle a boolean value.

```js
import { useToggle } from "react-hooks-framer"

export default function Component() {
    const [toggle, setToggle] = useToggle()

    return (
        <button onClick={setToggle}>
            {toggle ? 'True' : 'False'}
        </button>
   )
}
```

## useWhyDidYouUpdate

This hook makes it easy to see which prop changes are causing a component to re-render.

```js
import { useWhyDidYouUpdate } from "react-hooks-framer"

export default function Component() {
    useWhyDidYouUpdate("Component", props)

    return <div style={props.style}>{props.count}</div>
}
```

## useWindowSize

This hook returns a window's size. Also, it works when `onRezise` is triggered.

```js
import { useScreen } from "react-hooks-framer"

export default function Component() {
    const { width, height } = useWindowSize()

    return (
        <div>
            The current window dimensions are: {JSON.stringify({ width, height })}
        </div>
    )
}
```
