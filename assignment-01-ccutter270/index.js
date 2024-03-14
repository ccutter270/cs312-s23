/*
NAME: Caroline Cutter
DATE: Feb 23, 2023

CS 312 Spring 2023 
Programming Assignment 1
*/

/**
 * Return the largest value in an array
 * @param {*[]} arr Non-empty array of comparable values
 * @return {*} Largest value
 */
export const myMax = (arr) => {
  // Helper to reduce
  const getSmaller = (current, value) => {
    return current > value ? current : value;
  };

  // Use Reduce
  const smallest = arr.reduce(getSmaller);

  return smallest;
};

/**
 * Filter objects with field less than or equal to cutoff
 * @param {Object[]} objs Array of objects
 * @param {string} field Object property to filter on
 * @param {*} cutoff Cutoff
 * @return {Object[]} Filtered objects
 */
export const threshold = (objs, field, cutoff) => {
  // Helper to filter
  const threshFunc = (obj) => {
    return obj[field] <= cutoff;
  };

  // Using Filter
  const valid = objs.filter(threshFunc);

  return valid;
};

/**
 * Converts an array of strings of the form
 * "First Last <Email>" to an array of objects of the form
 * {first:'First', last:'Last', email:'Email'}
 *
 * Malformed strings are converted to null.
 *
 * A single string can be passed in without the array wrapper.
 *
 * @param {String[] || String} strings Array of Strings
 * @return {Object[]} converted objects
 */
export const parseEmails = (emails) => {
  // Helper to map
  const emailFunc = (email) => {
    const infoArray = email.split(" ");

    // Checking Validity
    if (infoArray.length < 3 || infoArray.length > 3) {
      return null;
    } else if (
      infoArray[2].charAt(0) !== "<" ||
      infoArray[2].slice(-1) !== ">"
    ) {
      return null;
    } else {
      return {
        first: infoArray[0],
        last: infoArray[1],
        email: infoArray[2].slice(1, -1),
      };
    }
  };

  // USING MAP FUNCTION
  let emailArray = [];

  // If single email address:
  if (typeof emails === "string") {
    emailArray = [emails].map(emailFunc);
  }
  // If array of email addresses
  else {
    emailArray = emails.map(emailFunc);
  }

  // If array of email addresses
  return emailArray;
};

/**
 * Return function that can be used to start an interval timer
 *
 * @param {number[]} lengths Length of intervals
 */
export const intervalAlarm = (intervals) => {
  return () => {
    // Get start time
    const startTime = Date.now();

    // Pre-compute all the timeouts
    let timeout = 0;

    // For each, wait
    intervals.forEach((i) => {
      // Calculate time
      timeout = i * 1000 + timeout;

      setTimeout(
        // Function printer(i)
        () => {
          const elapsed = (Date.now() - startTime) / 1000;
          // eslint-disable-next-line no-console
          console.log(`Interval of ${i}s completed (${elapsed}s elapsed)!`);
        },
        timeout
      );
    });
  };
};

const lodash = require("lodash");

/**
 * Return a copy of windows with a count of the number of individuals available during each
 * time window
 *
 * @param {Object[]} windows Array of objects with time windows
 * @param {Object[]} availability Array of objects with individuals availabilities
 */
export const availabilityCounts = (windows, availabilities) => {
  // Make a deep copy of array (using LoDash
  // Help from ** https://www.geeksforgeeks.org/lodash-_-clonedeep-method/*
  const windowsDeep = lodash.cloneDeep(windows);

  // Helper function - returns True if object fully overlaps, False if not
  const overlap = (obj1, obj2) => {
    if (
      obj1.day === obj2.day &&
      obj1.start >= obj2.start &&
      obj1.end <= obj2.end
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Iterate through the arrays and add counts to DeepCopy
  windowsDeep.forEach((window) => {
    // Set window count to 0
    window.count = 0;

    availabilities.forEach((availability) => {
      if (overlap(window, availability) === true) {
        window.count = window.count + 1;
      }
    });
  });
  return windowsDeep;
};
