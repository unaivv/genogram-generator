import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Row, Switch, Text } from '@nextui-org/react'
import AddPerson from 'components/AddPerson'
import Person from 'components/Person'
import Save from 'components/Save'
import { PreviewContext } from 'hooks/usePreviewContext'
import React, { useContext } from 'react'
import { IPerson } from 'types/Person'
import styles from './styles.module.css'

const GenogramGenerator = () => {
    const [persons, setPersons] = React.useState<IPerson[]>([])
    const { isPreview, setIsPreview } = useContext(PreviewContext)

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
                id="genogram"
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

    return (
        <div>
            {!persons.length ? renderEmpty() : renderPersons()}
            <div className={styles.previewButton}>
                <Text>Preview:</Text>
                <Switch
                    checked={isPreview}
                    size="xl"
                    iconOn={<EyeOutlined />}
                    iconOff={<EyeInvisibleOutlined />}
                    onChange={(e) => setIsPreview(e.target.checked)}
                />
            </div>
            <Save />
        </div>
    )
}

export default GenogramGenerator
