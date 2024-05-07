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
  console.log("in use get data")
  console.log(objectType)
  console.log(useQueryConfig)
  console.log("enables is " + enabled)
  return useQuery<Record<string, unknown>[], Error>(
    [{objectType}],
    () => {
      console.log("in the base of use query")
      return get({objectType, params, filters});
    },
    { enabled: objectType && enabled ? true : false, ...useQueryConfig }
  );
};

export default useGetData;
