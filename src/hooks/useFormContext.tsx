import React, { createContext, useState } from 'react'
import { IPerson } from 'types/Person'

interface GenogramContextInterface {
    persons: IPerson[]
}

export interface ContextValue {
    genogramState: GenogramContextInterface | null
    updateGenogramState: (genogramState: GenogramContextInterface) => void
}

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

const initialValue = {
    genogramState: null,
    updateGenogramState: () => null,
}

export const GenogramStateContext = createContext<ContextValue>(initialValue)

const Provider = ({ children }: Props) => {
    const [genogramState, updateGenogramState] =
        useState<GenogramContextInterface | null>(null)

    const value = {
        genogramState,
        updateGenogramState,
    }

    return (
        <GenogramStateContext.Provider value={value}>
            {children}
        </GenogramStateContext.Provider>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { Provider, Consumer: GenogramStateContext.Consumer }
