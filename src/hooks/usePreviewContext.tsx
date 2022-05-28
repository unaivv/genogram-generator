import { createContext, useState } from 'react'

interface IPreviewContext {
    isPreview: boolean
    setIsPreview: (isPreview: boolean) => void
}

export const PreviewContext = createContext<IPreviewContext>({
    isPreview: false,
    setIsPreview: () => null,
})

const Provider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const [isPreview, setIsPreview] = useState(false)

    const value = {
        isPreview,
        setIsPreview,
    }

    return (
        <PreviewContext.Provider value={value}>
            {children}
        </PreviewContext.Provider>
    )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { Provider, Consumer: PreviewContext.Consumer }
