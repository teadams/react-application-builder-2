import React from "react";
import { usePropState } from "../../hooks";


const Select = ({
	value: propValue = "",
	options,
	onChange,
	className = "border focus:outline-none  rounded-lg w-[100%]  p-2 text-sm disabled font-family-red",
}: {
	value?: unknown;
	options?: { id: string; name: string }[];
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

	return (
		<select
			value={value as string}
			className={`${className}`}
			onChange={handleChange}
		>
			{options.map((option: any) => (
				<option key={option.id} value={option.id} className="font-family-red">
					{option.name}
				</option>
			))}
		</select >
	);
}

export { Select }