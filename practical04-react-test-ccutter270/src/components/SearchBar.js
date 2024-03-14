import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/SearchBar.module.css";

function SearchBar({
  searchTerm,
  sortType,
  ascending,
  setTerm,
  setType,
  setDirection,
}) {
  const searchField = (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(event) => {
        setTerm(event.target.value);
      }}
    />
  );

  const sortTool = (
    <select
      className={styles.select}
      value={sortType}
      onChange={(event) => {
        setType(event.target.value);
      }}
    >
      <option value="title">Title</option>
      <option value="release_date">Date</option>
      <option value="vote_average">TMDB Rating</option>
    </select>
  );

  const direction = (
    <span
      className={styles.arrow}
      onClick={() => {
        setDirection((currAscending) => !currAscending);
      }}
    >
      {ascending ? "▲" : "▼"}
    </span>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Film Explorer!</h1>
      <div className={styles.contents}>
        {searchField}
        <p>
          order by {sortTool} {direction}
        </p>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  ascending: PropTypes.bool.isRequired,
  setTerm: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setDirection: PropTypes.func.isRequired,
};

export default SearchBar;
