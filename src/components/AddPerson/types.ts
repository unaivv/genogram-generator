import { IPerson } from 'types/Person'

export interface IProps {
    setPerson?: (person: IPerson) => void
    inBlock?: boolean
    withButton?: boolean
    open?: boolean
    onClose?: () => void
    isEditting?: IPerson
}
