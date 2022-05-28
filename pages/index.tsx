import { Button, Container, Row, Spacer, Text } from '@nextui-org/react'
import GenogramGenerator from 'components/GenogramGenerator'
import PreviewContext from 'hooks/usePreviewContext'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
    const [start, setStart] = useState(false)
    return (
        <div>
            <Head>
                <title>Genogram Generator</title>
                <meta name="description" content="Generate genograms" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Container>
                    <h1>Genogram generator 👪</h1>
                </Container>
            </header>
            <main>
                <Container>
                    <h3>Welcome to the best online genogram generator!</h3>
                    <Text>Remember to start at the highest level</Text>
                    <Spacer />
                    {!start ? (
                        <Row
                            style={{ height: '60vh' }}
                            align="center"
                            justify="center"
                        >
                            <Button size="xl" onPress={() => setStart(true)}>
                                Start!
                            </Button>
                        </Row>
                    ) : (
                        <PreviewContext.Provider>
                            <GenogramGenerator />
                        </PreviewContext.Provider>
                    )}
                </Container>
            </main>
        </div>
    )
}

export default Home
