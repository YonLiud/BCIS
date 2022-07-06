import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../../styles/lookup.module.scss'

import axios from 'axios'

import { useState } from 'react'

export default function Users() {
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        const key = event.target.key.value;
        if (key.length === 0) {
            setError("Key cannot be empty");
            return;
        }
        // if key is not 40 characters long, display error message
        if (key.length !== 40) {
            setError("Key must be 40 characters long");
            return;
        }
        axios.post("/api/user/all", {
            key: key
        }).then(function (response) {
            setUsers(response.data);

        }).catch(function (error) {
            if(error.response.status === 401) {
                setError("Unauthorized");
            }
            else {
                setError("Invalid key");
            }
        })

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BCIS</title>
                <meta name="description" content="Blaine County Indexing System" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Users
                </h1>
                <p className={styles.error}>
                    {error}
                </p>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.input_field}>
                            <label htmlFor='key' className={styles.label}>
                                Key
                            </label>
                            <input className={styles.input} type="text" id="key" name="key" placeholder='Private Key' />
                        </div>
                        <div className={styles.input_field}>
                            <button className={styles.button}>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                {/* if users is null display so */}
                {!users ?
                    <div>
                        <p>No users found</p>
                    </div>
                    :
                    <div className={styles.results}>
                    {users.map(user => (
                        <div className={styles.result} key={user.name}>
                            <div className={styles.name}>
                                <span className={styles.label}>Name</span>: &quot;{user.name}&quot;
                            </div>
                            <div className={styles.permitLevel}>
                                <span className={styles.label}>Permit Level</span>: {user.permitLevel}
                            </div>
                        </div>
                    ))}
                </div>
                }
            </main>
        </div>
    )

}
