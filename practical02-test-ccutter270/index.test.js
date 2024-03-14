/*
NAME: Caroline Cutter
DATE: Feb 21, 2023

CSCI 312 Spring 2023
PRACTICAL 2: Testing and Linting
*/

import validSong from "./index";

describe("Testing validSong()", () => {
  // Testing valid single notes
  test("validSong: accepts valid notes", () => {
    // Assertion
    const validNotes = ["A", "B", "C", "D", "E", "F", "G"];
    validNotes.forEach((note) => {
      expect(validSong(note)).toBeTruthy();
    });
  });

  // Testing validSong: accepts compound strings
  test("validSong: accepts valid compound strings", () => {
    expect(validSong("A B C D E F G")).toBeTruthy();
  });

  // Testing validSong: rejects invalid characters
  test("validSong: rejects invalid characters", () => {
    expect(validSong("H")).toBeFalsy(); // Checks H (border letter)
    expect(validSong("Z")).toBeFalsy(); // Checks Z (End Alphabet letter)
    expect(validSong("0")).toBeFalsy(); // Checks 0 (number)
    expect(validSong("a")).toBeFalsy(); // Checks a (lowercase)
  });

  // Testing validSong: checks for spacing
  test("validSong: notes must be separated by spaces", () => {
    expect(validSong("AB")).toBeFalsy(); // Checks a (need space)
  });

  // Testing validSong: sharps and flats are accepted
  test("validSong: sharps and flats are accepted", () => {
    const validCompounds = ["A#", "Ab"];
    validCompounds.forEach((note) => {
      expect(validSong(note)).toBeTruthy();
    });
  });

  // Testing validSong: special cases are rejected
  test("validSong: special cases are rejected", () => {
    expect(validSong("B#")).toBeFalsy();
    expect(validSong("Cb")).toBeFalsy();
    expect(validSong("E#")).toBeFalsy();
    expect(validSong("Fb")).toBeFalsy();
  });

  // Debugging Test Case
  test("validSong: debugging case - 'A#BB'", () => {
    expect(validSong("A#BB")).toBeFalsy();
  });
});
