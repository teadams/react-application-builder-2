import React from "react";

import { usePropState } from "../../hooks";

interface TextProps {
	data?: Record<string, unknown>;
	mode: string;
	index?: number;
	value?: unknown;
	isForm?: boolean;
	onBlur?: (e: unknown) => void;
	onChange?: (e: unknown) => void;
	className?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}

const Text = ({
	data = {},
	mode = "view",
	index = 0,
	onBlur,
	onChange,
	value,
	isForm = false,
	className,
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: TextProps) => {


	const autoFocus = index === 0;
	console.log("text value is ", value)

	const handleOnBlur = (e: unknown) => {
		onBlur && onBlur(e);
	}

	if (mode === "view") {
		return <>{value}</>
	} else {
		return (

			<input type="text" autoFocus={autoFocus} value={value as string}
				onChange={(e) => {
					onChange && onChange(e)
				}}
				onBlur={handleOnBlur}
				className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />

		)
	}
}

export { Text };
