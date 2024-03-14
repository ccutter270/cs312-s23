import { render, screen } from "@testing-library/react";

import FilmTableContainer from "./FilmTableContainer";

const films = [
  {
    id: 135397,
    overview: "case word substring",
    release_date: "2015-10-02",
    title: "The Title",
    vote_average: 6.9,
  },
  {
    id: 286217,
    overview: "Case",
    release_date: "2014-06-12",
    title: "Word",
    vote_average: 7.7,
  },
  {
    id: 22222,
    overview: "A different film",
    release_date: "2014-09-01",
    title: "Another film",
    vote_average: 9.3,
  },
];

describe("FilmTableContainer", () => {
  let testFilms;

  beforeEach(() => {
    testFilms = films.map((film) => ({ ...film })); // isolate films in case the components alter it (which they shouldn't)
  });

  describe("Filters film by keyword", () => {
    test("Empty string does not filter films", () => {
      render(
        <FilmTableContainer
          films={testFilms}
          searchTerm=""
          sortType="title"
          setRatingFor={jest.fn}
          ascending
        />
      );

      films.forEach((film) => {
        expect(screen.queryByText(film.title)).toBeInTheDocument();
      });
    });

    test("Any substring satisfies the filter", () => {
      render(
        <FilmTableContainer
          films={testFilms}
          searchTerm="sub"
          sortType="title"
          setRatingFor={jest.fn}
          ascending
        />
      );

      expect(screen.queryByText(films[0].title)).toBeInTheDocument();
      expect(screen.queryByText(films[1].title)).not.toBeInTheDocument();
      expect(screen.queryByText(films[2].title)).not.toBeInTheDocument();
    });

    test("Keyword is case insensitive", () => {
      render(
        <FilmTableContainer
          films={testFilms}
          searchTerm="Case"
          sortType="title"
          setRatingFor={jest.fn}
          ascending
        />
      );

      expect(screen.queryByText(films[0].title)).toBeInTheDocument();
      expect(screen.queryByText(films[1].title)).toBeInTheDocument();
      expect(screen.queryByText(films[2].title)).not.toBeInTheDocument();
    });

    test("Title and overview are tested", () => {
      render(
        <FilmTableContainer
          films={testFilms}
          searchTerm="word"
          sortType="title"
          setRatingFor={jest.fn}
          ascending
        />
      );

      expect(screen.queryByText(films[0].title)).toBeInTheDocument();
      expect(screen.queryByText(films[1].title)).toBeInTheDocument();
      expect(screen.queryByText(films[2].title)).not.toBeInTheDocument();
    });
  });

  describe("Sorts films by property", () => {
    // TODO: Add tests of other sort parameters

    test("Sorts by vote_average", () => {
      // TODO: Extend to test ascending vs. descending order
      const { rerender } = render(
        <FilmTableContainer
          films={testFilms}
          searchTerm=""
          sortType="vote_average"
          setRatingFor={jest.fn}
          ascending
        />
      );
      let items = screen
        .queryAllByRole("heading")
        .map((item) => item.textContent);

      expect(items).toEqual([films[0].title, films[1].title, films[2].title]);

      rerender(
        <FilmTableContainer
          films={testFilms}
          searchTerm=""
          sortType="vote_average"
          setRatingFor={jest.fn}
          ascending={false}
        />
      );

      items = screen.queryAllByRole("heading").map((item) => item.textContent);

      expect(items).toEqual([films[2].title, films[1].title, films[0].title]);
    });

    test("Sorts by title", () => {
      const { rerender } = render(
        <FilmTableContainer
          films={testFilms}
          searchTerm=""
          sortType="title"
          setRatingFor={jest.fn}
          ascending
        />
      );
      let items = screen
        .queryAllByRole("heading")
        .map((item) => item.textContent);

      expect(items).toEqual([films[2].title, films[0].title, films[1].title]);

      rerender(
        <FilmTableContainer
          films={testFilms}
          searchTerm=""
          sortType="title"
          setRatingFor={jest.fn}
          ascending={false}
        />
      );

      items = screen.queryAllByRole("heading").map((item) => item.textContent);

      expect(items).toEqual([films[1].title, films[0].title, films[2].title]);
    });

    test("Sorts by release_date", () => {
      const { rerender } = render(
        <FilmTableContainer
          films={testFilms}
          searchTerm=""
          sortType="release_date"
          setRatingFor={jest.fn}
          ascending
        />
      );
      let items = screen
        .queryAllByRole("heading")
        .map((item) => item.textContent);

      expect(items).toEqual([films[1].title, films[2].title, films[0].title]);

      rerender(
        <FilmTableContainer
          films={testFilms}
          searchTerm=""
          sortType="release_date"
          setRatingFor={jest.fn}
          ascending={false}
        />
      );

      items = screen.queryAllByRole("heading").map((item) => item.textContent);

      expect(items).toEqual([films[0].title, films[2].title, films[1].title]);
    });
  });
});
