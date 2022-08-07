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
        // check that name is not empty and valid
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
        const key = event.target.vkey.value;
        if (key.length === 0) {
            setError("Key cannot be empty");
            return;
        }
        // check that key is contains only 40 characters
        if (key.length !== 40) {
            setError("Key must be 40 characters long");
            return;
        }
        axios.post("/api/user/add", {
            name,
            vkey: key
        }).then(function (response) {
            console.log(response);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setError("");
                alert("User added successfully, Contact BCIS Management for futher instructions");
                window.location.href = "/admin";
            }
        }
        ).catch(function (error) {
            console.log(error);
            setError("Error creating user, Check console for more info");
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
                Register New User
            </h1>
            <p className={styles.error}>
                {error}
            </p>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_field}>
                        <label htmlFor="vkey">Key</label>
                        <input type="text" id="vkey" name="vkey" placeholder='Private Key' />
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="name">Footage URL</label>
                        <input type="text" id="name" name="name" placeholder='FirstName LastName' />
                        <p className={styles.comment}>
                            Don&apos;t forget to welcome the new user!
                        </p>
                    </div>
                    <div className={styles.input_field}>
                        <button className={styles.button} type="submit">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </main>
        </div>
    )
}
