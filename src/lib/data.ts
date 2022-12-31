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
  let apiResult;
  if (process.env.NEXT_PUBLIC_DATA_FOLDER) {
    const filePath = `../../../${process.env.NEXT_PUBLIC_DATA_FOLDER}/${objectType}.json`;
    apiResult = require(filePath);
  } else {
    const path = "acs/" + objectType;
    apiResult = await api.callAPI({ path, params });
  }

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
  id: unknown
): Promise<unknown> => {
  const path = "acs/" + objectType + "/" + id;
  const method = "DELETE";
  const apiResult = await api.callAPI({ path, method });
  return apiResult;
};

export const updateObjectDataById = async (
  acsMeta: ACSMetaModel,
  objectType: string,
  id: unknown,
  objectTypeFields: object
): Promise<unknown> => {
  const path = "acs/" + objectType + "/" + id;
  const params = { ...objectTypeFields };
  const method = "PUT";
  const apiResult = await api.callAPI({ path, params, method });
  return apiResult;
};

export default {
  getObjectData,
  getObjectDataById,
  updateObjectDataById,
  deleteObjectDataById,
};
