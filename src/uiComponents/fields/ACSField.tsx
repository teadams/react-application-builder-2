import React from "react";
import { Text, TextArea, Avatar, DateTime } from ".";

import { useGetAcsMetaField, useGetDataByField, useUpdateData, useGetDataById } from "../../hooks";


const ACSField = ({
	objectType,
	id: propId,
	data: propData,
	mode: propMode = "view",
	index,
	handleCreateChange,
	isEditable = true,
	isForm = false,
	fieldName,
	label,
	value,
	defaultValue,
	lookupValue,
	lookupField = "id",
	labelClassName = "font-family-red-hat text-xs pl-1 text-[#18264C]",
	layoutClassName = "flex gap-y-2 flex-col",
	//	 focus:outline-none focus:ring-0  
	//	 
	fieldClassName = "focus:text-black bg-slate-50 focus:bg-blue-50 focus:outline-2  focus:outline-blue-500 border-[#E1E1E1]  text-[#18264C] text-sm rounded-lg       border rounded-lg w-[100%]  py-4 pl-3 pr-10  flex justify-center items-center gap-x-2",
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: {
	objectType: string;
	id?: string | number;
	data?: Record<string, unknown>;
	mode?: "view" | "edit" | "create";
	index?: number;
	handleCreateChange?: (fieldName: string, value: unknown) => void;
	isEditable?: boolean;
	isForm?: boolean;
	fieldName: string;
	label?: string | undefined;
	value?: unknown;
	defaultValue?: unknown;
	lookupValue?: any;
	lookupField?: string;
	labelClassName?: string;
	layoutClassName?: string;
	fieldClassName?: string;
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {

	const [mode, setMode] = React.useState(propMode);


	// Props:
	// For edit mode:
	// data - Row data - If this is provided, no call to server necessary
	// id - server lookup by id for the row data
	// lookupField and lookupValue - server lookup by field and value to look up

	// For create mode:
	// defaultValue (optional)
	// none of id, lookupField, lookupValue, data 
	//const mode = propId || lookupValue || propData ? "edit" : "create";

	const { data: idData } = useGetDataById({
		objectType,
		id: propId,
		enabled: propId !== undefined && propId !== null && mode === "edit" && !propData
	});

	const { data: fieldData } = useGetDataByField({
		objectType,
		lookupValue,
		lookupField,
		enabled: defaultValue === undefined && lookupValue && propId === undefined && mode === "edit" && !propData
	});

	const data = propData ?? fieldData?.[0] ?? idData ?? {}
	// WE get acsMeta here was we might get overrides from props later
	const fieldMeta = useGetAcsMetaField(objectType, fieldName)
	defaultValue = defaultValue ?? fieldMeta?.defaultValue ?? "";
	label = mode !== "view" ? label ?? fieldMeta?.prettyName : undefined
	const componentType = fieldMeta?.component ?? "Text";

	console.log("DEFAULT VALUE IN FIELD", defaultValue)
	value = ["edit", "create"].includes(mode) ? defaultValue ?? "" : value ?? data?.[fieldName]
	const id = propId ?? data?.id as string | number;
	const { mutate, isLoading: isMutating } = useUpdateData();
	const handleBlur = (e: unknown, mutatedValue: unknown) => {
		if (!isMutating && mode === "edit" && !isForm) {
			mutate({ objectType, id, fields: { [fieldName]: mutatedValue } });
		}
		if (propMode === "view") {
			setMode("view");
		}
		if (isForm && handleCreateChange) {
			handleCreateChange(fieldName, mutatedValue);
		}
	};


	const handleClick = () => {
		if (isEditable && mode == "view") {
			setMode("edit");
		}
	}
	//onClick={handleClick} - TODO add a click wrapper
	if (mode === "view") {
		return (<FieldComponent index={index} componentType={componentType} fieldMeta={fieldMeta} mode={mode} data={data} value={value} isForm={isForm}
			className={fieldClassName} fontSizeClass={fontSizeClass} textColorClass={textColorClass} fontWeightClass={fontWeightClass} />
		)
	} else {
		return (
			<div key={index} className={layoutClassName} >
				{label && <label className={labelClassName}>{label}</label>}
				<FieldComponent index={index} componentType={componentType} fieldMeta={fieldMeta} mode={mode} data={data} onBlur={handleBlur} value={value} isForm={isForm}
					className={fieldClassName} fontSizeClass={fontSizeClass} textColorClass={textColorClass} fontWeightClass={fontWeightClass} />
			</div>
		);
	}
}

const FieldComponent = (props: any) => {
	const { componentType, ...rest } = props;


	switch (componentType) {
		case "Text":
			return <Text {...rest} />;
		case "TextArea":
			return <TextArea {...rest} />;
		case "Avatar":
			return <Avatar {...rest} />;
		case "DateTime":
			return <DateTime {...rest} />;
		default:
			return <Text {...rest} />;
	}
}

export { ACSField };
