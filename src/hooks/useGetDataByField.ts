import React from "react";
import { useQuery } from "react-query";
import utils from "../lib/utils";
import { getByField } from "../lib/data";



export const useGetDataByField = ({
  objectType,
  lookupValue,
  lookupField="id",
  path,
  basePath,
  useQueryConfig,
  enabled = true,
  params,
  filters,
  sortBy,
  sortOrder = "asc"
}: {
  objectType: string,
  lookupValue: unknown,
  path?:string,
  basePath?:string,
  enabled: boolean,
  lookupField?: string,
  useQueryConfig?: any,
  params?: { [index: string]: unknown },
  filters?: { [index: string]: unknown },
  sortBy?: string,
  sortOrder?: "asc" | "desc"
 
}) => {

  const queryKey = lookupField === "id" ? [objectType, "one", "id", lookupValue] : 
  [objectType, "one", "field", {lookupField, lookupValue}];

  return useQuery<Record<string, unknown>[], Error>(
    queryKey,
    () => {
      return getByField({
        objectType,
        lookupField,
        lookupValue,
        path,
        basePath,
        params,
        filters
      }
      );
    },
    {
      select: React.useCallback((data: any[]) => {
        return utils.sort(data, sortBy, sortOrder)
      },[sortBy, sortOrder]),
      enabled: objectType && lookupValue  && enabled ? true : false,
      ...useQueryConfig,
    }
  );
};

export default useGetDataByField;
