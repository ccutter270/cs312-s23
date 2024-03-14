import Head from "next/head";
import styles from "../styles/Catalog.module.css";
import courses from "../../data/cs-courses.json";
import CourseList from "../components/CourseList";

export default function Catalog() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CS Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">CS Course Catalog</h1>
      </main>

      <div>
        <CourseList courses={courses} />  
      </div>

      <footer>CS312 Practical 3</footer>
    </div>
  );
}
