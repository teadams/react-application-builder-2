import { fstat } from "fs";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { ACSMetaModel } from "../types";
import * as api from "./api";

export async function load(type = "all"): Promise<ACSMetaModel> {
  let metaResult ={} as ACSMetaModel;
  if (process.env.NEXT_PUBLIC_LOCAL_META) {
    metaResult = require(`../../../meta/meta.json`);
  } else {
    if (process.env.NEXT_PUBLIC_FORGO_META !== "true") {
     const path = "acs/acsMeta/" + type;
     metaResult = await api.callAPI({ path }) as ACSMetaModel;
    }
  }
  return metaResult as ACSMetaModel;
}

export default { load };
