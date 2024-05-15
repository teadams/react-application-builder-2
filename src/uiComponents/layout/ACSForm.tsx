import React from "react";
import { ACSField } from "../fields";
import { useForm, useUpdateData } from "../../hooks";

const ACSForm = ({ objectType, fields, hiddenFields, labelClassName,
	fieldClassName, fontSizeClass, textColorClass, fontWeightClass, onSubmit, closeModal }:
	{
		objectType: string, fields: string[],
		hiddenFields: Record<string, unknown>,
		labelClassName?: string, fieldClassName?: string, fontSizeClass?: string,
		textColorClass?: string, fontWeightClass?: string, onSubmit: () => void,
		closeModal: () => void
	}) => {

	const mode = "create"


	const { handleSubmit, handleChange } = useForm({ objectType, fields, mode, onSubmit, closeModal, hiddenFields })

	return (
		<div>
			<form>
				{fields.map((field, index) => {
					return (
						<ACSField key={index} mode={mode} objectType={objectType} fieldName={field}
							handleCreateChange={handleChange} isForm={true}
							labelClassName={labelClassName} fieldClassName={fieldClassName}
							fontSizeClass={fontSizeClass} textColorClass={textColorClass}
							fontWeightClass={fontWeightClass}
						/>
					)
				})}
			</form>
			<button className="" onClick={handleSubmit}>Submit</button>
		</div >
	)
}

export { ACSForm };



