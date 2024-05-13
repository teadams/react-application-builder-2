import React  from "react";
import { useQuery } from "react-query";
import { get } from "../lib/data";

export const useGetData = ({
  objectType,
  params = {},
  filters = {},
  useQueryConfig={},
  enabled = true,
  sortBy,
  sortOrder = "asc"
}: {
  objectType: string,
  params?: { [index: string]: unknown },
  filters?: { [index: string]: unknown };
  useQueryConfig?: any,
  enabled?: boolean,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
}) => {
  return useQuery<Record<string, unknown>[], Error>(
    [objectType, "list", {params, filters}],
    () => {

 
      return get({objectType, params, filters});
    },
    { enabled: objectType && enabled ? true : false, 
      select: React.useCallback((data: any[]) => {
        return sortBy? 
          data.sort((a: any, b: any) => (
          sortOrder === "asc" ? 
            a[sortBy] > b[sortBy] ? 1 : -1 :  
            a[sortBy] < b[sortBy] ? 1 : -1)) 
          : data},[sortBy, sortOrder]),
        ...useQueryConfig }
  );


};

export default useGetData;
