import React from "react";
import { FormWrapper } from ".";
import { usePropState } from "../../hooks";

const BulletListView = ({ list, introText }: { list: string[], introText: string }) => {
	return (<>
		{list && list.length > 0 &&
			<div className="mt-2 text-colorTextPrimary">
				<p className="text-colorTextPrimary text-base">
					{introText && introText}
				</p>
				<ul className="mt-1">
					{list.map((topic: string, index: number) => (
						<li key={index} className="text-colorTextPrimary text-sm">
							<span className="mr-1">👉</span> {topic as string}{" "}
						</li>
					))}
				</ul>
			</div>}
	</>)

}

const BulletedList = ({
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
	className?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {


	const autoFocus = index === 0;

	const handleOnBlur = (e: unknown) => {
		onBlur && onBlur(e);
	}
	if (mode === "view") {
		return <><BulletListView list={value ? (value as string).split(/\r?\n/) as string[] : []} introText={fieldMeta?.instructions} /></>
	} else {
		return (

			<textarea autoFocus={autoFocus} value={value as string}
				onChange={(e) => {
					onChange && onChange(e)
				}}
				onBlur={handleOnBlur}
				rows={fieldMeta?.rows}
				cols={fieldMeta?.cols}
				className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />
		)

	}
}
export { BulletedList };
