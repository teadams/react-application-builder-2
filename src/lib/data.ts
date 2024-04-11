import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { QueryClient, QueryKey } from "react-query";
import { ACSMetaModel } from "../types";
import * as api from "./api";

export const get = async ({
  objectType,
  params = {},
  filters = {},
}: {
  objectType: string;
  params?: { [index: string]: unknown };
  filters?: { [index: string]: unknown };
}): Promise<Record<string, unknown>[]> => {
  const path = "acs/" + objectType;
  const apiResult = (await api.callAPI({ path, params })) as Promise<
    Record<string, unknown>[]
  >;
  return apiResult;
};

export const getById = async ({
  objectType,
  id,
  filters = {},
}: {
  objectType: string;
  id: string;
  filters?: { [index: string]: unknown };
}): Promise<Record<string, unknown>> => {
  const apiResult = await get({ objectType, params: { id }, filters });
  return apiResult[0];
};

export const create = async ({
  queryClient = undefined,
  objectType,
  fields,
}: {
  queryClient: QueryClient | undefined;
  objectType: string;
  fields: object;
}): Promise<unknown> => {
  const path = "acs/" + objectType;
  const params = { ...fields };
  const method = "POST";
  const apiResult = await api.callAPI({ path, params, method });
  if (queryClient) queryClient.invalidateQueries([objectType]);
  return apiResult;
};

export const updateById = async ({
  queryClient = undefined,
  objectType,
  id,
  fields,
}: {
  queryClient?: QueryClient | undefined;
  objectType: string;
  id: unknown;
  fields: object;
}): Promise<unknown> => {
  const path = "acs/" + objectType + "/" + id;
  const params = { ...fields };
  const method = "PUT";
  console.log(path, params);
  const apiResult = await api.callAPI({ path, params, method });
  if (queryClient) queryClient.invalidateQueries([objectType]);
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
  console.log("DEPRECATED!!!!" + objectType);
  console.log("get object data");
  console.log(process.env.NEXT_PUBLIC_LOCAL_DATA);
  let apiResult: any;
  if (process.env.NEXT_PUBLIC_LOCAL_DATA) {
    apiResult = require(`../../../sample_data/sampleData.json`);
    apiResult = apiResult[objectType];
  } else {
    const path = "acs/" + objectType;
    apiResult = await api.callAPI({ path, params });
    console.log("GOT DATA FOR OBJECT TYPE: " + objectType);

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
  console.log("DEPRECATED!!!!");

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
  console.log("DEPRECATED!!!!");

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
  console.log("DEPRECATED!!!!");

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
  console.log("DEPRECATED!!!!");

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
  console.log("DEPRECATED!!!!");

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
  console.log("DEPRECATED!!!!");

  const path = "acs/auth/loginByEmailAndPassword";
  const params = { ...objectTypeFields };
  const method = "POST";
  const apiResult = await api.callAPI({ path, params, method });
  return apiResult;
};

export default {
  get,
  getById,
  create,
  updateById,
  deleteById,
};
