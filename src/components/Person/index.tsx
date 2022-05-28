import React from 'react'
import { Props } from './types'
import styles from './styles.module.css'
import { Text } from '@nextui-org/react'

const Person = ({ person }: Props) => {
    const { name, age, dead, gender } = person
    return (
        <div className={`${styles.person} ${styles[gender]}`}>
            <Text>{name}</Text>
            <Text size={12}>{age}</Text>
            {dead && <div className={styles.dead}></div>}
        </div>
    )
}

export default Person
