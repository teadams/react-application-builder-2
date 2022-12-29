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
  console.log("params is " + params);
  const path = "acs/" + objectType;
  const apiResult = await api.callAPI({ path, params });

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


export const deleteObjectDataById = async (
  acsMeta: ACSMetaModel,
  objectType: string,
  id: unknown,
): Promise<unknown> => {
  const path = "acs/" + objectType + "/" + id;
  const method = "DELETE"
  const apiResult = await api.callAPI({ path ,method });
  return apiResult;
};

export default { getObjectData };
