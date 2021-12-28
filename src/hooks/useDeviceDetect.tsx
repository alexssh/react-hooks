import { useEffect } from 'react'

export const useDeviceDetect = () => {

    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

    const isSSR = (): boolean => Boolean(userAgent.match(/SSR/i))

    const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i))
    const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i))

    const isMobile = (): boolean => Boolean(isAndroid() || isIos())
    const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR())

    return {
        isAndroid,
        isIos,
        isMobile,
        isDesktop,
        isSSR
    }
}

export default useDeviceDetect
