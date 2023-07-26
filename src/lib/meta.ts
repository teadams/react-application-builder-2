import { fstat } from "fs";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { ACSMetaModel } from "../types";
import * as api from "./api";

export async function load(type = "all"): Promise<ACSMetaModel> {
  let metaResult;
  if (process.env.NEXT_PUBLIC_LOCAL_META) {
    metaResult = require(`../../../meta/meta.json`);
  } else {
    const path = "acs/acsMeta/" + type;
    metaResult = await api.callAPI({ path });
  }
  return metaResult as ACSMetaModel;
}

export default { load };
