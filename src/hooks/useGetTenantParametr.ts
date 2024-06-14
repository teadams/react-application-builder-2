import { useQuery } from "react-query";

import { useGetAcsMeta, useGetData } from ".";
import { ACSMetaModel } from "../types";

export const useGetTenantParameter = ({
  parameter
}: {  
  parameter: string,
}) => {

  const { data: acsTenantSetup } = useGetData({ objectType: "acsTenantSetup" });

	return  acsTenantSetup?.filter(
		(setup: any) => setup?.parameter?.key === parameter
	)[0]?.value;

 };

export default useGetTenantParameter;
