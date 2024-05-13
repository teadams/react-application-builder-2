import React  from "react";
import { useQuery } from "react-query";
import utils from "../lib/utils"
import { get } from "../lib/data";

export const useGetData = ({
  objectType,
  params = {},
  path,
  basePath,
  filters = {},
  useQueryConfig={},
  enabled = true,
  sortBy,
  sortOrder = "asc"
}: {
  objectType: string,
  params?: { [index: string]: unknown },
  path?:string,
  basePath?:string,
  filters?: { [index: string]: unknown };
  useQueryConfig?: any,
  enabled?: boolean,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
}) => {
  return useQuery<Record<string, unknown>[], Error>(
    [objectType, "list", {params, filters}],
    () => {

      return get({objectType, params, filters, basePath, path});
    },
    { enabled: objectType && enabled ? true : false, 
      select: React.useCallback((data: any[]) => {
          return utils.sort(data, sortBy, sortOrder)
        },[sortBy, sortOrder]),
        ...useQueryConfig }
  );


};

export default useGetData;
