import {
    Button,
    Input,
    Modal,
    Text,
    Row,
    Switch,
    Radio,
} from '@nextui-org/react'
import { GenogramStateContext } from 'hooks/useFormContext'
import React, { useContext, useState } from 'react'
import { IGender } from 'types/Person'

const AddPerson = () => {
    const [visible, setVisible] = useState(false)
    const { updateGenogramState, genogramState } =
        useContext(GenogramStateContext)

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [dead, setDead] = useState(false)
    const [gender, setGender] = useState<IGender>('male')

    const closeHandler = () => {
        setVisible(false)
    }

    const openHandler = () => {
        setVisible(true)
    }

    const resetState = () => {
        setName('')
        setAge(0)
        setDead(false)
        setGender('male')
    }

    const createHandler = () => {
        updateGenogramState({
            persons: [
                ...(genogramState?.persons || []),
                {
                    name,
                    age,
                    dead,
                    gender,
                },
            ],
        })
        closeHandler()
        resetState()
    }

    return (
        <div>
            <Button onPress={openHandler}>Add person</Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text size={18}>Add new person</Text>
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
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Age"
                        required={true}
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        label="Age"
                    />
                    <Radio.Group
                        onChange={(value) => setGender(value as IGender)}
                        row
                        value="male"
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
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddPerson
