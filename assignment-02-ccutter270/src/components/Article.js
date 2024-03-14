/*
  Article.js

  The Article displays the contents of an article. 

  props:
    article - the article to render (required)
*/

import styles from "../styles/Article.module.css";

export default function Article({ article }) {
  // Reformat the date
  const expectedDate = new Date(article.edited).toLocaleString();

  return (
    // Display the article
    <div className={styles.article}>
      <h2>{article.title}</h2>
      <p>{article.contents}</p>
      <p className={styles.timestamp}>{expectedDate}</p>
    </div>
  );
}
