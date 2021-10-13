import * as utils from "../src/utils.js";

describe("build Sequential Array function", () => {
  it("builds an array with 3 elements from 0 to 2", () => {
    const length = 3;
    const expected = [0, 1, 2];
    const actual = utils.buildSeqArray(length);
    expect(actual).toEqual(expected);
  });
  it("builds an array with 5 elements from 0 to 4", () => {
    const length = 5;
    const expected = [0, 1, 2, 3, 4];
    const actual = utils.buildSeqArray(length);
    expect(actual).toEqual(expected);
  });
  describe("unhappy path", () => {
    it("returns an empty array for length 0", () => {
      const length = 0;
      const expected = [];
      const actual = utils.buildSeqArray(length);
      expect(actual).toEqual(expected);
    });
  });
});
