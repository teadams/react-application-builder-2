// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AcsMetaContext from "../../contextProviders/AcsMetaContext";
import meta from "../meta";

describe("Validating  Testing Framework  ", () => {
  test("Get Meta", () => {
    const acsMetaData = meta.load("all");
    console.log(meta);
  });
});
