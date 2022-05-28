import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react'

function MyApp({ Component, pageProps }: AppProps) {
    const darkTheme = createTheme({
        type: 'light',
    })
    return (
        <NextUIProvider theme={darkTheme}>
            <Component {...pageProps} />
        </NextUIProvider>
    )
}

export default MyApp
