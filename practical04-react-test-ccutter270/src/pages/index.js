import FilmExplorer from "../components/FilmExplorer";

import filmData from "../../data/films.json";

export default function Home() {
  return <FilmExplorer rawData={filmData} />;
}
