import React from "react";
import { Text } from ".";

import { useGetAcsMetaField, useGetDataByField, useUpdateData, useGetDataById } from "../../hooks";


const ACSField = ({
	objectType,
	id: propId,
	data: propData,
	mode: propMode = "view",
	handleCreateChange,
	isEditable = true,
	isForm = false,
	fieldName,
	label,
	value,
	defaultValue,
	lookupValue,
	lookupField = "id",
	labelClassName = "font-family-red-hat text-xs pl-1 text-[#18264C]",
	layoutClassName = "flex gap-y-2 flex-col",
	//	 focus:outline-none focus:ring-0  
	//	 
	fieldClassName = "focus:text-black bg-slate-50 focus:bg-blue-50 focus:outline-2  focus:outline-blue-500 border-[#E1E1E1]  text-[#18264C] text-sm rounded-lg       border rounded-lg w-[100%]  py-4 pl-3 pr-10  flex justify-center items-center gap-x-2",
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: {
	objectType: string;
	id?: string | number;
	data?: Record<string, unknown>;
	mode?: "view" | "edit" | "create";
	handleCreateChange?: (fieldName: string, value: unknown) => void;
	isEditable?: boolean;
	isForm: boolean;
	fieldName: string;
	label?: string;
	value?: unknown;
	defaultValue?: unknown;
	lookupValue?: any;
	lookupField?: string;
	labelClassName?: string;
	layoutClassName?: string;
	fieldClassName?: string;
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {

	const [mode, setMode] = React.useState(propMode);


	// Props:
	// For edit mode:
	// data - Row data - If this is provided, no call to server necessary
	// id - server lookup by id for the row data
	// lookupField and lookupValue - server lookup by field and value to look up

	// For create mode:
	// defaultValue (optional)
	// none of id, lookupField, lookupValue, data 
	//const mode = propId || lookupValue || propData ? "edit" : "create";

	const { data: idData } = useGetDataById({
		objectType,
		id: propId,
		enabled: propId !== undefined && propId !== null && mode === "edit" && !propData
	});

	const { data: fieldData } = useGetDataByField({
		objectType,
		lookupValue,
		lookupField,
		enabled: defaultValue === undefined && lookupValue && propId === undefined && mode === "edit" && !propData
	});

	const data = propData ?? fieldData?.[0] ?? idData ?? {}
	const acsMeta = useGetAcsMetaField(objectType, fieldName)
	defaultValue = defaultValue ?? acsMeta?.defaultValue ?? "";
	label = label ?? acsMeta?.prettyName;

	value = mode === "create" ? defaultValue ?? "" : value ?? data?.[fieldName]
	const id = propId ?? data?.id as string | number;
	const { mutate, isLoading: isMutating } = useUpdateData();
	const handleMutate = (e: unknown, mutatedValue: unknown) => {
		if (!isMutating && mode === "edit") {
			mutate({ objectType, id, fields: { [fieldName]: mutatedValue } });
		}
		if (propMode === "view") {
			setMode("view");
		}
		if (mode === "create" && handleCreateChange) {
			handleCreateChange(fieldName, mutatedValue);
		}
	};


	// This ensures the data is loaded before rendering
	if (mode === "edit" && value === undefined) {
		return null;
	}

	const handleClick = () => {
		if (isEditable && mode == "view") {
			setMode("edit");
		}
	}

	return (
		<div className={layoutClassName} onClick={handleClick}>
			{label && <label className={labelClassName}>{label}</label>}
			<Text mode={mode} data={data} onBlur={handleMutate} value={value} isForm={isForm}
				className={fieldClassName} fontSizeClass={fontSizeClass} textColorClass={textColorClass} fontWeightClass={fontWeightClass} />
		</div>
	);
}

export { ACSField };
