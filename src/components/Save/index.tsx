import React, { useContext } from 'react'
import html2canvas from 'html2canvas'
import { Button, Text } from '@nextui-org/react'
import styles from './styles.module.css'
import { PreviewContext } from 'hooks/usePreviewContext'

const Save = () => {
    const { isPreview, setIsPreview } = useContext(PreviewContext)
    return (
        <div className={styles.saveButton}>
            <Text>Save as image:</Text>
            <Button
                size="xs"
                onPress={() => {
                    if (!isPreview) setIsPreview(true)
                    setTimeout(() => {
                        html2canvas(
                            document.getElementById('genogram') || document.body
                        ).then((canvas) => {
                            const a = document.createElement('a')
                            a.href = canvas.toDataURL('image/png')
                            a.download = 'genogram.png'
                            a.click()
                        })
                    }, 100)
                }}
            >
                Save
            </Button>
        </div>
    )
}
export default Save
