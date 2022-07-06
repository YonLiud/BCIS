import Head from 'next/head'
import styles from '../../styles/Home.module.scss'


export default function notFound() {
    function handleClick() {
        window.location.href = '/';
    }
    return (
      <div className={styles.container}>
        <Head>
          <title>BCIS</title>
          <meta name="description" content="Oops, look's like you tried finding a file that does not exist!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title} style={{fontFamily: "Razed"}}>
            404
          </h1>
          <h2 className={styles.subtitle}>
          Blaine County Indexing System
          </h2>
          <p className={styles.description} >
            The page you are looking for does not exist.
          </p>
          <p>
            <button className={styles.button} onClick={handleClick}>
              Return Home
            </button>
          </p>
        </main>
      </div>
    )
  }