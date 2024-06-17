import { useQuery } from "react-query";

import { useGetAcsMeta, useGetData } from ".";
import { ACSMetaModel } from "../types";

export const useGetTenantParameter = ({
  parameter
}: {  
  parameter: string,
}) => {

  const { data: acsTenantSetup } = useGetData({ objectType: "acsTenantSetup" });
  console.log("acsTenantSetup", acsTenantSetup);

  const parameterData = acsTenantSetup?.filter(
		(setup: any) => setup?.parameter?.key === parameter
	)[0]
  console.log("parameterData", parameterData)
  if (parameterData) {
    console.log("parameterData.value", parameterData.value)
    return parameterData?.value;
  } else {
    console.log("returning empty string")
    return ""
  }

 };

export default useGetTenantParameter;
