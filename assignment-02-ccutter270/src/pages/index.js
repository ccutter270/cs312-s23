import { useState } from "react";

import Head from "next/head";
import IndexBar from "../components/IndexBar";
import Article from "../components/Article";

import styles from "../styles/Simplepedia.module.css";

import data from "../../data/seed.json";

export default function Simplepedia() {
  const [collection] = useState(data);
  const [currentArticle, setCurrentArticle] = useState(null);

  // Conditional Rendering

  // If no article selected, don't call Article
  if (currentArticle === null) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Simplepedia</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Simplepedia</h1>
          <IndexBar
            collection={collection}
            setCurrentArticle={setCurrentArticle}
          />
        </main>

        <footer>CS 312 Assignment 2</footer>
      </div>
    );
  }

  // Article has been selected, render article
  else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Simplepedia</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Simplepedia</h1>
          <IndexBar
            collection={collection}
            setCurrentArticle={setCurrentArticle}
          />
          <Article article={currentArticle} />
        </main>

        <footer>CS 312 Assignment 2</footer>
      </div>
    );
  }
}
