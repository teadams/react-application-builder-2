import React from "react";
import { Text } from "./";
import { useQueryClient, useMutation } from "react-query";
import { updateById } from "../../lib/data";
import { useGetDataByField, useUpdateData, useGetDataById } from "../../hooks";


const ACSField = ({
	objectType,
	id: propId,
	data: propData,
	fieldName,
	label,
	defaultValue,
	lookupValue,
	lookupField = "id",
	labelClassName = "block mb-2 text-sm font-medium text-black-500 ",
	fieldClassName = "bg-white border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ",
	fontSizeClass = "text-base",
	textColorClass = "text-dark",
	fontWeightClass = "font-normal",
}: {
	objectType: string;
	id?: string | number;
	data?: Record<string, unknown>;
	fieldName: string;
	label: string;
	defaultValue?: unknown;
	lookupValue?: any;
	lookupField?: string;
	labelClassName?: string
	fieldClassName?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {

	// Props:

	// For edit mode:
	// data - Row data - If this is provided, no call to server necessary
	// id - server lookup by id for the row data
	// lookupField and lookupValue - server lookup by field and value to look up

	// For create mode:
	// defaultValue (optional)
	// none of id, lookupField, lookupValue, data 
	const mode = propId || lookupValue || propData ? "edit" : "create";

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

	const data = propData ?? fieldData ?? idData ?? {}


	const initialValue = defaultValue ?? data?.[fieldName];
	const id = propId ?? data?.id as string | number;
	const { mutate, isLoading: isMutating } = useUpdateData();
	const handleMutate = (e: React.FocusEvent<HTMLInputElement>, mutatedValue: unknown) => {
		if (!isMutating && mode === "edit") {
			mutate({ objectType, id, fields: { [fieldName]: mutatedValue } });
		}
		if (mode === "create") {
			// Tell parent what the value is. Parent will collect values and then submit
			// either that or figure out a way to use useForm
		}
	};


	if (mode === "edit" && initialValue === undefined) {
		return null;
	}


	return (
		<div>
			{label && <label className={labelClassName}>{label}</label>}
			<Text data={data} onBlur={handleMutate} initialValue={initialValue} className={fieldClassName} fontSizeClass={fontSizeClass} textColorClass={textColorClass} fontWeightClass={fontWeightClass} />
		</div>
	);
}

export { ACSField };