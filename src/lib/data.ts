import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { any, QueryKey } from "react-query";
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
  data,
  path,
  preSubmit,
  overrideSubmit,
  postSubmit,
  queryClient,
  invalidateQueryKeys

}: {
  objectType: string;
  data: Record<string, unknown>;
  path?:string,
  preSubmit?: ({objectType, data}: 
    {objectType:string, data:Record<string,unknown>}) => any, // 
  overrideSubmit?: ({objectType, data, preSubmitResult}: 
    {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>}) => any, // 
  postSubmit?: ({objectType, data, preSubmitResult, apiResult}: 
     {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>,
      apiResult:Record<string,unknown>}) => any, //
  queryClient?: any, 
  invalidateQueryKeys?: QueryKey[]  // Additional keys to invalidate beyond standard ACS
}): Promise<unknown> => {

  const createResult = await persist({ objectType, data, method: "POST", path, preSubmit,overrideSubmit,postSubmit,   queryClient,
  invalidateQueryKeys});
  if (queryClient) {
    queryClient.invalidateQueries({ queryKey: [objectType, "list"] });
    for (const queryKey of invalidateQueryKeys ?? []) {
      queryClient.invalidateQueries({ queryKey });
    }
  }
  return createResult
};

export const updateById = async ({
  objectType,
  id,
  data,
  path,
  preSubmit,
  overrideSubmit,
  postSubmit,
  queryClient,
  invalidateQueryKeys
}: {
  objectType: string;
  id:any;
  data: Record<string, unknown>;
  path?: string,
  preSubmit?: ({objectType, data}: 
    {objectType:string, data:Record<string,unknown>}) => any, // 
  overrideSubmit?: ({objectType, data, preSubmitResult}: 
    {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>}) => any, // 
  postSubmit?: ({objectType, data, preSubmitResult, apiResult}: 
     {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>,
      apiResult:Record<string,unknown>}) => any, //
  queryClient?: any, 
  invalidateQueryKeys?: QueryKey[]   // Additional keys to invalidate beyond standard ACS
      
}): Promise<unknown> => {
  path = path ?? "acs/" + objectType + "/" + id;
   
  const updateByIdResult = await persist({ objectType, data, method: "PUT", path,  preSubmit,
  overrideSubmit, postSubmit,   queryClient, invalidateQueryKeys});

  if (queryClient) {
    queryClient.invalidateQueries({ queryKey: [objectType, "list"] });
    queryClient.invalidateQueries({ queryKey: [objectType, "one", "id", id] });
    const fieldQueries = queryClient.getQueriesData([objectType, "one", "field"]);
    for (const query of fieldQueries) {
      const [queryKey, queryData] = query;
      if ((queryData as { id: string })?.id === id) {
        queryClient.invalidateQueries({queryKey});
      }
      for (const queryKey of invalidateQueryKeys ?? []) {
        queryClient.invalidateQueries({ queryKey });
      }
    }
  }
  return updateByIdResult;


};

export const persist = async ({
  objectType="",
  data,
  method = "POST",
  path, 
  preSubmit,
  overrideSubmit,
  postSubmit, 
  queryClient,
  invalidateQueryKeys
  
}: {
  objectType?: string;
  data: Record<string, unknown>;
  path?:string;
  method?: "POST" | "PUT"; 
  preSubmit?: ({objectType, data}: 
              {objectType:string, data:Record<string,unknown>}) => any, // 
  overrideSubmit?: ({objectType, data, preSubmitResult}: 
              {objectType:string, data:Record<string,unknown>, 
                preSubmitResult:Record<string,unknown>}) => any, // 
  postSubmit?: ({objectType, data, preSubmitResult, apiResult}: 
               {objectType:string, data:Record<string,unknown>, 
                preSubmitResult:Record<string,unknown>,
                apiResult:Record<string,unknown>}) => any, // 
  queryClient?: any, 
  invalidateQueryKeys?: QueryKey[] 
                                                
}): Promise<unknown> => {
  let preSubmitResult, apiResult, postSubmitResult
 
   path = path ?? "acs/" + objectType;
   
  if (preSubmit) {
    preSubmitResult = await preSubmit({objectType, data});
  }
  if (overrideSubmit) {
    apiResult = await overrideSubmit({objectType, data, preSubmitResult});
  } else {
    apiResult = await api.callAPI({ path, data, method });
  }
  if (postSubmit) {
    postSubmitResult = await postSubmit({objectType, data, preSubmitResult, apiResult} );
  }
  if (invalidateQueryKeys) {
    if (queryClient) {
      for (const queryKey of invalidateQueryKeys ?? [] ) {
        queryClient.invalidateQueries({ queryKey });
      }   
    } else {
      console.error("queryClient is required to invalidate queries")
    }
  }

  return postSubmitResult ?? apiResult;
};



export const deleteById = async ({
  queryClient,
  objectType,
  id,
}: {
  queryClient: any;
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
  queryClient: any,
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
  queryClient: any,
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
  queryClient: any,
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
