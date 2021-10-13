import * as utils from "../src/utils.js";

describe("build Sequential Array function", () => {
  it("builds an array with 3 elements from 0 to 2", () => {
    const length = 3;
    const expected = [0, 1, 2];
    const actual = utils.buildSequentialArray(length);
    expect(actual).toEqual(expected);
  });
  it("builds an array with 5 elements from 0 to 4", () => {
    const length = 5;
    const expected = [0, 1, 2, 3, 4];
    const actual = utils.buildSequentialArray(length);
    expect(actual).toEqual(expected);
  });
  describe("unhappy path", () => {
    it("returns an empty array for length 0", () => {
      const length = 0;
      const expected = [];
      const actual = utils.buildSequentialArray(length);
      expect(actual).toEqual(expected);
    });
  });
});

describe("reverse Array function", () => {
  it("reverses an array with 3 elements from 0 to 2", () => {
    const array = [0, 1, 2];
    const expected = [2, 1, 0];
    const actual = utils.reverseArray(array);
    expect(actual).toEqual(expected);
  });
  it("reverses an array with 5 elements from 0 to 4", () => {
    const array = [0, 1, 2, 3, 4];
    const expected = [4, 3, 2, 1, 0];
    const actual = utils.reverseArray(array);
    expect(actual).toEqual(expected);
  });
  describe("unhappy path", () => {
    it("returns an empty array for length 0", () => {
      const array = [];
      const expected = [];
      const actual = utils.reverseArray(array);
      expect(actual).toEqual(expected);
    });
  });
});
