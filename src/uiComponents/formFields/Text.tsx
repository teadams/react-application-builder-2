import React from "react";

interface TextProps {
	style?: React.CSSProperties;
	children: React.ReactNode;
	textColorClass?: string;
	fontWeightClass?: string;
	fontSizeClass?: string;
    classNames?:string
}

const Text = ({
	style,
	children,
	classNames,
	fontSizeClass="text-base",
	textColorClass="text-dark",
	fontWeightClass="font-normal",
}: TextProps) => {

	return (
		<div
			style={style}
			className={`${classNames} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`}
		>
			{children}
		</div>
	);
}

export { Text };
