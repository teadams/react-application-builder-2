import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { PlayBoard } from "../sudoku/components";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ACS React Appbuilder</title>
        <meta name="description" content="ACS Rach Appbuilder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}></h1>

        <div className={styles.grid}>
          <PlayBoard rows={9} columns={9}></PlayBoard>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
