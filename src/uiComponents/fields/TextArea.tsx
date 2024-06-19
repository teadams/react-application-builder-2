import React from "react";
import { FormWrapper } from "./";
import { usePropState } from "../../hooks";

const TextArea = ({
	data = {},
	mode = "view",
	onBlur,
	index = 0,
	value: propValue = "", // need to default to "" or react will complain about controlled/uncontrolled input
	fieldMeta,
	onChange,
	value,
	isForm = false,
	className,
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: {
	data?: Record<string, unknown>;
	mode: string;
	value?: unknown;
	index?: number;
	fieldMeta?: any;
	isForm?: boolean;
	onBlur?: (e: unknown) => void;
	onChange?: (e: unknown) => void;
	className?: string;
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}) => {
	console.log("fieldMeta", fieldMeta);
	const autoFocus = index === 0;

	const handleOnBlur = (e: unknown) => {
		onBlur && onBlur(e);
	};

	if (mode === "view") {
		return <div className="whitespace-pre-wrap">{value as string}</div>;
	} else {
		return (
			<textarea
				autoFocus={autoFocus}
				value={value as string}
				onChange={(e) => {
					onChange && onChange(e);
				}}
				onBlur={handleOnBlur}
				rows={fieldMeta?.rows}
				cols={fieldMeta?.cols}
				className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`}
			/>
		);
	}
};
export { TextArea };
