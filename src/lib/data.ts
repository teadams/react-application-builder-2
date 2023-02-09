import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { ACSMetaModel } from "../types";
import * as api from "./api";

export const getObjectData = async (
  acsMeta: ACSMetaModel,
  objectType: string,
  params: { [index: string]: unknown } = {},
  filters: { [index: string]: unknown } = {}
): Promise<Record<string, unknown>[]> => {
  let apiResult: any;
  if (process.env.NEXT_PUBLIC_LOCAL_DATA) {
    apiResult = require(`../../../sample_data/sampleData.json`);
    apiResult = apiResult[objectType];
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
): Promise<Record<string, unknown>> => {
  console.log("Get data by id");
  const apiResult = await getObjectData(acsMeta, objectType, { id }, filters);
  if (process.env.NEXT_PUBLIC_LOCAL_DATA) {
    return apiResult.filter((row) => row.id == id)[0];
  }
  return apiResult[0];
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

export const createNewObjectDataRow = async (
  acsMeta: ACSMetaModel,
  objectType: string,
  objectTypeFields: object
): Promise<unknown> => {
  const path = "acs/" + objectType;
  const params = { ...objectTypeFields };
  const method = "POST";
  const apiResult = await api.callAPI({ path, params, method });
  return apiResult;
};

export const createAccount = async (
  acsMeta: ACSMetaModel,
  objectTypeFields: object
): Promise<unknown> => {
  const path = "acs/auth/createUserByEmailAndPassword";
  const params = { ...objectTypeFields };
  const method = "POST";
  const apiResult = await api.callAPI({ path, params, method });
  return apiResult;
};

export const SignIn = async (
  acsMeta: ACSMetaModel,
  objectTypeFields: object
): Promise<unknown> => {
  const path = "acs/auth/loginByEmailAndPassword";
  const params = { ...objectTypeFields };
  const method = "POST";
  const apiResult = await api.callAPI({ path, params, method });
  return apiResult;
};

export default {
  getObjectData,
  getObjectDataById,
  updateObjectDataById,
  deleteObjectDataById,
  createNewObjectDataRow,
  createAccount,
  SignIn,
};
