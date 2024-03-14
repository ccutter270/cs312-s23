import styles from "../styles/CourseEntry.module.css";

export default function CourseEntry({
  course,
  currentCourse,
  setCurrentCourse,
}) {
  let summaryStyle = "";

  // Set Style
  if (course === currentCourse) {
    summaryStyle = styles.current;
  }

  // Check Pre-Req's
  if (currentCourse && currentCourse.prerequisites) {
    currentCourse.prerequisites.forEach((req) => {
      if (req === course.number) {
        summaryStyle = styles.prereq;
      } else if (req.or) {
        req.or.forEach((altreq) => {
          if (altreq === course.number) {
            summaryStyle = styles.prereq;
          }
        });
      }
    });
  }
  return (
    <details
      className={styles.description}
      onMouseEnter={() => setCurrentCourse(course)}
    >
      <summary className={summaryStyle}>
        CSCI {course.number} - {course.name}{" "}
      </summary>
      <p>{course.description}</p>
    </details>
  );
}
