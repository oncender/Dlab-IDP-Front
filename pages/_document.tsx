import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html prefix="og: http://ogp.me/ns#">
        <Head >
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.css"
          />
          <link rel='stylesheet' href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' type='text/css'/>
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