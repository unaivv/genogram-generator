import { Button, Modal, Radio, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import styles from './styles.module.css'
import { IRelation } from './types'

const Relation = (): JSX.Element => {
    const relations = {
        veryNarrow: (
            <>
                <div className={styles.simpleBar}></div>
                <div className={styles.simpleBar}></div>
                <div className={styles.simpleBar}></div>
            </>
        ),
        veryNarrowButConflictive: (
            <>
                <div className={styles.simpleBar}></div>
                <div className={styles.simpleBar}></div>
                <div className={styles.simpleBar}></div>
                <div className={styles.zigzagBar}></div>
            </>
        ),
        closeButConflictive: (
            <>
                <div className={styles.simpleBar}></div>
                <div className={styles.simpleBar}></div>
                <div className={styles.zigzagBar}></div>
            </>
        ),
        close: (
            <>
                <div className={styles.simpleBar}></div>
                <div className={styles.simpleBar}></div>
            </>
        ),
        distant: (
            <>
                <div className={styles.dottedBar}></div>
            </>
        ),
        break: (
            <>
                <div className={styles.breakBar}></div>
            </>
        ),
        conflictive: (
            <>
                <div className={styles.zigzagBar}></div>
            </>
        ),
    }

    const [relation, setRelation] = useState<IRelation>('veryNarrow')
    const [modalOpen, setModalOpen] = useState(false)

    const selectRelationHandler = () => {
        setModalOpen(false)
    }

    return (
        <>
            <div className={styles.relation} onClick={() => setModalOpen(true)}>
                {relations[relation]}
            </div>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Modal.Header>
                    <Text size={18}>Edit relation</Text>
                </Modal.Header>
                <Modal.Body>
                    <Radio.Group
                        value={relation}
                        onChange={(value) => setRelation(value as IRelation)}
                    >
                        <Radio value="veryNarrow">Very narrow</Radio>
                        <Radio value="veryNarrowButConflictive">
                            Very narrow but conflictive
                        </Radio>
                        <Radio value="close">Close</Radio>
                        <Radio value="closeButConflictive">
                            Close but conflictive
                        </Radio>
                        <Radio value="conflictive">Conflictive</Radio>
                        <Radio value="distant">Distant</Radio>
                        <Radio value="break">Break</Radio>
                    </Radio.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        auto
                        flat
                        color="error"
                        onPress={() => setModalOpen(false)}
                        bordered
                    >
                        Cancel
                    </Button>
                    <Button auto onPress={selectRelationHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Relation
