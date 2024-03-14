import { render, screen, fireEvent } from "@testing-library/react";

import FilmExplorer from "./FilmExplorer";

const films = [
  {
    id: 101,
    overview: "The first Thin Man movie",
    release_date: "1934-05-25",
    poster_path: "/rEXmQIgG8aHiZZbYAPdJjZNUxa.jpg",
    title: "The Thin Man",
    vote_average: 7.7,
  },
  {
    id: 102,
    overview: "The second Thin Man movie",
    release_date: "1936-12-25",
    poster_path: "/1fkCHOffEkPOY0UwSrvzG6YKDVp.jpg",
    title: "After the Thin Man",
    vote_average: 7.6,
  },
];

describe("Testing FilmExplorer", () => {
  let testFilms;

  beforeEach(() => {
    testFilms = films.map((film) => ({ ...film }));
  });

  // TODO: Add your smoke and snapshot tests

  test("Smoke test", () => {
    render(<FilmExplorer />);
  });

  test("Snapshot test", () => {
    const { container } = render(<FilmExplorer />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // TODO: Add your "Arrow changes direction" test

  test("Arrow changes direction", () => {
    // 1. Render Film Explorer
    render(<FilmExplorer rawData={testFilms} />);

    // 2. Check that "▲" is in the document
    let arrow = screen.queryByText("▲");
    expect(arrow).toBeInTheDocument();

    // 3. Simulate a click on the up arrow
    fireEvent.click(arrow);

    // 4. Check that "▲" is no longer in the document
    arrow = screen.queryByText("▲");
    expect(arrow).not.toBeInTheDocument();

    // 5. Check that "▼" is in the document
    arrow = screen.queryByText("▼");
    expect(arrow).toBeInTheDocument();

    // 6. Simulates a click on the down arrow
    fireEvent.click(arrow);

    // 7. Check that "▼" is no longer in the document
    arrow = screen.queryByText("▼");
    expect(arrow).not.toBeInTheDocument();

    // 8. Check that "▲" is in the document1.
    arrow = screen.queryByText("▲");
    expect(arrow).toBeInTheDocument();
  });

  test("Rating changes", () => {
    render(<FilmExplorer rawData={testFilms} />);
    let stars = screen.getAllByText("★");

    expect(stars.filter((star) => star.className === "empty")).toHaveLength(10);
    expect(stars.filter((star) => star.className === "filled")).toHaveLength(0);

    fireEvent.click(stars[4]);

    stars = screen.getAllByText("★");
    expect(stars.filter((star) => star.className === "empty")).toHaveLength(5);
    expect(stars.filter((star) => star.className === "filled")).toHaveLength(5);
  });
});
