import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { useEffect } from 'react'
import * as ga from 'utils/ga'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
    const darkTheme = createTheme({
        type: 'light',
    })
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            ga.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <NextUIProvider theme={darkTheme}>
            <Component {...pageProps} />
        </NextUIProvider>
    )
}

export default MyApp
