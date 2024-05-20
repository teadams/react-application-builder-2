import React from "react";
import { ACSField } from ".";
import { useGetData } from "../../hooks";

const getTenantSetupRecord = (tenantSetup: any, key: string) => {
	return tenantSetup?.find((data: any) => data.parameter.key === key);
}



const ACSTenantField = ({
	fieldKey,
	label,
	mode = "view",
	canEdit = true,
	labelClassName = "block mb-2 text-sm font-medium text-black-500 ",
	fieldClassName = "bg-white border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ",
	fontSizeClass = "text-base",
	textColorClass = "text-dark",
	fontWeightClass = "font-normal",
}: {

	fieldKey: string;
	label?: string;
	mode?: "view" | "edit" | "create";
	canEdit?: boolean;
	labelClassName?: string
	fieldClassName?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {

	const { data: tenantSetup } = useGetData({ objectType: "acsTenantSetup" });

	if (!tenantSetup) return null
	const data = getTenantSetupRecord(tenantSetup, fieldKey)
	label = label ?? data.parameter.name

	return (
		<ACSField mode={mode} canEdit={canEdit} label={label as string} objectType="acsTenantSetup" fieldName="value" data={data}
			labelClassName={labelClassName} fieldClassName={fieldClassName} fontSizeClass={fontSizeClass} textColorClass={textColorClass} fontWeightClass={fontWeightClass}
		/>
	);
}

export { ACSTenantField };
