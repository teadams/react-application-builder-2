import React from "react";
import { usePropState } from "../../hooks";

interface TextProps {
	data?: Record<string, unknown>;
	mode: string;
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
	onBlur,
	value: propValue = "", // need to default to "" or react will complain about controlled/uncontrolled input
	isForm = false,
	className,
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: TextProps) => {

	const [value, setValue] = usePropState(propValue);

	const handleOnBlur = (e: unknown) => {
		onBlur && onBlur(e, value);

	}

	switch (mode) {
		case "view":
			return <>{value}</>

		case "edit":
			if (!isForm) {
				return (<input type="text" autoFocus={true} value={value}
					onChange={(e) => setValue(e.target.value as string)}
					onBlur={handleOnBlur}
					className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />
				)
			} else {
				return (
					<form onSubmit={handleOnBlur}>
						<input type="text" autoFocus={true} value={value} onChange={(e) => setValue(e.target.value as string)}
							onBlur={handleOnBlur}

							className={`${className} `} />
					</form>
				);
			}

		case "create":
			return (<><input type="text" value={value} onChange={(e) => setValue(e.target.value as string)}
				onBlur={handleOnBlur}
				className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} /></>)

	}
}
export { Text };
