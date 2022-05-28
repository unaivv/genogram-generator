import { Container } from '@nextui-org/react'
import GenogramGenerator from 'components/GenogramGenerator'
import type { NextPage } from 'next'
import Head from 'next/head'

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
                    <GenogramGenerator />
                </Container>
            </main>
        </div>
    )
}

export default Home
