import Header from "@components/Header"
import useSession from "@lib/session"
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css"
import SSRProvider from 'react-bootstrap/SSRProvider'
import "./_app.css"

export default function App({ Component, pageProps }) {
    const session = useSession()
    const newPageProps = {
        ...pageProps,
        session
    }
    return (
        <>
            <Header>
                <Link href="/" passHref>
                    SeatSurfer
                </Link>
            </Header>

            <main className="page">
                <SSRProvider>
                    <Component {...newPageProps} />
                </SSRProvider>
            </main>
        </>
    )
}