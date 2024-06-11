import { useQuery } from "react-query";

import { useGetAcsMeta } from ".";
import { getById } from "../lib/data";
import { ACSMetaModel } from "../types";

export const useGetDataById = ({
  objectType,
  id,
  useQueryConfig,
  enabled=true
}: {  
  objectType: string,
  id: unknown,
  useQueryConfig?: any,
  enabled:boolean
}) => {

  const acsMeta = useGetAcsMeta();
  return useQuery<Record<string, unknown>, Error>(
    [objectType,"one", "id", id],
    () => {
      return getById({
        objectType,
        id}
      );
    },
    {
      enabled: objectType && id && enabled ? true : false,
      ...useQueryConfig,
    }
  );
};

export default useGetDataById;
