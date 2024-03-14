import { screen, render, fireEvent } from "@testing-library/react";
import CourseEntry from "./CourseEntry";

const sampleCourse = {
  number: 100,
  name: "Sample course",
  description: "Course description"
};

describe("CourseEntry tests", () => {

  test("Course name toggles description", () => {
    const expectedTitle = `CSCI ${sampleCourse.number} - ${sampleCourse.name}`
    render(<CourseEntry course={sampleCourse} />);
    let title = screen.queryByText(expectedTitle);
    expect(title).toBeVisible();
    expect(screen.queryByText(sampleCourse.description)).not.toBeVisible();
    fireEvent.click(title);
    expect(screen.queryByText(sampleCourse.description)).toBeVisible();
    title = screen.queryByText(expectedTitle);
    fireEvent.click(title);
    expect(screen.queryByText(sampleCourse.description)).not.toBeVisible();
  });

  test("Current course is displayed course", () => {
    render(<CourseEntry course={sampleCourse} currentCourse={sampleCourse} />);
    const summary = screen.getByText(sampleCourse.name, { exact: false });
    expect(summary).toHaveClass("current");
    expect(summary).not.toHaveClass("prereq");
  });

  test("Current course has no prerequisites", () => {
    const currentCourse = {
      number: 200,
      name: "Sample course",
      description: "Course description"
    };
    render(<CourseEntry course={sampleCourse} currentCourse={currentCourse} />);
    const summary = screen.getByText(sampleCourse.name, { exact: false });
    expect(summary).not.toHaveClass("current");
    expect(summary).not.toHaveClass("prereq");
  });

  test("This course is not in current prerequisites", () => {
    const currentCourse = {
      number: 200,
      name: "Sample course",
      description: "Course description",
      prerequisites: [101, 140]
    };
    render(<CourseEntry course={sampleCourse} currentCourse={currentCourse} />);
    const summary = screen.getByText(sampleCourse.name, { exact: false });
    expect(summary).not.toHaveClass("current");
    expect(summary).not.toHaveClass("prereq");
  });

  test("Prerequisite indicated", () => {
    const currentCourse = {
      number: 200,
      name: "Sample course",
      description: "Course description",
      prerequisites: [100, 140]
    };
    render(<CourseEntry course={sampleCourse} currentCourse={currentCourse} />);
    const summary = screen.getByText(sampleCourse.name, { exact: false });
    expect(summary).not.toHaveClass("current");
    expect(summary).toHaveClass("prereq");
  });

  test("Prerequisite choice indicated", () => {
    const currentCourse = {
      number: 200,
      name: "Sample course",
      description: "Course description",
      prerequisites: [{ or: [100, 140] }]
    };
    render(<CourseEntry course={sampleCourse} currentCourse={currentCourse} />);
    const summary = screen.getByText(sampleCourse.name, { exact: false });
    expect(summary).not.toHaveClass("current");
    expect(summary).toHaveClass("prereq");
  });

});
