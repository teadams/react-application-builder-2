import React from "react";
import { ACSField } from "../fields";
import { useForm } from "../../hooks";

const ACSForm = ({ objectType, fields, labelClassName,
	fieldClassName, fontSizeClass, textColorClass, fontWeightClass }:
	{
		objectType: string, fields: string[],
		labelClassName?: string, fieldClassName?: string, fontSizeClass?: string,
		textColorClass?: string, fontWeightClass?: string
	}) => {

	const mode = "create"

	const { handleSubmit, handleChange } = useForm({ objectType, fields, mode })
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{fields.map((field, index) => {
					return (
						<ACSField key={index} mode={mode} objectType={objectType} fieldName={field}
							handleCreateChange={handleChange}
							labelClassName={labelClassName} fieldClassName={fieldClassName}
							fontSizeClass={fontSizeClass} textColorClass={textColorClass}
							fontWeightClass={fontWeightClass}
						/>
					)
				})}
				<button className="" type="submit">Submit</button>
			</form>
		</div>
	)
}

export { ACSForm };



