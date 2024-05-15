import React from "react";
import { ACSField } from "../fields";
import { useForm, useUpdateData } from "../../hooks";

const ACSForm = ({ objectType, fields, labelClassName,
	fieldClassName, fontSizeClass, textColorClass, fontWeightClass, onSubmit, closeModal }:
	{
		objectType: string, fields: string[],
		labelClassName?: string, fieldClassName?: string, fontSizeClass?: string,
		textColorClass?: string, fontWeightClass?: string, onSubmit: () => void,
		closeModal: () => void
	}) => {

	const mode = "create"


	const { handleSubmit, handleChange } = useForm({ objectType, fields, mode, onSubmit, closeModal })

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



