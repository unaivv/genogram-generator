export type IGender = 'male' | 'female'

export interface IPerson {
    id: number
    name: string
    age: string
    dead: boolean
    gender: IGender
    childrens?: IPerson[]
}
