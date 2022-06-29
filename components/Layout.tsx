import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: any) {
  return (
    <div >
      {/* <Header /> */}
      <main>{children}
      </main>
      {/*<Footer />*/}
    </div>
  )
}
