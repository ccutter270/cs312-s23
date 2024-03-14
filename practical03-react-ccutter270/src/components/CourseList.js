import styles from "../styles/CourseList.module.css";
import CourseEntry from "./CourseEntry";
import { useState } from "react";

export default function CourseList({ courses }) {
  const [currentCourse, setCurrentCourse] = useState(null);

  // Curly brackets because using JavaScript value inside of JSX
  const items = courses.map((course) => (
    <CourseEntry
      key={course.number}
      course={course}
      currentCourse={currentCourse}
      setCurrentCourse={setCurrentCourse}
    />
  ));

  //console.log(currentCourse)

  return <div className={styles.listContainer}>{items}</div>;
}
