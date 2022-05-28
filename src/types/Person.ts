export type IGender = 'male' | 'female'

export interface IPerson {
    name: string
    age: number
    dead: boolean
    gender: IGender
}
