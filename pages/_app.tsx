import '../styles/globals.scss'
import "../styles/Slider.scss"
import "../styles/Card.scss"
import type {AppProps} from 'next/app'
import Layout from '../components/Layout'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

function MyApp({Component, pageProps}: AppProps) {
    usePageViews();
    
    return (
            <Layout>
                <GoogleAnalytics />
                <Component {...pageProps} />
            </Layout>
    )
}


export default MyApp
