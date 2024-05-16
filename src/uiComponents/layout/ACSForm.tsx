import React from "react";
import { ACSField } from "../fields";
import { useForm, useUpdateData } from "../../hooks";
import { Form } from "react-hook-form";

const ACSForm = ({ mode = "create", objectType, fields, data, hiddenFields, labelClassName,
	fieldClassName, fontSizeClass, textColorClass, fontWeightClass,
	onSubmit, formComponent, closeModal }:
	{
		mode?: "edit" | "create",
		objectType: string, fields: string[],
		data: Record<string, unknown>,
		hiddenFields?: Record<string, unknown>,
		labelClassName?: string, fieldClassName?: string, fontSizeClass?: string,
		textColorClass?: string, fontWeightClass?: string, onSubmit?: () => void,
		formComponent?: string,
		closeModal: () => void
	}) => {


	const FormComponent = formComponent as React.ElementType

	const { handleSubmit, handleChange } = useForm({ objectType, fields, mode, onSubmit, closeModal, hiddenFields, data })
	const validated = true;
	return (
		<>
			<form className="flex flex-col gap-y-4 mt-8">
				{formComponent ? <FormComponent
					testProp="testProp"
					handleCreateChange={handleChange}
					objectType="NONON"
					mode={mode}
					hiddenFields={hiddenFields}
					fields={fields}
					labelClassName={labelClassName}
					fieldClassName={fieldClassName}
					fontSizeClass={fontSizeClass}
					textColorClass={textColorClass}
					fontWeightClass={fontWeightClass}
				/>
					: <>
						{fields.map((field, index) => {
							const defaultValue = mode === "edit" ? data[field] : undefined
							return (
								<ACSField key={index} mode={mode} index={index} objectType={objectType} fieldName={field}
									handleCreateChange={handleChange} isForm={true} defaultValue={defaultValue}
									labelClassName={labelClassName} fieldClassName={fieldClassName}
									fontSizeClass={fontSizeClass} textColorClass={textColorClass}
									fontWeightClass={fontWeightClass}
								/>
							)
						})}
					</>
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



