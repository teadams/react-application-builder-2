import React from "react";
import { FormWrapper } from ".";
import { usePropState } from "../../hooks";

const BulletListView = ({
	list,
	introText,
	centerIntroText,
}: {
	list: string[];
	introText: string;
	centerIntroText?: boolean;
}) => {
	const introTextClass = centerIntroText ? "self-center" : "";
	return (
		<>
			{list && list.length > 0 && (
				<div className="flex flex-col mt-2 ">
					<div className={introTextClass}>{introText && introText}</div>
					<ul className="mt-1">
						{list.map((topic: string, index: number) => (
							<li key={index} className="">
								<span className="mr-1">👉</span> {topic as string}{" "}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

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
	centerIntroText,
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
	centerIntroText?: boolean;
}) => {
	const autoFocus = index === 0;

	const handleOnBlur = (e: unknown) => {
		onBlur && onBlur(e);
	};
	if (mode === "view") {
		return (
			<>
				<BulletListView
					list={value ? ((value as string).split(/\r?\n/) as string[]) : []}
					introText={fieldMeta?.instructions}
					centerIntroText={centerIntroText}
				/>
			</>
		);
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
export { BulletedList };
