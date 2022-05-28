import { Grid } from '@nextui-org/react'
import Person from 'components/Person'
import { GenogramStateContext } from 'hooks/useFormContext'
import React, { useContext } from 'react'
import { IPerson } from 'types/Person'

const GenogramGenerator = () => {
    const { genogramState } = useContext(GenogramStateContext)
    if (!genogramState?.persons) return <></>
    const { persons } = genogramState

    const renderPersons = (persons: IPerson[]) => {
        return persons.map((person, index) => {
            return (
                <Grid xs={2} key={index}>
                    <Person person={person} />
                </Grid>
            )
        })
    }

    return (
        <div>
            <Grid.Container gap={2} justify="center">
                {renderPersons(persons)}
            </Grid.Container>
        </div>
    )
}

export default GenogramGenerator
