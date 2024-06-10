import React from "react";



const Select = ({
	value,
	options,
	onChange,
	onBlur,
	className = "border focus:outline-none  rounded-lg w-[100%]  p-2 text-sm disabled font-family-red",
}: {
	value?: unknown;
	options?: any[];
	onChange?: (value: string) => void;
	className?: string;
}) => {

	if (!options) return null;
	const handleChange = (e: any) => {

		if (onChange) {
			onChange(e);
		}

	};

	const handleBlur = (e: any) => {

		if (onBlur) {
			onBlur(e);
		}

	};

	const width = "w-[300px]"

	return (

		<div className={`${width}`} >
			<select
				value={value as string}
				className={`w-full ${className}`}
				onChange={handleChange}
				onBlur={handleBlur}
			>


				{
					options.map((option: any) => {
						return (<option key={option.id} value={option.id}>
							{option.value}
						</option>)
					})
				}
			</select >
		</div >
	);
}

export { Select }