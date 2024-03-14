export const articles = [
  {
    title: "Alpha Centauri",
    contents: "An alien diplomat with an enormous egg shaped head",
    edited: "2017-05-08",
  },
  {
    title: "Dominators",
    contents: "Galactic bullies with funny robot pals.",
    edited: "2017-05-08",
  },
  {
    title: "Cybermen",
    contents:
      "Once like us, they have now replaced all of their body parts with cybernetics",
    edited: "2017-05-08",
  },
  {
    title: "Auton",
    contents: "Platic baddies driven by the Nestine consciousness",
    edited: "2017-05-08",
  },
  {
    title: "Dalek",
    contents: "Evil little pepperpots of death",
    edited: "2017-05-08",
  },
];

export const sampleSections = [
  ...new Set(articles.map((article) => article.title.charAt(0).toUpperCase())),
].sort();

const toSection = function titleToSection(article) {
  return article.title[0].toUpperCase();
};

export const toSections = function articlesToSections(arts) {
  // Use set to "deduplicate" sections
  const sections = new Set();
  arts.forEach((article) => {
    if (article.title) {
      sections.add(toSection(article));
    }
  });
  // Return array of sorted section headers
  return Array.from(sections).sort();
};
