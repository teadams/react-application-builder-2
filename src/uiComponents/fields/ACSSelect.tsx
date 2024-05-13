import React from "react";
import { useGetData } from "../../hooks";

const ACSSelect = ({
	objectType,
	value,
	params,
	onChange,
	sortBy,
	sortOrder,
	className = "border focus:outline-none  rounded-lg w-[100%]  p-2 text-sm disabled font-family-red"

}: {
	objectType: string,
	value?: string | number | readonly string[] | undefined,
	params?: Record<string, any>
	onChange?: (newValue: string) => void;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	className?: string
}) => {
	const { data } = useGetData({ objectType, params, sortBy, sortOrder });


	const handleChange = (e: any) => {
		if (onChange) {
			onChange(e.target.value);
		}
	}
	if (!data) return null

	return (
		<>
			<select
				value={value}
				className={`${className}`}
				onChange={handleChange}
			>
				{data.map((option: any) => (
					<option key={option.id} value={option.id} className="font-family-red">
						{option.name}
					</option>
				))}
			</select >
		</>
	);

}

export { ACSSelect }