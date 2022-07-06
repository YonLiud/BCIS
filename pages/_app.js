import '../styles/globals.scss'
import style from '../styles/globals.scss'
import headerStyle from '../styles/Header.module.scss'
import footerStyle from '../styles/Footer.module.scss'

import Link from 'next/link'
import { useRouter } from 'next/router'

var CurrentPath = () => {
  const Router = useRouter()
  return Router.pathname
}

function MyApp({ Component, pageProps }) {

  return (
    <>
  <div className={headerStyle.header}>
    <h1 className={headerStyle.title}>
      BCIS <span className={headerStyle.code}>{CurrentPath()}</span>
    </h1>
    <div className={headerStyle.nav}>
      {/* if path is not homepage, add a button to return home */}
      {CurrentPath() !== '/' && (
        <>
          <Link href="/">
            <a className={headerStyle.button}>
              Home
            </a>
          </Link>
          <Link href="/admin">
            <a className={headerStyle.button}>
              Admin
            </a>
          </Link>
        </>
      )}
    </div>
  </div>
  <div className={style.content}>
  <Component {...pageProps} />
  </div>
  {/* <div className={footerStyle.footer}>
    <p>
      &copy; 2020 BCIS
    </p>
  </div> */}

  </>
  )
}

export default MyApp
