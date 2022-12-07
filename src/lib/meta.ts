import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { ACSMetaModel } from "../types";
import * as api from "./api";

export async function load(type = "all"): Promise<ACSMetaModel> {
  const path = "acs/acsMeta/" + type;
  const metaResult = await api.callAPI({ path });
  return metaResult as ACSMetaModel;
}

export default { load };
