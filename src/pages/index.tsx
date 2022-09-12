import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {Cell}  from "../sudoku/components"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ACS React Appbuilder</title>
        <meta name="description" content="ACS Rach Appbuilder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Cell ></Cell>
        </h1>

        <div className={styles.grid}>
  
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
