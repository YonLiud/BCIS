import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Home.module.scss'

export default function Admin() {
    return (
        <div className={styles.container}>
            <Head>
                <title>BCIS</title>
                <meta name="description" content="Blaine County Indexing System" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        <main className={styles.main}>
            <div className={styles.title}>
                <div className={styles.image}>
                    <Image src="/logo.png" alt="Blaine County Indexing System" width={200} height={200} />
                </div>
            </div>
            <h1 className={styles.title}>
                Supervisor&#39;s Portal
            </h1>
            <h2 className={styles.subtitle2}>
                Any unauthorized use of this system is prohibited and will be prosecuted.
            </h2>
            <p className={styles.description}>
                All actions are logged and monitored. Do not attempt to bypass the security of this system.
            </p>

            <p className={styles.description}>
                <Link href="/admin/add">
                    <button className={styles.button}>
                        Register User
                    </button>
                </Link> 
                <Link href="/admin/users">
                    <button className={styles.button}>
                        View Users
                    </button>
                </Link>
                <Link href="/admin/delete">
                    <button className={styles.button}>
                        Delete User
                    </button>
                </Link>
                <Link href="/admin/elevate">
                    <button className={styles.button}>
                        Elevate User
                    </button>
                </Link>
                <Link href="/admin/log">
                    <button className={styles.button}>
                        View Logs
                    </button>
                </Link>
            </p>


        </main>
        </div>
    )
}