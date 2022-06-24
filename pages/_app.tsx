import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from '../components/Layout'

function MyApp({Component, pageProps}: AppProps) {
            //     {/*<header>*/}
            // {/*    <script src="https://kit.fontawesome.com/2c0302a3c8.js" crossOrigin="anonymous"></script>*/}
            // {/*</header>*/}

    return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
    )
}


export default MyApp
