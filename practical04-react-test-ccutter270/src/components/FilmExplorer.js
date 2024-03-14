import React, { useState, useEffect } from "react";

import FilmTableContainer from "./FilmTableContainer";
import SearchBar from "./SearchBar";




function FilmExplorer({rawData}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("title");
  const [films, setFilms] = useState([]);
  const [ascending, setDirection] = useState(true);

  // load the film data
  useEffect(() => {
    if (rawData){
      setFilms(rawData);
    }
  }, [rawData]);


   // change the rating of a film
   const setRating = (filmid, rating) => {
    const alteredFilms = films.map((film) => {
      if (film.id === filmid) {
        return { ...film, rating };
      }
      return film;
    });
    setFilms(alteredFilms);
  };

  const mainContents =
    films.length === 0 ? (
      <h2>Loading...</h2>
    ) : (
      <FilmTableContainer
        searchTerm={searchTerm}
        films={films}
        sortType={sortType}
        setRatingFor={setRating}
        ascending={ascending}
      />
    );

  return (
    <div className="FilmExplorer">
      <SearchBar
        searchTerm={searchTerm}
        setTerm={setSearchTerm}
        sortType={sortType}
        setType={setSortType}
        ascending={ascending}
        setDirection={setDirection}
      />
      {mainContents}
    </div>
  );
}

export default FilmExplorer;
