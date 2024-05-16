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
	const validated = true;
	return (
		<>
			<form className="flex flex-col gap-y-4 mt-8">
				{
					fields.map((field, index) => {
						return (
							<ACSField key={index} mode={mode} objectType={objectType} fieldName={field}
								handleCreateChange={handleChange} isForm={true}
								labelClassName={labelClassName} fieldClassName={fieldClassName}
								fontSizeClass={fontSizeClass} textColorClass={textColorClass}
								fontWeightClass={fontWeightClass}
							/>
						)
					})
				}
			</form >
			<div className="flex justify-center w-full">
				<button onClick={handleSubmit} disabled={!validated}
					className={` mt-7  shrink ${validated ? "bg-[#18264C] text-white" : "bg-[#F3F3F3] text-[#808080]"}  py-3 px-10 rounded-md `}>
					Submit
				</button >
			</div>
		</>
	)
}

export { ACSForm };



