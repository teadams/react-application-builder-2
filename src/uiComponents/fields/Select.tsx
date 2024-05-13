import React from "react";
import { usePropState } from "../../hooks";
import utils from "../../lib/utils"


const Select = ({
	value: propValue = "",
	options,
	displayFields = ["name"],
	onChange,
	className = "border focus:outline-none  rounded-lg w-[100%]  p-2 text-sm disabled font-family-red",
}: {
	value?: unknown;
	options?: any[];
	displayFields?: string[];
	onChange?: (value: string) => void;
	className?: string;
}) => {
	const [value, setValue] = usePropState(propValue as any);

	if (!options) return null;
	const handleChange = (e: any) => {
		setValue(e.target.value);
		if (onChange) {
			onChange(e);
		}
	};

	const width = "w-[300px]"

	return (

		<div className={`${width}`} >
			<select
				value={value as string}
				className={`w-full ${className}`}
				onChange={handleChange}
			>
				{options.map((option: any) => {
					return (<option key={option.id} value={option.id}>
						{displayFields.map((field) => {
							return utils.getDeepValueFromString(option, field)
						}).join(" ")}
					</option>)
				})}
			</select >
		</div >
	);
}

export { Select }