import React from "react";
import { Text } from "./";

interface TextBoxProps {
	type?: string;
	label: string;
	value?: string;
	name?: string;
	classNames?: string;
	placeholder?: string;
	register: object;
}

const TextBox = ({
	label = "label",
	placeholder = "",
	value,
	classNames,
	type="text",
	register
}: TextBoxProps) => {
	return (
		<div className="mb-8">
            <Text fontSizeClass="text-sm">{label}</Text>
			<div className="w-full">
				<input
					type={type}
					defaultValue={value}
					{...register}
					placeholder={placeholder}
					className={`mt-1 px-3 py-2 text-xs text-dark bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-gray-400 block w-full rounded-md sm:text-sm focus:ring-1 ${classNames}`}
				/>
			</div>
		</div>
	);
};

export { TextBox };
