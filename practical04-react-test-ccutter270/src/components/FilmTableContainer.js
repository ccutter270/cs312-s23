import React from "react";
import PropTypes from "prop-types";

import FilmTable from "./FilmTable";

function FilmTableContainer({
  films,
  searchTerm,
  sortType,
  setRatingFor,
  ascending,
}) {
  let displayedFilms = [...films];
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    displayedFilms = displayedFilms.filter((film) => {
      const title = film.title.toLowerCase();
      const desc = film.overview.toLowerCase();
      const date = film.release_date;
      return title.includes(term) || desc.includes(term) || date.includes(term);
    });
  }

  if (sortType) {
    displayedFilms.sort((m1, m2) => {
      if (m1[sortType] < m2[sortType]) {
        return ascending ? -1 : 1;
      } else if (m1[sortType] === m2[sortType]) {
        return 0;
      }
      return ascending ? 1 : -1;
    });
  }

  return <FilmTable films={displayedFilms} setRatingFor={setRatingFor} />;
}

FilmTableContainer.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string,
  sortType: PropTypes.string,
  setRatingFor: PropTypes.func.isRequired,
  ascending: PropTypes.bool.isRequired,
};

FilmTableContainer.defaultProps = {
  searchTerm: null,
  sortType: null,
};

export default FilmTableContainer;
