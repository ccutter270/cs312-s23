import IndexBar from "./IndexBar";
import { screen, fireEvent, render } from "@testing-library/react";

import { articles, sampleSections } from "../lib/test-utils";

describe("IndexBar initialization", () => {
  test("Handles empty array without error", () => {
    const handler = jest.fn();
    render(<IndexBar collection={[]} setCurrentArticle={handler} />);
  });
});

describe("IndexBar tests", () => {
  let setCurrentArticleFunction;

  beforeEach(() => {
    setCurrentArticleFunction = jest.fn();
    render(
      <IndexBar
        collection={[...articles]}
        setCurrentArticle={setCurrentArticleFunction}
      />
    );
  });

  test("Generates sections from article list", async () => {
    const items = await screen.findAllByRole("listitem");

    expect(items).toHaveLength(sampleSections.length);
    sampleSections.forEach((section) => {
      expect(screen.getByText(section)).toBeVisible();
    });
  });

  test("Clicking on a section displays titles", async () => {
    const section = await screen.findByText(sampleSections[0]);

    fireEvent.click(section);

    const titles = await screen.findAllByTestId("title");

    const expectedArticles = articles.filter(
      (article) => article.title.charAt(0).toUpperCase() === sampleSections[0]
    );

    expect(titles).toHaveLength(expectedArticles.length);

    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeVisible();
    });
  });

  test("Changing sections changes the titles", async () => {
    let section = await screen.findByText(sampleSections[0]);

    fireEvent.click(section);

    section = await screen.findByText(sampleSections[1]);

    fireEvent.click(section);

    const titles = await screen.findAllByTestId("title");
    const expectedArticles = articles.filter(
      (article) => article.title.charAt(0).toUpperCase() === sampleSections[1]
    );
    expect(titles).toHaveLength(expectedArticles.length);

    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeVisible();
    });
  });

  test("Clicking a title setCurrentArticles the article", async () => {
    const section = await screen.findByText("D");
    fireEvent.click(section);
    const title = await screen.findByText("Dalek");

    fireEvent.click(title);

    expect(setCurrentArticleFunction).toHaveBeenCalledWith(articles[4]);
  });
});
