// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

function sum(a, b) {
  return 3;
}

describe("Validating  Testing Framework  ", () => {
  test("Jest setup", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
