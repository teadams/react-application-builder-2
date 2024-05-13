import React from "react";
import { useGetData } from "../../hooks";
import { Select } from "./"

const ACSSelect = ({
	objectType,
	value,
	displayFields = ["name"],
	params,
	filters,
	onChange,
	sortBy,
	sortOrder,
	className = "border focus:outline-none  rounded-lg w-[100%]  p-2 text-sm disabled font-family-red"

}: {
	objectType: string,
	value?: string | number | readonly string[] | undefined,
	displayFields?: string[],
	params?: Record<string, any>;
	filters?: Record<string, any>
	onChange?: (newValue: string, newRow: Record<string, unknown> | undefined) => void;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	className?: string
}) => {
	const { data } = useGetData({ objectType, params, filters, sortBy, sortOrder });


	const handleChange = (e: any) => {
		const selectedValue = e.target.value;
		if (onChange) {
			const selectedRow = data?.find((row: any) => row.id === selectedValue);
			onChange(selectedValue, selectedRow);
		}
	}
	if (!data) return null
	console.log("DDDDD", objectType, data, displayFields, params)
	return (
		<Select
			options={data as any[]}
			displayFields={displayFields}
			value={value}
			className={`${className}`}
			onChange={handleChange}
		/>
	);

}

export { ACSSelect }