# react-hooks

A set of useful hooks for prototyping.

## useElementSize

This hook helps you to dynamically get the width and the height of an HTML element. Dimensions are updated on load, on mount/un-mount, when resizing the window and when the ref changes.

```js
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

## useScript

The hook helps to add an external script to the page. It takes a script's link as a parameter and returns the status of the script (idle, loading, ready, error). Updated when the link changes.

```js
let token = "XXX"

export default function Component() {

    const googleMapsState = useElementSize(
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
export default function Component() {

    const customStylesState = useElementSize(
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