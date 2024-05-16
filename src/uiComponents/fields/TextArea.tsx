import React from "react";
import { Form } from "./";
import { usePropState } from "../../hooks";

const TextArea = ({
	data = {},
	mode = "view",
	onBlur,
	value: propValue = "", // need to default to "" or react will complain about controlled/uncontrolled input
	fieldMeta,
	isForm = false,
	className,
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: {
	data?: Record<string, unknown>;
	mode: string;
	value?: unknown;
	fieldMeta?: any;
	isForm?: boolean;
	onBlur?: (e: unknown, mutatedValue: unknown) => void;
	className?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {

	const [value, setValue] = usePropState(propValue);
	isForm = (mode === "create" || mode === "edit" && isForm) ? true : isForm;

	const handleOnBlur = (e: unknown) => {
		onBlur && onBlur(e, value);

	}


	if (mode === "view") {
		return <>{value}</>
	} else {
		return (
			<Form isForm={isForm} onSubmit={handleOnBlur}>
				<textarea value={value} onChange={(e) => setValue(e.target.value as string)}
					onBlur={handleOnBlur}
					rows={fieldMeta?.rows}
					cols={fieldMeta?.cols}
					className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />
			</Form>
		)
	}

}
export { TextArea };
