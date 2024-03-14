/*
  IndexBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 
*/

import SectionsView from "./SectionsView";
import TitlesView from "./TitlesView";
import { useState } from "react";

export default function IndexBar({ collection, setCurrentArticle }) {
  const [currentSection, setCurrentSection] = useState(null);

  // Create "sections" object {"A": [titles], "B": [titles] }
  const sections = [];

  collection.forEach((article) => {
    // If section not present, create it
    if (!(article.title[0] in sections)) {
      sections[article.title[0]] = [article];
    }

    // If section is present, add article to list
    else {
      sections[article.title[0]].push(article);
    }
  });

  // Conditional Return Statement

  // If there is no currentSection
  if (currentSection === null) {
    return (
      <div>
        {sections.keys()}
        <SectionsView
          sections={Object.keys(sections)}
          setCurrentSection={setCurrentSection}
        />
        <h1>Please select a section!</h1>
      </div>
    );
  }

  // If there is a current section - Reassigns current article
  else {
    return (
      <div>
        {sections.keys()}
        <SectionsView
          sections={Object.keys(sections)}
          setCurrentSection={(section) => {
            setCurrentSection(section);
            setCurrentArticle(null);
          }}
        />
        <TitlesView
          articles={sections[currentSection]}
          setCurrentArticle={setCurrentArticle}
        />
      </div>
    );
  }
}
