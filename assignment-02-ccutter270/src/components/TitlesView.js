/*
  TitlesView.js

   a list of titles in the current section for the IndexBar

  props:
    articles - a list of article objects
    setCurrentArticle - callback function for setting the current article
*/

export default function TitlesView({ articles, setCurrentArticle }) {
  // Sort Articles, but a copy of them
  const newArticles = [...articles];

  newArticles.sort((article1, article2) => {
    return article1.title.localeCompare(article2.title);
  });

  // Create unordered list
  const articleList = newArticles.map((article) => (
    <li
      key={article}
      data-testid="title"
      onClick={() => setCurrentArticle(article)}
    >
      {article.title}
    </li>
  ));

  // Return list of articles
  return (
    <div>
      <ul>{articleList}</ul>
    </div>
  );
}
