import { useQuery } from "react-query";

import { useGetAcsMeta } from ".";
import { getByField } from "../lib/data";
import { ACSMetaModel } from "../types";

interface GetDataByFieldProps {
  objectType: string,
  lookupValue: unknown,
  enabled: boolean,
  lookupField?: string,
  useQueryConfig?: any,
}

export const useGetDataByField = ({
  objectType,
  lookupValue,
  lookupField="id",
  useQueryConfig,
  enabled = true
}: GetDataByFieldProps) => {

  const queryKey = lookupField === "id" ? [objectType, "one", "id", lookupValue] : 
  [objectType, "one", "field", {lookupField, lookupValue}];

  return useQuery<Record<string, unknown>, Error>(
    queryKey,
    () => {
      
      return getByField({
        objectType,
        lookupField,
        lookupValue
      }
      );
    },
    {
      enabled: objectType && lookupValue  && enabled ? true : false,
      ...useQueryConfig,
    }
  );
};

export default useGetDataByField;
