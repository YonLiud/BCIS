import axios from 'axios';
import Head from 'next/head'

import styles from '../../styles/Form.module.scss'

import { useState } from 'react';
import { set } from 'mongoose';

export default function New() {
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        var Key
        var URL
        var comments = null
        var tags = ''

        // if key or url are empty, return error
        if (event.target.elements.key.value === "" || event.target.elements.url.value === "") {
            setError("Key and URL are required")
            return
        }
        else {
            Key =       event.target.elements.key.value
            URL =       event.target.elements.url.value
            comments =  event.target.elements.comment.value
            tags =      event.target.elements.tags.value
        }

        // check if key is 32 characters long
        if (Key.length !== 40) {
            setError(`Key must be 40 characters long`);
            return;
        }

        // check if url is valid
        if (!URL.match(/^(http|https):\/\/[^ "]+$/)) {
            setError(`URL must contain a valid protocol`);
            return;
        }
        
        // parse tags
        var tags = tags.toLowerCase()
        
        var tagArray = tags.split(',')

        

        // send request to server
        axios.post('/api/report/new', {
            key: Key,
            URI: URL,
            comments: comments,
            tags: tagArray
        })
            .then(function (response) {
                console.log(response);
                setError("Uploaded Successfully");
                // redirect to homepage
                window.location.href = "/complete";

            }
            )
            .catch(function (error) {
                // if error is 401, return error
                if (error.response.status === 401) {
                    setError("Unauthorized Access Is Forbidden");
                }
                else {
                    setError("Something went wrong");
                    console.log(error);
                }
            }
        )
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
                Add Entry
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
                        <label htmlFor="url">Footage URL</label>
                        <input type="text" id="URL" name="url" placeholder='https://url' />
                        <p className={styles.comment}>
                            *We suggest uploading the video to <a href='https://vimeo.com/'>Vimeo</a> or <a href="https://youtube.com">YouTube</a>.
                        </p>
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="comment">Comments</label>
                        <textarea id="comment" name="comment" placeholder='Optional' />
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="tags">Tags</label>
                        <input type="text" id="tags" name="tags" placeholder='Bank,Robbery,etc'/>
                        <p className={styles.comment}>
                            *Separate tags with commas.
                        </p>
                    </div>
                    <div className={styles.input_field}>
                        <button className={styles.button} type="submit">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </main>
        </div>
    )
    }