import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { QueryFunctionContext } from "react-query";
import * as api from "./api";

export const getObjectData = async (
  queryFunctionContext: QueryFunctionContext
) => {
  const { queryKey } = queryFunctionContext;
  const [objectType, filters] = queryKey;
  const path = "acs/" + objectType;
  console.log(filters);
  const apiResult = await api.callAPI({ path, params: filters });
  console.log(apiResult);
};

export default { getObjectData };
