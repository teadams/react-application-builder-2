// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AcsMetaContext from "../../contextProviders/AcsMetaContext";
import data, { getObjectData } from "../data";

function sum(a, b) {
  return 3;
}

describe("Get Data (from server)  ", () => {
  test("Get Data", () => {
    data.getObjectData(AcsMetaContext, "acsTest");
  });
});
