import React, { useEffect, useState } from 'react'
import { Props } from './types'
import styles from './styles.module.css'
import { Container, Popover, Row, Spacer, Text } from '@nextui-org/react'
import {
    EditFilled,
    EditOutlined,
    MoreOutlined,
    PlusOutlined,
    StarFilled,
    StarOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons'
import AddPerson from 'components/AddPerson'
import { IPerson } from 'types/Person'
import Relation from 'components/Relation'

const Person = ({
    person,
    onOpen = () => null,
    index,
    setPerson,
    customText,
}: Props) => {
    const [personState, setPersonState] = useState<IPerson | null>(person)
    const [partner, setPartner] = useState<IPerson | null>(null)
    const [main, setMain] = useState<boolean>(false)

    const [isEditting, setIsEditting] = useState(false)
    const [isAddingChild, setIsAddingChild] = useState(false)
    const [popOverVisible, setPopOverVisible] = useState(false)
    const [isAddingPartner, setIsAddingPartner] = useState(false)

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
                        <Text size={12}>{customText || 'Add new person'}</Text>
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

    const updatePartner = (partner: IPerson) => {
        setPartner(partner)
    }

    return (
        <div className={styles.personWrapper}>
            <>
                <div
                    className={`${styles.person} ${styles[gender]} ${
                        main ? styles.main : ''
                    }`}
                    id={`person-${id}`}
                >
                    <Text>{name}</Text>
                    <Text size={12}>{age}</Text>
                    {dead && <div className={styles.dead}></div>}
                    <div className={styles.actions}>
                        <Popover
                            placement="top-left"
                            isOpen={popOverVisible}
                            shouldCloseOnInteractOutside={() => true}
                            onClose={() => setPopOverVisible(false)}
                        >
                            <Popover.Trigger>
                                <MoreOutlined
                                    onClick={() => setPopOverVisible(true)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Popover.Trigger>
                            <Popover.Content>
                                <Container style={{ padding: '0.5em 1em' }}>
                                    <Row
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setIsEditting(true)
                                            setPopOverVisible(false)
                                        }}
                                    >
                                        <EditOutlined />
                                        <Spacer x={0.3} />
                                        <Text>Edit</Text>
                                    </Row>
                                    <Row
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setIsAddingChild(true)
                                            setPopOverVisible(false)
                                        }}
                                    >
                                        <UsergroupAddOutlined />
                                        <Spacer x={0.3} />
                                        <Text>Add Child</Text>
                                    </Row>
                                    <Row
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setIsAddingPartner(true)
                                            setPopOverVisible(false)
                                        }}
                                    >
                                        <UserAddOutlined />
                                        <Spacer x={0.3} />
                                        <Text>Add partner</Text>
                                    </Row>
                                    <Row
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setMain(!main)
                                            setPopOverVisible(false)
                                        }}
                                    >
                                        {main ? (
                                            <StarFilled />
                                        ) : (
                                            <StarOutlined />
                                        )}
                                        <Spacer x={0.3} />
                                        <Text>
                                            {main ? 'Unmark' : 'Mark'} as main
                                        </Text>
                                    </Row>
                                </Container>
                            </Popover.Content>
                        </Popover>
                    </div>
                    <AddPerson
                        setPerson={setPartner}
                        withButton={false}
                        open={isAddingPartner}
                        onClose={() => setIsAddingPartner(false)}
                    />
                </div>
                {partner && (
                    <>
                        <Person
                            person={partner}
                            index={0}
                            setPerson={updatePartner}
                        />
                        <Relation />
                    </>
                )}
                {childrens && childrens.length > 0 && (
                    <>
                        <div
                            className={`${styles.childrens} ${
                                !partner ? styles.unique : ''
                            }`}
                        >
                            <div className={styles.childsBar}>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                            </div>
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
                        </div>
                    </>
                )}
            </>
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
        </div>
    )
}

export default Person
