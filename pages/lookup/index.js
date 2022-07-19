import styles from '../../styles/lookup.module.scss'


import Head from 'next/head';
import Link from 'next/link';

import { useState } from 'react';
import axios from 'axios';


export default function Lookup() {
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        // check that key is not empty
        if (event.target.elements.key.value === "") {
            setError("Key is required");
            return;
        } 
        // send request to server
        axios.post('/api/report/lookup', {
            key: event.target.elements.key.value
        })
            .then(function (response) {
                console.log(response);
                setResults(response.data.reports);
                console.log(response.data.reports);
                setError(null);

                if (response.data.reports.length === 0) {
                    setError("No reports found");
                }
            }
            )
            .catch(function (error) {
                // if error is 401, return error
                if (error.response.status === 401) {
                    setError("Unauthorized Access Is Forbidden");
                }
                else {
                    setError(error.message);
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
                lookup_
            </h1>
            <p className={styles.error}>
                {error}
            </p>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_field}>
                        <label htmlFor="key">
                            Key:
                            <input type="text" id="key" placeholder='Private Key' />
                        </label>
                    </div>
                    <div className={styles.input_field}>
                        <button className={styles.button} type="submit">
                            Search
                        </button>
                        <p className={styles.comment}>
                            This will return all reports that were uploaded with the key.
                        </p>
                    </div>
                    <div className={styles.input_field}>
                        <Link href="/lookup/tags">
                            <button className={styles.button} type="button">
                                lookup_tags
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            <div className={styles.results}>

                {/* if not result */}
                {results===null || results.length < 0 ? (
                    <p>Empty / No Results</p>
                ) : (<>
                    <h1>
                        Total Results: <span className={styles.num}>{results.length}</span>
                    </h1>
                    <div className={styles.grid}>
                        {results.map(result => (
                            <div className={styles.result}  key={result.createdAt}>
                                <div className={styles.result_uri}>
                                    <span className={styles.label}>Link</span> <a href={result.URI}>{result.URI}</a>
                                </div>
                                <div className={styles.result_name}>
                                    <span className={styles.label}>Name</span> {result.name}
                                </div>
                                {result.tags.length === 0 ? (
                                    <div className={styles.result_tags}>
                                        <span className={styles.label}>Tags</span> <span className={styles.num}>No Tags</span>
                                    </div>
                                ) : (
                                        <div className={styles.result_tags}>
                                            <span className={styles.label}>Tags</span> {result.tags.join(', ')}
                                        </div>
                                )}
                                {result.comments !== "" ? (
                                    <div className={styles.result_comments}>
                                        <span className={styles.label}>Comments</span> {result.comments}
                                    </div>
                                ) : (
                                        <div className={styles.result_comments}>
                                            <span className={styles.label}>No Comments</span>
                                        </div>
                                )}
                                <div className={styles.result_createdAt}>
                                    <span className={styles.label}>Created At</span> {result.createdAt}
                                </div>
                                <div className={styles.result_id}>
                                    <span className={styles.label}>_id</span> {result._id}
                                </div>
                            </div>
                        ))}
                </div>
                </>
                )}
            </div>
        </main>
        </div>
    )
}