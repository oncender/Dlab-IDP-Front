import '../styles/globals.scss'
import "../styles/Slider.scss"
import type {AppProps} from 'next/app'
import Layout from '../components/Layout'

function MyApp({Component, pageProps}: AppProps) {
            //     {/*<header>*/}
            // {/*</header>*/}

    return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
    )
}


export default MyApp
