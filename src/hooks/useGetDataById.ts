import { useQuery } from "react-query";

import { useGetAcsMeta } from ".";
import { getObjectDataById } from "../lib/data";
import { ACSMetaModel } from "../types";

export const useGetDataById = (objectType: string, id: unknown) => {
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
      enabled: objectType && id ? true : false,
    }
  );
};

export default useGetDataById;
