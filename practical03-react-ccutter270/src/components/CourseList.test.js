import {screen, render} from "@testing-library/react";
import CourseList from "./CourseList";


const sampleCourses = [{
  number:100,
  name:"Sample course 1",
  description:"Course description 1"
},
{
  number:200,
  name:"Sample course 2",
  description:"Course description 2"
},
{
  number:300,
  name:"Sample course 13",
  description:"Course description 3"
}];


describe("CourseList tests", ()=>{
  test("Course names are displayed", ()=>{
    render(<CourseList courses={sampleCourses} />);

    sampleCourses.forEach((course)=>{
      const expectedTitle = `CSCI ${course.number} - ${course.name}`;
       expect(screen.getByText(expectedTitle)).toBeVisible();
    });
  });
});
