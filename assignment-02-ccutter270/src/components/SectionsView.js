/*
  SectionsView.js

   a list of sections for the IndexBar

  props:
    sections - a list of sections
    setCurrentSection - callback function for reporting when a selection is selected 
*/

// IMPORTS
import styles from "../styles/SectionsView.module.css";
import React from "react";

export default function SectionsView({ sections, setCurrentSection }) {
  // Copy sections to not modify props
  const newSections = [...sections].sort();

  // Create ordered list of sections
  const sectionsList = newSections.map((section) => (
    <li
      key={section}
      data-testid="section"
      onClick={() => setCurrentSection(section)}
    >
      {section}
    </li>
  ));

  // Return unordered list (Top Bar)
  return (
    <div className={styles.sectionList}>
      <ul>{sectionsList}</ul>
    </div>
  );
}
