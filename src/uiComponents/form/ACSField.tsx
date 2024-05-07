import React from "react";
import { Text } from "./";
import { useQueryClient, useMutation } from "react-query";
import { updateById } from "../../lib/data";
import { useGetDataByField, useUpdateData } from "../../hooks";


const ACSField = ({
	objectType,
	id: propId,
	fieldName,
	defaultValue,
	lookupValue,
	lookupField = "id",
	classNames = "bg-white border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ",
	fontSizeClass = "text-base",
	textColorClass = "text-dark",
	fontWeightClass = "font-normal",
}: {
	objectType: string;
	id?: string | number;
	fieldName: string;
	defaultValue?: unknown;
	lookupValue?: any;
	lookupField?: string;
	classNames?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {

	// TODO - Get by ID
	const { data, isLoading, isError } = useGetDataByField({
		objectType,
		lookupValue,
		lookupField,
		enabled: defaultValue === undefined && lookupValue,
	});



	const initialValue = defaultValue ?? data?.[fieldName];
	const id = propId ?? data?.id as string | number
	const mutation = useUpdateData()
	const handleMutate = (e: React.FocusEvent<HTMLInputElement>, mutatedValue: unknown) => {
		mutation.mutate({ objectType, id, fields: { [fieldName]: mutatedValue } })
	}

	const mode = propId || lookupValue ? "edit" : "create";
	if (mode === "edit" && initialValue === undefined) {
		return null;
	}

	return (
		<Text data={data} onBlur={handleMutate} initialValue={initialValue} classNames={classNames} fontSizeClass={fontSizeClass} textColorClass={textColorClass} fontWeightClass={fontWeightClass} />
	);
}

export { ACSField };
