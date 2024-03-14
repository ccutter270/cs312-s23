import { screen, fireEvent, render } from "@testing-library/react";

import Simplepedia from "../pages/index";
import { toSections } from "../lib/test-utils";

import data from "../../data/seed.json";

describe("End-to-end tests", () => {
  const allSections = toSections(data);
  const sampleArticle = data.find((article) => article.title === "Toujouse");

  beforeEach(() => {
    render(<Simplepedia />);
  });

  test("Displays sections", async () => {
    const items = await screen.findAllByRole("listitem");

    expect(items).toHaveLength(allSections.length);
    allSections.forEach((section) => {
      expect(screen.getByText(section)).toBeVisible();
    });
  });

  test("Selecting title displays article", async () => {
    const targetSection = sampleArticle.title.charAt(0).toUpperCase();
    const section = await screen.findByText(targetSection);

    fireEvent.click(section);
    const title = await screen.findByText(sampleArticle.title);
    fireEvent.click(title);

    expect(screen.queryByText(sampleArticle.contents)).toBeVisible();
  });

  test("Selecting new section hides article", async () => {
    const targetSection = sampleArticle.title.charAt(0).toUpperCase();
    let section = await screen.findByText(targetSection);

    fireEvent.click(section);
    const title = await screen.findByText(sampleArticle.title);
    fireEvent.click(title);

    expect(screen.queryByText(sampleArticle.contents)).toBeVisible();

    section = await screen.findByText("1");
    fireEvent.click(section);
    expect(screen.queryByText(sampleArticle.contents)).toBeNull();
  });
});
