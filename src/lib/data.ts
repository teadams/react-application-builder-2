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
  path,
  preSubmit,
  overrideSubmit,
  postSubmit
}: {
  objectType: string;
  fields: Record<string, unknown>;
  path?:string,
  preSubmit?: ({objectType, data}: 
    {objectType:string, data:Record<string,unknown>}) => any, // 
  overrideSubmit?: ({objectType, data, preSubmitResult}: 
    {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>}) => any, // 
  postSubmit?: ({objectType, data, preSubmitResult, submitResult}: 
     {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>,
      submitResult:Record<string,unknown>}) => any, // 
}): Promise<unknown> => {
  console.log("CREATE", fields, path)
  return await persist({ objectType, data: fields, method: "POST", path, preSubmit,overrideSubmit,postSubmit})  ;
};

export const updateById = async ({
  objectType,
  id,
  fields,
  path,
  preSubmit,
  overrideSubmit,
  postSubmit
}: {
  objectType: string;
  id:any;
  fields: Record<string, unknown>;
  path?: string,
  preSubmit?: ({objectType, data}: 
    {objectType:string, data:Record<string,unknown>}) => any, // 
  overrideSubmit?: ({objectType, data, preSubmitResult}: 
    {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>}) => any, // 
  postSubmit?: ({objectType, data, preSubmitResult, submitResult}: 
     {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>,
      submitResult:Record<string,unknown>}) => any, // 
}): Promise<unknown> => {
  path = path ?? "acs/" + objectType + "/" + id;
   
  return await persist({ objectType, data: fields, method: "PUT", path,  preSubmit,
  overrideSubmit,
  postSubmit})  ;
};

export const persist = async ({
  objectType,
  data,
  method = "POST",
  path, 
  preSubmit,
  overrideSubmit,
  postSubmit
}: {
  objectType: string;
  data: Record<string, unknown>;
  path?:string,
  method?: "POST" | "PUT" 
  preSubmit?: ({objectType, data}: 
              {objectType:string, data:Record<string,unknown>}) => any, // 
  overrideSubmit?: ({objectType, data, preSubmitResult}: 
              {objectType:string, data:Record<string,unknown>, 
                preSubmitResult:Record<string,unknown>}) => any, // 
  postSubmit?: ({objectType, data, preSubmitResult, submitResult}: 
               {objectType:string, data:Record<string,unknown>, 
                preSubmitResult:Record<string,unknown>,
                submitResult:Record<string,unknown>}) => any, // 

}): Promise<unknown> => {
  let preSubmitResult, submitResult, postSubmitResult
 
   path = path ?? "acs/" + objectType;
   
  if (preSubmit) {
    preSubmitResult = await preSubmit({objectType, data});
  }
  if (overrideSubmit) {
    submitResult = await overrideSubmit({objectType, data, preSubmitResult});
  } else {
    submitResult = await api.callAPI({ path, data, method });
  }
  if (postSubmit) {
    postSubmitResult = await postSubmit({objectType, data, preSubmitResult,submitResult} );
  }
  return postSubmitResult ?? submitResult;
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
  persist,
  updateById,
  deleteById,
};
