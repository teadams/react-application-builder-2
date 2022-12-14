import { useQuery } from "react-query";

import { useGetAcsMeta } from ".";
import { getObjectData } from "../lib/data";
import { ACSMetaModel } from "../types";

export const useGetObjectTypeData = (objectType: string) => {
  const acsMeta = useGetAcsMeta();
  return useQuery(
    [objectType],
    () => {
      return getObjectData(acsMeta as ACSMetaModel, objectType as string);
    },
    {
      enabled: objectType ? true : false,
    }
  );
};

export default useGetObjectTypeData;
