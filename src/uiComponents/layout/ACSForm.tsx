import React from "react";
import { ACSField } from "../fields";
import { useForm } from "../../hooks";


const ACSForm = ({
	mode = "create", objectType, fields, path, data, hiddenFields, labelClassName,
	fieldClassName, fontSizeClass, textColorClass, fontWeightClass,
	onSuccess, preSubmit, postSubmit, overrideSubmit, formComponent, closeModal,
	invalidateQueryKeys
}: {

	mode?: "edit" | "create",
	objectType: string, fields: string[],
	path: string,
	data?: Record<string, unknown>,
	hiddenFields?: Record<string, unknown>,
	labelClassName?: string, fieldClassName?: string, fontSizeClass?: string,
	textColorClass?: string, fontWeightClass?: string, onSubmit?: () => void,
	formComponent?: string,
	onSuccess?: () => void,  // used to close caller modals
	preSubmit?: ({ objectType, data }:
		{ objectType: string, data: Record<string, unknown> }) => any, // 
	overrideSubmit?: ({ objectType, data, preSubmitResult }:
		{
			objectType: string, data: Record<string, unknown>,
			preSubmitResult: Record<string, unknown>
		}) => any, // 
	postSubmit?: ({ objectType, data, preSubmitResult, submitResult }:
		{
			apiResult: any;
			objectType: string, data: Record<string, unknown>,
			preSubmitResult: Record<string, unknown>,
			submitResult: Record<string, unknown>
		}) => any, // 
	closeModal?: () => void,
	invalidateQueryKeys?: string[]
}) => {


	const FormComponent = formComponent as React.ElementType

	const { handleSubmit, handleChange } = useForm({ objectType, fields, mode, path, onSuccess, closeModal, hiddenFields, data, preSubmit, postSubmit, overrideSubmit, invalidateQueryKeys })
	const validated = true;
	return (
		<>
			<form className="flex flex-col gap-y-4 mt-8">
				{formComponent ? <FormComponent
					testProp="testProp"
					handleCreateChange={handleChange}
					objectType={objectType}
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
							const defaultValue = mode === "edit" ? data?.[field] : undefined
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



