import { useQuery } from "react-query";

import { useGetAcsMeta } from ".";
import { getObjectDataById } from "../lib/data";
import { ACSMetaModel } from "../types";

export const useGetObjectDataById = (objectType: string, id: unknown) => {
  const acsMeta = useGetAcsMeta();
  return useQuery(
    [objectType],
    () => {
      return getObjectDataById(
        acsMeta as ACSMetaModel,
        objectType as string,
        id
      );
    },
    {
      enabled: objectType ? true : false,
    }
  );
};

export default useGetObjectDataById;
