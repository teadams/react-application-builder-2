import { useQuery } from "react-query";

import { useGetAcsMeta } from ".";
import { getObjectData } from "../lib/data";
import { ACSMetaModel } from "../types";

export const useGetData = (
  objectType: string,
  useQueryConfig?: any,
  enabled = true,
) => {
  const acsMeta = useGetAcsMeta();
  console.log("in use get dta")
  console.log(objectType)
  console.log(useQueryConfig)
  console.log("enables is " + enabled)
  return useQuery<Record<string, unknown>[], Error>(
    [objectType],
    () => {
      console.log("in the base of use query")
      return getObjectData(acsMeta as ACSMetaModel, objectType as string);
    },
    { enabled: objectType && enabled ? true : false, ...useQueryConfig }
  );
};

export default useGetData;
