/*
NAME: Caroline Cutter
DATE: Feb 21, 2023

CSCI 312 Spring 2023
PRACTICAL 2: Testing and Linting
*/

// Test Driven Development (TDD)

const validSong = (song) => {
  const validNotes = ["A", "B", "C", "D", "E", "F", "G"];
  const badNotes = ["B#", "Cb", "E#", "Fb"];

  // helper to test individual notes
  const validNote = (note) => {
    // make sure the first character is valid
    let valid = validNotes.includes(note[0]);

    // check the second character
    if (note.length === 2) {
      // make sure the second character is  "#" or "b"
      valid = valid && (note[1] === "#" || note[1] === "b");

      // make sure it isn't a bad note
      valid = valid && !badNotes.includes(note);

      // If note is greater than 2 characters
    } else if (note.length > 2) {
      valid = false;
    }

    return valid;
  };

  // convert the string to an array of notes
  const songList = song.split(" ");

  // every returns true if the passed in function returns true for every value
  const valid = songList.every(validNote);

  return valid;
};

export default validSong;
