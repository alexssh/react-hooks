import { useState, useEffect } from 'react'

export const useGeolocation = (options?: PositionOptions, watch: boolean = false) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<GeolocationPositionError>()
    const [position, setPosition] = useState<GeolocationPosition>()

    const successCallback: PositionCallback = (position: GeolocationPosition) => {
        setLoading(false)
        setPosition(position)
    }

    const errorCallback: PositionErrorCallback = (positionError: GeolocationPositionError) => {
        setLoading(false)
        setError(positionError)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
    }, [])

    useEffect(() => {
        if (watch) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)

            const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options)

            return () => {
                navigator.geolocation.clearWatch(watchId)
            }
        }

    })

    return { loading, error, position }
}
