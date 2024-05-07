import { useQuery } from "react-query";
import { get } from "../lib/data";

export const useGetData = ({
  objectType,
  params = {},
  filters = {},
  useQueryConfig={},
  enabled = true,
}: {
  objectType: string,
  params?: { [index: string]: unknown },
  filters?: { [index: string]: unknown };
  useQueryConfig?: any,
  enabled?: boolean,
}) => {
  return useQuery<Record<string, unknown>[], Error>(
    [objectType, "list", {params, filters}],
    () => {
      return get({objectType, params, filters});
    },
    { enabled: objectType && enabled ? true : false, ...useQueryConfig }
  );
};

export default useGetData;
