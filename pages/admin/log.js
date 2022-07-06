import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Lookup.module.scss'

import axios from 'axios'

import { useState, useEffect } from 'react'

export default function Log() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("/api/logs").then(function (response) {
            console.log(response.data);
            setLogs(response.data);
            if (response.data.length === 0) {
                setError("No logs found");
            }
        }
        ).catch(function (error) {
            setError("Error getting logs");
            console.log(error);

        }
        )
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>BCIS</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    loGs
                </h1>
                <p className={styles.description}>
                    Note that all times are in UTC.
                </p>
                <p className={styles.error}>
                    {error}
                </p>
                <div className={styles.results}>
                    {logs.map((log, index) => (
                        <div className={styles.result} key={index}>
                            <div>
                                <span className={styles.label}>{log.createdAt}:</span> {log.message}
                            </div>
                            <div>
                                <span className={styles.label}>Database ID</span> {log._id}
                            /</div>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    )

}
