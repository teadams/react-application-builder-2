import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import * as api from "./api";

export const getObjectData = async (
  objectType: string,
  filters: string[] = []
): Promise<unknown> => {
  const path = "acs/" + objectType;
  const apiResult = await api.callAPI({ path, params: filters });
  console.log(apiResult);

  return apiResult;
};

export default { getObjectData };
