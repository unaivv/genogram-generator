import React, { useEffect, useState } from 'react'
import { Props } from './types'
import styles from './styles.module.css'
import { Container, Popover, Row, Spacer, Text } from '@nextui-org/react'
import { EditFilled, MoreOutlined, PlusOutlined } from '@ant-design/icons'
import AddPerson from 'components/AddPerson'
import { IPerson } from 'types/Person'

const Person = ({ person, onOpen = () => null, index, setPerson }: Props) => {
    const [personState, setPersonState] = useState<IPerson | null>(person)

    const [isEditting, setIsEditting] = useState(false)
    const [isAddingChild, setIsAddingChild] = useState(false)

    useEffect(() => {
        if (JSON.stringify(person) !== JSON.stringify(personState)) {
            setPersonState(person)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [person])

    useEffect(() => {
        if (
            JSON.stringify(person) !== JSON.stringify(personState) &&
            personState
        ) {
            setPerson(personState, index)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [personState])

    if (!personState)
        return (
            <div className={`${styles.personWrapper} ${styles.add}`}>
                <>
                    <div
                        className={`${styles.person} ${styles.male}`}
                        onClick={onOpen}
                    >
                        <PlusOutlined />
                        <Text size={12}>Add new person</Text>
                    </div>
                </>
            </div>
        )

    const { id, name, age, dead, gender, childrens } = personState

    const editPerson = (person: IPerson) => {
        setPerson(person, index)
    }

    const addChild = (person: IPerson) => {
        setPersonState({
            ...personState,
            childrens: [...(childrens || []), person],
        })
    }

    const editChild = (person: IPerson, index: number) => {
        const newChildrens = [...(childrens || [])]
        newChildrens[index] = person
        setPersonState({
            ...personState,
            childrens: newChildrens,
        })
    }

    return (
        <div className={styles.personWrapper}>
            <>
                <div
                    className={`${styles.person} ${styles[gender]}`}
                    id={`person-${id}`}
                >
                    <Text>{name}</Text>
                    <Text size={12}>{age}</Text>
                    {dead && <div className={styles.dead}></div>}
                    <div className={styles.actions}>
                        <Popover placement="top-left">
                            <Popover.Trigger>
                                <MoreOutlined />
                            </Popover.Trigger>
                            <Popover.Content>
                                <Container style={{ padding: '0.5em 1em' }}>
                                    <Row
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setIsEditting(true)}
                                    >
                                        <EditFilled />
                                        <Spacer x={0.3} />
                                        <Text>Edit</Text>
                                    </Row>
                                    <Row
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setIsAddingChild(true)}
                                    >
                                        <EditFilled />
                                        <Spacer x={0.3} />
                                        <Text>Add Child</Text>
                                    </Row>
                                </Container>
                            </Popover.Content>
                        </Popover>
                    </div>
                    <AddPerson
                        withButton={false}
                        open={isEditting}
                        onClose={() => setIsEditting(false)}
                        isEditting={personState}
                        setPerson={editPerson}
                    />
                    <AddPerson
                        withButton={false}
                        open={isAddingChild}
                        onClose={() => setIsAddingChild(false)}
                        setPerson={addChild}
                    />
                    <div className={styles.childrens}>
                        {childrens && (
                            <>
                                {childrens.map((child, index) => (
                                    <Person
                                        key={child.id}
                                        person={child}
                                        index={index}
                                        setPerson={editChild}
                                    />
                                ))}
                                <AddPerson setPerson={addChild} inBlock />
                            </>
                        )}
                    </div>
                </div>
            </>
        </div>
    )
}

export default Person
