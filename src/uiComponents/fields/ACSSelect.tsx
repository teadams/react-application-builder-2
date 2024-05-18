import React from "react";
import { useGetData } from "../../hooks";
import { Select } from "./"
import { initial } from "lodash";

const ACSSelect = ({
	objectType,
	value,
	displayFields = ["name"],
	label,
	params,
	filters,
	onChange,
	sortBy,
	sortOrder,
	initialSelect = [{ id: "", value: "--- Select ---" }],
	labelClassName = "font-family-red-hat text-xs pl-1 text-[#18264C]",
	layoutClassName = "flex gap-y-2 flex-col",
	fieldClassName = "border focus:outline-none  rounded-lg w-[100%]  p-2 text-sm disabled font-family-red"

}: {
	objectType: string,
	value?: string | number | readonly string[] | undefined,
	displayFields?: string[],
	label?: string,
	params?: Record<string, any>;
	filters?: Record<string, any>
	onChange?: (newValue: string, newRow: Record<string, unknown> | undefined) => void;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	initialSelect?: Record<string, unknown>[]
	labelClassName?: string,
	layoutClassName?: string,
	fieldClassName?: string
}) => {
	const { data } = useGetData({ objectType, params, filters, sortBy, sortOrder });
	console.log("object type ins select", objectType)
	console.log("data in select", data)
	const handleChange = (e: any) => {
		const selectedValue = e.target.value;
		if (onChange) {
			const selectedRow = data?.find((row: any) => row.id === selectedValue);
			onChange(selectedValue, selectedRow);
		}
		if (initialSelect) {
			const selectedRow = initialSelect?.find((row: any) => row.id === selectedValue);
			if (selectedRow && typeof selectedRow.onChange === 'function') { // Add this condition to check if selectedRow.onChange is a function
				selectedRow.onChange(selectedValue, selectedRow);
			}
		}
	}
	if (!data) return null


	return (

		<div key={objectType} className={layoutClassName}>
			{label && <label className={labelClassName}>{label}</label>}
			<Select
				options={data as any[]}
				displayFields={displayFields}
				initialSelect={initialSelect}
				value={value}
				className={`${fieldClassName}`}
				onChange={handleChange}
			/>
		</div >

	);

}

export { ACSSelect }