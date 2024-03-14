/*
  This is a collection of sample tests that will test the examples provided in the
  assignment. You can run them with 'npm test'. Feel free to add your own tests,
  the pattern should be fairly obvious.
  */

import {
  myMax,
  threshold,
  parseEmails,
  intervalAlarm,
  availabilityCounts,
} from "./index";

describe("Test myMax", () => {
  test("myMax: assignment example", () => {
    expect(myMax([1, 2, 3])).toBe(3);
  });

  test("myMax: handles single value", () => {
    expect(myMax([1])).toBe(1);
  });

  test("myMax: doesn't rely on order", () => {
    expect(myMax([3, 1, 2])).toBe(3);
  });

  test("myMax: handles identical values", () => {
    expect(myMax([1, 1, 2, 2])).toBe(2);
  });

  test("myMax: uses reduce", () => {
    const arr = [1, 2, 3];
    const spy = jest.spyOn(arr, "reduce");
    myMax(arr);
    expect(spy).toHaveBeenCalled();
  });

  test("myMax: doesn't use Math.max", () => {
    const arr = [1, 2, 3];
    const spy = jest.spyOn(Math, "max");
    myMax(arr);
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("Test threshold", () => {
  test("threshold: assignment example", () => {
    expect(
      threshold(
        [
          { x: 4, y: 5 },
          { x: 2, y: 9 },
          { x: 1, y: 1 },
        ],
        "y",
        5
      )
    ).toEqual([
      { x: 4, y: 5 },
      { x: 1, y: 1 },
    ]);
  });

  test("threshold: handles empty array", () => {
    expect(threshold([], "y", 5)).toEqual([]);
  });

  test("threshold: handles a bogus field", () => {
    expect(
      threshold(
        [
          { x: 4, y: 5 },
          { x: 2, y: 9 },
          { x: 1, y: 1 },
        ],
        "z",
        5
      )
    ).toEqual([]);
  });

  test("threshold: uses filter", () => {
    const arr = [{ x: 1 }];
    const spy = jest.spyOn(arr, "filter");
    expect(threshold(arr, "x", 1)).toEqual([{ x: 1 }]);
    expect(spy).toHaveBeenCalled();
  });
});

describe("Test parseEmails", () => {
  test("parseEmails: single address", () => {
    const results = parseEmails("Patrick Troughton <ptroughton@prydon.edu>");

    expect(results).toHaveLength(1);
    expect(results[0].first).toBe("Patrick");
    expect(results[0].last).toBe("Troughton");
    expect(results[0].email).toBe("ptroughton@prydon.edu");
  });

  test("parseEmails: multiple addresses", () => {
    const input = [
      "Patrick Troughton <ptroughton@prydon.edu>",
      "Jodi Whittaker <jwhittaker@prydon.edu>",
      "Tom Baker <tbaker@prydon.edu>",
    ];

    const results = parseEmails(input);

    expect(results).toHaveLength(3);

    expect(results[0].first).toBe("Patrick");
    expect(results[0].last).toBe("Troughton");
    expect(results[0].email).toBe("ptroughton@prydon.edu");

    expect(results[1].first).toBe("Jodi");
    expect(results[1].last).toBe("Whittaker");
    expect(results[1].email).toBe("jwhittaker@prydon.edu");

    expect(results[2].first).toBe("Tom");
    expect(results[2].last).toBe("Baker");
    expect(results[2].email).toBe("tbaker@prydon.edu");
  });

  test("parseEmails: invalid strings in list return null", () => {
    const input = [
      "Patrick <ptroughton@prydon.edu>",
      "Jodi Whittaker <jwhittaker@prydon.edu>",
      "Jon Pertwee",
      "Peter Capaldi pcapaldi@prydon.edu",
      "Peter Davidson <pdavidson@prydon.edu",
      "Matt Smith msmith@prydon.edu>",
      "Tom Baker <tbaker@prydon.edu>",
    ];
    const results = parseEmails(input);

    expect(results).toHaveLength(input.length);

    expect(results[0]).toBeNull();
    expect(results[2]).toBeNull();
    expect(results[3]).toBeNull();
    expect(results[4]).toBeNull();
    expect(results[5]).toBeNull();

    expect(results[1].first).toBe("Jodi");
    expect(results[1].last).toBe("Whittaker");
    expect(results[1].email).toBe("jwhittaker@prydon.edu");

    expect(results[6].first).toBe("Tom");
    expect(results[6].last).toBe("Baker");
    expect(results[6].email).toBe("tbaker@prydon.edu");
  });

  test("parseEmails: invalid strings individually return null", () => {
    const input = [
      "Patrick <ptroughton@prydon.edu>",
      "Jon Pertwee",
      "Peter Capaldi pcapaldi@prydon.edu",
      "Peter Davidson <pdavidson@prydon.edu",
      "Matt Smith msmith@prydon.edu>",
    ];

    input.forEach((item) => {
      const results = parseEmails(item);
      expect(results).toHaveLength(1);
      expect(results[0]).toBeNull();
    });
  });

  test("parseEmails: uses map", () => {
    const input = [
      "Patrick Troughton <ptroughton@prydon.edu>",
      "Jodi Whittaker <jwhittaker@prydon.edu>",
      "Tom Baker <tbaker@prydon.edu>",
    ];
    const spy = jest.spyOn(input, "map");
    parseEmails(input);
    expect(spy).toHaveBeenCalled();
  });
});

describe("Test intervalTime", () => {
  /*
    A recent change to jest and mocking timers has altered how we test this function.
    The concept is that which timer is used is an implementation detail, so we should
    look at the behavior instead. 
  
    To check the behavior, we will step through time and look at when console.log
    is called and what it is called with.
    */

  let log;

  beforeAll(() => {
    log = jest.spyOn(global.console, "log");
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    log.mockReset();
  });
  /**
   * Check that an interval is properly called.
   *
   * This advances timer to right before the call and makes sure it hasn't happened.
   * Then it steps over the threshold to make sure it has.
   * @param {number} interval
   */
  const testInterval = (interval, elapsed) => {
    log.mockReset();
    jest.advanceTimersByTime(interval * 1000 - 1);
    expect(log).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(log).toHaveBeenCalledTimes(1);
    const regex = new RegExp(
      `^Interval of ${interval}s completed \\(${elapsed}s elapsed\\)!`
    );
    expect(log).toBeCalledWith(expect.stringMatching(regex));
  };

  test("intervalTime: function returns another function", () => {
    const intervals = [1, 1, 1];
    const alarm = intervalAlarm(intervals);
    expect(typeof alarm).toBe("function");
  });

  test("intervalTime: alarms only fire after function call and time passes", () => {
    const intervals = [1, 1, 1];
    const alarm = intervalAlarm(intervals);
    expect(typeof alarm).toBe("function");
    expect(log).not.toHaveBeenCalled();
    alarm();
    jest.advanceTimersByTime(3000);
    expect(log).toHaveBeenCalledTimes(3);
  });

  test("intervalTime: assignment example", () => {
    const intervals = [1, 0.5, 0.8];
    const alarm = intervalAlarm(intervals);

    alarm();
    let elapsed = 0;
    intervals.forEach((interval) => {
      elapsed += interval;
      testInterval(interval, elapsed);
    });
  });

  test("intervalTime: alarm is reusable", () => {
    const intervals = [1, 0.5, 0.8];
    const alarm = intervalAlarm(intervals);

    alarm();

    let elapsed = 0;
    intervals.forEach((interval) => {
      elapsed += interval;
      testInterval(interval, elapsed);
    });

    alarm();
    elapsed = 0;
    intervals.forEach((interval) => {
      elapsed += interval;
      testInterval(interval, elapsed);
    });
  });
});

describe("Test availabilityCounts", () => {
  test("availabilityCounts: Assignment examples", () => {
    expect(
      availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 },
        ],
        [{ day: 2, start: 480, end: 555 }]
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 1 },
      { day: 2, start: 840, end: 855, count: 0 },
    ]);
  });

  test("availabilityCounts: availability spans multiple windows", () => {
    expect(
      availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 },
        ],
        [
          { day: 2, start: 0, end: 1000 },
          { day: 3, start: 0, end: 1000 },
        ]
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 1 },
      { day: 2, start: 840, end: 855, count: 1 },
    ]);
  });

  test("availabilityCounts: handles edge conditions", () => {
    expect(
      availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 },
        ],
        [
          { day: 2, start: 480, end: 494 },
          { day: 2, start: 481, end: 495 },
          { day: 2, start: 400, end: 480 },
          { day: 2, start: 855, end: 955 },
        ]
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 0 },
      { day: 2, start: 840, end: 855, count: 0 },
    ]);
  });

  test("availabilityCounts: returns a deep copy of its windows argument", () => {
    const arg = [
      { day: 2, start: 480, end: 495 },
      { day: 2, start: 840, end: 855 },
    ];
    availabilityCounts(arg, [{ day: 2, start: 480, end: 555 }]);
    expect(arg).toEqual([
      { day: 2, start: 480, end: 495 },
      { day: 2, start: 840, end: 855 },
    ]);
  });

  test("availabilityCounts: handles empty windows", () => {
    const arg = [];
    expect(availabilityCounts(arg, [{ day: 2, start: 480, end: 555 }])).toEqual(
      []
    );
  });

  test("availabilityCounts: handles empty availabilities", () => {
    expect(
      availabilityCounts(
        [
          { day: 2, start: 480, end: 495 },
          { day: 2, start: 840, end: 855 },
        ],
        []
      )
    ).toEqual([
      { day: 2, start: 480, end: 495, count: 0 },
      { day: 2, start: 840, end: 855, count: 0 },
    ]);
  });
});
