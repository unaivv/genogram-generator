/* eslint-disable @typescript-eslint/no-explicit-any */
export const pageview = (url: string) => {
    if (process.env.NEXT_PUBLIC_ENVIROMENT === 'production')
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
            page_path: url,
        })
}

export const event = ({ action, params }: any) => {
    if (process.env.NEXT_PUBLIC_ENVIROMENT === 'production')
        window.gtag('event', action, params)
}
