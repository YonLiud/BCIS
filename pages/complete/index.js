import styles from '../../styles/Complete.module.scss'


import Head from 'next/head';
import Link from 'next/link';

export default function Complete() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Complete</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Complete
                </h1>
                <p className={styles.description}>
                    You have successfully uploaded your report.<br />
                </p>
                <p className={styles.subtitle}>
                    Thank you for your contribution to the BCIS.
                </p>

                <p className={styles.subtitle}>
                    <Link href="/">
                        <button className={styles.button}>
                            <a>Home</a>
                        </button>

                    </Link>
                </p>
            </main>
        </div>
    );
}