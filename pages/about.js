import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>BCIS</title>
                <meta name="description" content="Blaine County Indexing System" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <Image src="/logo.png" alt="Blaine County Indexing System" width={300} height={300} className={styles.Image} />
                </h1>
                <h2 className={styles.subtitle}>
                    Built by <a href='https://yonchukku.dev'>Yonchukku Developments<div className={styles.yon} ><Image src="https://www.yonchukku.dev/Circle.png" alt="Yonchukku Logo" width={100} height={100}/></div></a>
                </h2>
                <p className={styles.description}>
                    For <a href="https://vitalrp.co.uk/">Vital Roleplay&apos;s</a> Blaine County Sheriff Department with &lt;3.<br />
                    Under the CJ Ryan&apos;s Administration. 
                </p>
                <h1 className={styles.title}>
                    
                </h1>
            </main>
        </div>
    )
}