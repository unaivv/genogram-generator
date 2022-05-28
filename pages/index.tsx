import { Container } from '@nextui-org/react'
import CreateGenogramForm from 'components/CreateGenogramForm'
import GenogramGenerator from 'components/GenogramGenerator'
import type { NextPage } from 'next'
import Head from 'next/head'
import GenogramContext from '../src/hooks/useFormContext'

const Home: NextPage = () => {
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
                    <GenogramContext.Provider>
                        <CreateGenogramForm />
                        <GenogramGenerator />
                    </GenogramContext.Provider>
                </Container>
            </main>
        </div>
    )
}

export default Home
