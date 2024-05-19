import React from "react";
import { FormWrapper } from "./";
import { usePropState } from "../../hooks";

interface TextProps {
	data?: Record<string, unknown>;
	mode: string;
	index?: number;
	value?: unknown;
	isForm?: boolean;
	onBlur?: (e: unknown, mutatedValue: unknown) => void;
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
	value: propValue = "", // need to default to "" or react will complain about controlled/uncontrolled input
	isForm = false,
	className,
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: TextProps) => {

	const [value, setValue] = usePropState(propValue);
	const [touched, setTouched] = usePropState(false);

	const autoFocus = index === 0;

	const handleOnBlur = (e: unknown) => {
		touched && onBlur && onBlur(e, value);

	}

	if (mode === "view") {
		return <>{value}</>
	} else {
		return (
			<FormWrapper mode={mode} isForm={isForm} onSubmit={handleOnBlur}>
				<input type="text" autoFocus={autoFocus} value={value}
					onChange={(e) => {
						setTouched(true);
						setValue(e.target.value as string)
					}}
					onBlur={handleOnBlur}
					className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />

			</FormWrapper>
		)
	}
}

export { Text };
