import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html prefix="og: http://ogp.me/ns#">
        <Head >
          {/* Global site tag (gtag.js) - Google Analytics */}
          <Script id="google-analytics-gtag" async src="https://www.googletagmanager.com/gtag/js?id=G-BWZ7WQZ2HP"
            strategy="afterInteractive">
          </Script>
          <Script id='google-analytics' strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BWZ7WQZ2HP');
            `}
          </Script>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.css"
          />
          <link href="https://fonts.googleapis.com/css?family=Gothic+A1:100,200,300,400,500,600,700,800,900" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Blinker:wght@100;200;300;400;600;700;800;900&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument