import React from "react";
import { useQueryClient } from "react-query";
import { usePropState } from "../../hooks";
import { Text, TextArea, Avatar, DateTime, BulletedList } from ".";
import { FormWrapper, ACSSelect } from "./";

import { useGetAcsMetaField, useGetDataByField, useUpdateRecord, useGetDataById } from "../../hooks";


const ACSField = ({
	objectType,
	id: propId,
	data: propData,
	mode: propMode = "view",
	index,
	handleFormChange,
	canEdit = true,
	viewPlaceholder,
	isInsideForm = false,
	fieldName,
	label,
	value: propValue,
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
	handleFormChange?: (fieldName: string, value: unknown) => void;
	canEdit?: boolean;
	viewPlaceholder?: boolean;
	isInsideForm?: boolean;
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

	propValue = propValue ?? propData?.[fieldName]
	if (propMode === "create" && propValue === undefined) {
		propValue = defaultValue ?? undefined
	}
	const [mode, setMode] = React.useState(propMode);
	const [value, setValue] = usePropState(propValue);
	const [dataInitialized, setDataInitialized] = React.useState(mode !== "create" && (!propData || propValue) ? false : true);
	const [touched, setTouched] = usePropState(false);
	const queryClient = useQueryClient();

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
	if (data && !dataInitialized) {
		setValue(data[fieldName]);
		setDataInitialized(true);
	}
	// WE get acsMeta here was we might get overrides from props later
	const fieldMeta = useGetAcsMetaField(objectType, fieldName)

	defaultValue = defaultValue ?? fieldMeta?.defaultValue ?? "";


	label = propMode !== "view" ? label ?? fieldMeta?.prettyName : undefined
	const componentType = fieldMeta?.component ?? "Text"

	viewPlaceholder = viewPlaceholder ?? (mode === "view" && canEdit) ? true : false;


	const id = propId ?? data?.id as string | number;

	const { mutate, isLoading: isMutating } = useUpdateRecord();
	const handleBlur = (e: any) => {
		if (!isMutating && mode === "edit" && !isInsideForm && touched) {
			setTouched(false);
			mutate({ objectType, id, data: { [fieldName]: e?.target?.value }, queryClient });
		}
		if (propMode === "view") {
			setMode("view");
		}
		if (isInsideForm && handleFormChange) {
			handleFormChange(fieldName, e?.target?.value);
		}
	};

	const handleChange = (e: any) => {
		setTouched(true);
		setValue(e.target.value as string)
	}

	const handleClick = () => {
		if (canEdit && mode == "view") {
			setMode("edit");
		}
	}

	const passthroughProps = {
		index, componentType, fieldMeta, mode, data, value, isInsideForm, viewPlaceholder,
		className: fieldClassName, fontSizeClass, textColorClass, fontWeightClass
	}
	//onClick={handleClick} - TODO add a click wrapper
	if (mode === "view") {

		return (<div onClick={handleClick}>
			<FieldComponent {...passthroughProps} />
		</div>
		)

	} else {
		return (
			<FormWrapper mode={mode} isForm={mode === "edit" && !isInsideForm} onSubmit={handleBlur}>
				<div key={index} className={layoutClassName} >
					{label && <label className={labelClassName}>{label}</label>}
					<FieldComponent onBlur={handleBlur} onChange={handleChange} {...passthroughProps} />
				</div>
			</FormWrapper>
		);
	}
}

const FieldComponent = (props: any) => {
	const { componentType, ...rest } = props;

	if (props.mode === "view" && !props?.value && props?.viewPlaceholder) {
		return (<div className="w-full">{props?.fieldMeta?.viewPlaceholder as string}</div>)
	}
	console.log("PROPS IS 	", props)
	switch (componentType) {
		case "Text":
			return <Text {...rest} />;
		case "Select": {
			const { referencesTable: objectType, referencesDisplayFields: displayFields,
				referencesSortBy: sortBy, referencesSortOrder: sortOrder, referencesAddNew: addAddNew,
				referencesAddNewFields: addNewFields
			} = props.fieldMeta;
			return <ACSSelect {...rest} objectType={objectType} displayFields={displayFields} sortBy={sortBy} sortOrder={sortOrder}
				addAddNew={addAddNew} addNewFields={addNewFields}
				onChange={(e: any, selectedValue: any, selectedRow: any) => { // Explicitly type 'selectedRow' as any
					props.onChange(e)
				}} />;
		}
		case "TextArea":
			return <TextArea {...rest} />;
		case "Avatar":
			return <Avatar {...rest} />;
		case "DateTime":
			return <DateTime {...rest} />;
		case "BulletedList":
			return <BulletedList {...rest} />;
		default: {
			return <Text {...rest} />;
		}
	}
}

export { ACSField };
