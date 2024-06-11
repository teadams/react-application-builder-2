import React from "react";
import { ACSField } from "../fields";
import { useForm, useGetDataById } from "../../hooks";


const ACSForm = ({
	mode = "create", objectType, fields, path, data, id, hiddenFields, labelClassName,
	fieldClassName, fontSizeClass, textColorClass, fontWeightClass,
	onSuccess, preSubmit, postSubmit, overrideSubmit, formComponent, closeModal,
	invalidateQueryKeys
}: {

	mode?: "edit" | "create",
	objectType: string, fields: string[],
	path?: string,
	data?: Record<string, unknown>,
	id?: string,
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
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore 
	const { handleSubmit, handleChange } = useForm({ objectType, fields, mode, path, onSuccess, closeModal, hiddenFields, data, preSubmit, postSubmit, overrideSubmit, invalidateQueryKeys })
	const validated = true;

	console.log("id", id)
	console.log("objectType", objectType)

	const { data: idData } = useGetDataById({
		objectType,
		id: id,
		enabled: mode === "edit" && !data
	});

	console.log("id", id)
	console.log("idData is ", idData)
	data = data ?? idData;
	console.log("data is ", data)


	if (mode === "edit" && !data) { return null }

	return (
		<>
			<form className="flex flex-col gap-y-4 mt-8">
				{formComponent ? <FormComponent
					testProp="testProp"
					handleFormChange={handleChange}
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
							return (
								<ACSField key={index} mode={mode} index={index} objectType={objectType} fieldName={field}
									handleFormChange={handleChange} isInsideForm={true} data={data}
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



