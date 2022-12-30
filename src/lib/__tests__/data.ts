// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import meta from "../meta";
import data from "../data";

describe("Get Data (from server)  ", () => {
  test("Get Data", async () => {
    const acsMeta = await meta.load("all");
    const acsTestData = await data.getObjectData(acsMeta, "acsTest");
    expect(acsTestData).toBeDefined;
  });
});
