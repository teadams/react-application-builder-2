import { useQuery } from "react-query";

import { useGetAcsMeta } from ".";
import { getObjectDataById } from "../lib/data";
import { ACSMetaModel } from "../types";

export const useGetDataById = (
  objectType: string,
  id: unknown,
  useQueryConfig?: any,
  enabled = true
) => {
  const acsMeta = useGetAcsMeta();
  return useQuery<Record<string, unknown>, Error>(
    [objectType],
    () => {
      return getObjectDataById(
        acsMeta as ACSMetaModel,
        objectType as string,
        id
      );
    },
    {
      enabled: objectType && id && enabled ? true : false,
      ...useQueryConfig,
    }
  );
};

export default useGetDataById;
