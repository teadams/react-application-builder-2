import React from "react";
import { useGetDataByField } from "../../hooks/useGetDataByField";
import { on } from "events";

interface TextProps {
	data?: Record<string, unknown>;
	initialValue?: unknown;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>, mutatedValue: unknown) => void;
	className?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}

const Text = ({
	data = {},
	onBlur,
	initialValue,
	className = "bg-white border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ",
	fontSizeClass = "text-base",
	textColorClass = "text-dark",
	fontWeightClass = "font-normal",
}: TextProps) => {

	const [value, setValue] = React.useState<string>(initialValue as string);
	const [prevInitialvalue, setPrevInitialValue] = React.useState<string>(initialValue as string);
	if (prevInitialvalue !== initialValue) {
		setPrevInitialValue(initialValue as string);
		if (initialValue !== value) {
			setValue(initialValue as string);
		}
	}

	const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (value !== initialValue) {
			onBlur && onBlur(e, value);
		}
	}

	return (
		<div>
			<input type="text" value={value} onChange={(e) => setValue(e.target.value as string)}
				onBlur={handleOnBlur}
				className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />
		</div>
	);
}

export { Text };
