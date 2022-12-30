// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AcsMetaContext from "../../contextProviders/AcsMetaContext";
import meta from "../meta";

describe("Meta Data  ", () => {
  test("Get Meta", async () => {
    const acsMetaData = await meta.load("all");
    console.log(JSON.stringify(acsMetaData.objectTypes.acsTest));
    const acsTestObjectType = acsMetaData.objectTypes.acsTest;
    expect(acsTestObjectType.prettyName).toBe("Testing");
  });
});
