import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>BCIS</title>
        <meta name="description" content="Blaine County Indexing System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <script dangerouslySetInnerHTML={{ __html: `<!--
        Built by Yonchukku
        https://yonchukku.dev
      -->` }} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Image src="/logo.png" alt="Blaine County Indexing System" width={300} height={300} className={styles.Image} />
        </h1>
        <h2 className={styles.subtitle}>
        Blaine County Indexing System
        </h2>
        <p className={styles.description}>
          Upload, index, and search your patrol recordings and logs.
        </p>

        <p className={styles.description}>
          <Link href="/upload">
            <button className={styles.button}>
              Upload Footage
            </button>
          </Link>
          <Link href="/lookup">
            <button className={styles.button}>
              Lookup Footage
            </button>
          </Link>
          <Link href="/admin">
            <button className={styles.button}>
              Supervisor&apos;s Portal
            </button>
          </Link>
        </p>
      </main>
    </div>
  )
}
