import {
    Button,
    Input,
    Modal,
    Text,
    Row,
    Switch,
    Radio,
} from '@nextui-org/react'
import Person from 'components/Person'
import React, { useEffect, useState } from 'react'
import { IGender } from 'types/Person'
import { IProps } from './types'

const AddPerson = ({
    setPerson = () => null,
    inBlock = false,
    withButton = true,
    onClose = () => null,
    open = false,
    isEditting,
    customText,
}: IProps) => {
    const [visible, setVisible] = useState(open)

    const [name, setName] = useState(isEditting ? isEditting.name : '')
    const [age, setAge] = useState(isEditting ? isEditting.age : '')
    const [dead, setDead] = useState(isEditting ? isEditting.dead : false)
    const [gender, setGender] = useState<IGender>(
        isEditting ? isEditting.gender : 'male'
    )
    const childrens = isEditting ? isEditting.childrens : []

    useEffect(() => {
        setVisible(open)
    }, [open])

    const closeHandler = () => {
        setVisible(false)
        onClose()
    }

    const openHandler = () => {
        setVisible(true)
    }

    const resetState = () => {
        if (!isEditting) {
            setName('')
            setAge('')
            setDead(false)
            setGender('male')
        }
    }

    const createHandler = () => {
        setPerson({
            id: +new Date(),
            name,
            age,
            dead,
            gender,
            childrens: childrens,
        })
        closeHandler()
        resetState()
    }

    return (
        <div>
            {withButton && (
                <>
                    {inBlock ? (
                        <Person
                            person={null}
                            onOpen={openHandler}
                            index={0}
                            setPerson={() => null}
                            customText={customText}
                        />
                    ) : (
                        <Button onPress={openHandler}>
                            {isEditting ? 'Edit' : 'Add'} person
                        </Button>
                    )}
                </>
            )}
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text size={18}>
                        {isEditting ? 'Edit' : 'Add new'} person
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Name"
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createHandler()
                            }
                        }}
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Age"
                        required={true}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        label="Age"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createHandler()
                            }
                        }}
                    />
                    <Radio.Group
                        onChange={(value) => setGender(value as IGender)}
                        row
                        value={gender}
                    >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                    </Radio.Group>
                    <Row align="center">
                        <Switch
                            style={{ marginRight: '1em' }}
                            checked={dead}
                            onChange={(e) => setDead(e.target.checked)}
                        />
                        <Text>Is dead?</Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        auto
                        flat
                        color="error"
                        onPress={closeHandler}
                        bordered
                    >
                        Cancel
                    </Button>
                    <Button auto onPress={createHandler}>
                        {isEditting ? 'Edit' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddPerson
