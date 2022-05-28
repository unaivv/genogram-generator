import { IPerson } from 'types/Person'

export interface Props {
    person: IPerson | null
    onOpen?: () => void
    index: number
    setPerson: (person: IPerson, index: number) => void
}
