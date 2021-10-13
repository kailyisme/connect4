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
  describe("edge cases", () => {
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
  describe("edge cases", () => {
    it("returns an empty array for length 0", () => {
      const array = [];
      const expected = [];
      const actual = utils.reverseArray(array);
      expect(actual).toEqual(expected);
    });
  });
  describe("side effects",()=>{
    it("does not mutate original array",()=>{
      const array1 = [];
      const array2 = [0, 1, 2, 3, 4];
      const array3 = [4, 3, 2, 1, 0];
      const expected1 = [];
      const expected2 = [0, 1, 2, 3, 4];
      const expected3 = [4, 3, 2, 1, 0];
      utils.reverseArray(array1);
      utils.reverseArray(array2);
      utils.reverseArray(array3);
      expect(array1).toEqual(expected1);
      expect(array2).toEqual(expected2);
      expect(array3).toEqual(expected3);
    })
  })
});

describe("title / capitalise first letter function", () => {
  it("capitalises only the first letter of a string", () => {
    const string1 = "test";
    const string2 = "another string";
    const string3 = "anotherstring";
    const expected1 = "Test";
    const expected2 = "Another string";
    const expected3 = "Anotherstring";
    const actual1 = utils.title(string1);
    const actual2 = utils.title(string2);
    const actual3 = utils.title(string3);
    expect(actual1).toBe(expected1);
    expect(actual2).toBe(expected2);
    expect(actual3).toBe(expected3);
  });
  describe("edge cases", () => {
    it("does not change any string with the first letter already capitalised", () => {
      const string1 = "Something else";
      const string2 = "Something Else";
      const string3 = "Somethingelse";
      const expected1 = "Something else";
      const expected2 = "Something Else";
      const expected3 = "Somethingelse";
      const actual1 = utils.title(string1);
      const actual2 = utils.title(string2);
      const actual3 = utils.title(string3);
      expect(actual1).toBe(expected1);
      expect(actual2).toBe(expected2);
      expect(actual3).toBe(expected3);
    });
  });
});
