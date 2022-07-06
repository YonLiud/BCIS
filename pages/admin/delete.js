import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Form.module.scss'

import axios from 'axios'

import { useState } from 'react'

export default function AddUser() {
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.name.value;

        if (name.length === 0) {
            setError("Name cannot be empty");
            return;
        }
        // check that name is contains only 2 words
        if (name.split(" ").length !== 2) {
            setError("Name must be in the format of `first last`");
            return;
        }
        // check that key is not empty and valid
        const key = event.target.key.value;
        if (key.length === 0) {
            setError("Key cannot be empty");
            return;
        }
        // check that key is contains only 40 characters
        if (key.length !== 40) {
            setError("Key must be 40 characters long");
            return;
        }
        axios.post('/api/user/delete', {
            name: name,
            key: key
        }).then(res => {
            console.log(res.data);
            setError("");
            window.location.href = "/admin";
        })
        .catch(err => {
            
        }
        );
    }
    return (
        <div className={styles.container}>
        <Head>
            <title>BCIS</title>
            <meta name="url" content="Blaine County Indexing System" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <main className={styles.main}>
            <h1 className={styles.title}>
                Delete User
            </h1>
            <p className={styles.error}>
                {error}
            </p>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_field}>
                        <label htmlFor="key">Key</label>
                        <input type="text" id="key" name="key" placeholder='Private Key' />
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="name">User Name</label>
                        <input type="text" id="name" name="name" placeholder='FirstName LastName' />
                        <p className={styles.comment}>
                            Name must be exactly as written in the BCIS database, to ensure the user name is correct. please visit the <Link href="/admin/users"><a>users page</a></Link> to see the current user names.
                        </p>
                    </div>
                    <div className={styles.input_field}>
                        <button className={styles.button} type="submit">
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </main>
        </div>
    )
}
