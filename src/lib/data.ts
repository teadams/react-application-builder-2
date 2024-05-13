import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { QueryClient, QueryKey } from "react-query";
import { ACSMetaModel } from "../types";
import * as api from "./api";

export const get = async ({
  objectType,
  params = {},
  filters = {},
  path,
  basePath = "acs"
}: {
  objectType: string;
  params?: { [index: string]: unknown };
  filters?: { [index: string]: unknown };
  path?:string,
  basePath?:string
}): Promise<Record<string, unknown>[]> => {
  path = path ?? basePath +"/" +  objectType;
  const apiResult = (await api.callAPI({ path, params })) as Promise<
    Record<string, unknown>[]
  >;
  return apiResult;
};

export const getById = async ({
  objectType,
  id,
  filters = {},
  path,
  basePath = "acs"
}: {
  objectType: string;
  id: string;
  filters?: { [index: string]: unknown };
  path?:string,
  basePath?:string
}): Promise<Record<string, unknown>> => {
  const apiResult = await get({ objectType, path, basePath, params: { id }, filters });
  return apiResult[0];
};

export const getByField = async ({
  objectType,
  lookupField,
  lookupValue,
  params={},
  filters = {},
  path,
  basePath = "acs",
}: {
  objectType: string;
  lookupField: string;
  lookupValue: unknown
  params?: { [index: string]: unknown };
  filters?: { [index: string]: unknown };
  path?:string,
  basePath?:string,

}): Promise<Record<string, unknown>[]>=> {

  const apiResult = await get({ objectType, path, basePath, params: {...params, [lookupField]: lookupValue }, filters });
  return apiResult;
};

export const create = async ({
  objectType,
  fields,
}: {
  objectType: string;
  fields: object;
}): Promise<unknown> => {
  const path = "acs/" + objectType;
  const params = { ...fields };
  const method = "POST";
  const apiResult = await api.callAPI({ path, params, method });
  return apiResult;
};

export const updateById = async ({
  objectType,
  id,
  fields,
}: {
  objectType: string;
  id: unknown;
  fields: object;
}): Promise<unknown> => {
  const path = "acs/" + objectType + "/" + id;
  const params = { ...fields };
  const method = "PUT";
  const apiResult = await api.callAPI({ path, params, method });
  return apiResult;
};

export const deleteById = async ({
  queryClient,
  objectType,
  id,
}: {
  queryClient: QueryClient;
  objectType: string;
  id: unknown;
}): Promise<unknown> => {
  const path = "acs/" + objectType + "/" + id;
  const method = "DELETE";
  const apiResult = await api.callAPI({ path, method });
  queryClient.invalidateQueries([objectType]);
  return apiResult;
};

/// THIS WILL BE DEPRECTATED
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
/// THIS WILL BE DEPRECTATED
export const getObjectDataById = async (
  acsMeta: ACSMetaModel,
  objectType: string,
  id: unknown,
  filters: { [index: string]: unknown } = {}
): Promise<Record<string, unknown>> => {

  const apiResult = await getObjectData(acsMeta, objectType, { id }, filters);
  if (process.env.NEXT_PUBLIC_LOCAL_DATA) {
    return apiResult.filter((row) => row.id == id)[0];
  }
  return apiResult[0];
};

/// THIS WILL BE DEPRECTATED
export const deleteObjectDataById = async (
  acsMeta: ACSMetaModel,
  queryClient: QueryClient,
  objectType: string,
  id: unknown
): Promise<unknown> => {

  const path = "acs/" + objectType + "/" + id;
  const method = "DELETE";
  const apiResult = await api.callAPI({ path, method });
  queryClient.invalidateQueries([objectType]);
  return apiResult;
};
/// THIS WILL BE DEPRECTATED
export const updateObjectDataById = async (
  acsMeta: ACSMetaModel,
  queryClient: QueryClient,
  objectType: string,
  id: unknown,
  objectTypeFields: object
): Promise<unknown> => {

  const path = "acs/" + objectType + "/" + id;
  const params = { ...objectTypeFields };
  const method = "PUT";
  const apiResult = await api.callAPI({ path, params, method });
  queryClient.invalidateQueries([objectType]);

  return apiResult;
};

/// THIS WILL BE DEPRECTATED
export const createNewObjectDataRow = async (
  acsMeta: ACSMetaModel,
  queryClient: QueryClient,
  objectType: string,
  objectTypeFields: object
): Promise<unknown> => {

  const path = "acs/" + objectType;
  const params = { ...objectTypeFields };
  const method = "POST";
  const apiResult = await api.callAPI({ path, params, method });
  queryClient.invalidateQueries([objectType]);
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
  get,
  getById,
  getByField,
  create,
  updateById,
  deleteById,
};
