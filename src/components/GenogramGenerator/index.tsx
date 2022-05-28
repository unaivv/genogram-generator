import { Row } from '@nextui-org/react'
import AddPerson from 'components/AddPerson'
import Person from 'components/Person'
import React from 'react'
import { IPerson } from 'types/Person'

const GenogramGenerator = () => {
    const [persons, setPersons] = React.useState<IPerson[]>([])

    const addPerson = (person: IPerson) => {
        setPersons([...persons, person])
    }

    const updatePerson = (person: IPerson, index: number) => {
        const newPersons = [...persons]
        newPersons[index] = person
        setPersons(newPersons)
    }

    const renderEmpty = () => {
        return (
            <>
                <AddPerson setPerson={addPerson} />
            </>
        )
    }

    const renderPersons = () => {
        return (
            <Row
                justify="center"
                align="center"
                style={{ gap: 20, marginTop: '4em' }}
            >
                {persons.map((person, index) => {
                    return (
                        <Person
                            key={index}
                            person={person}
                            index={index}
                            setPerson={updatePerson}
                        />
                    )
                })}
            </Row>
        )
    }

    return <div>{!persons.length ? renderEmpty() : renderPersons()}</div>
}

export default GenogramGenerator
