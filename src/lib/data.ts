import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { ACSMetaModel } from "../types";
import * as api from "./api";

export const getObjectData = async (
  acsMeta: ACSMetaModel,
  objectType: string,
  params: { [index: string]: unknown } = {},
  filters: { [index: string]: unknown } = {}
): Promise<unknown> => {
  // TODO incorporate params
  const path = "acs/" + objectType;
  const apiResult = await api.callAPI({ path, params });
  console.log("api result is");
  console.log(apiResult);

  return apiResult;
};

export const getObjectDataById = async (
  acsMeta: ACSMetaModel,
  objectType: string,
  id: unknown,
  filters: { [index: string]: unknown } = {}
): Promise<unknown> => {
  const apiResult = await getObjectData(acsMeta, objectType, { id }, filters);

  return apiResult;
};

export default { getObjectData };
