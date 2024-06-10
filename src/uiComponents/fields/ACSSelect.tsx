import React, { useState } from "react";
import utils from "../../lib/utils"
import { useGetData, useGetAcsMetaObjectType, usePropState } from "../../hooks";
import { ACSForm, Modal } from "../layout";
import { Select } from "./"


const ACSSelect = ({
	objectType,
	value: propValue,
	displayFields = ["name"],
	label,
	params,
	filters,
	onChange,
	onBlur,
	sortBy,
	sortOrder,
	addSelectObjectName = true,
	addAddNew = false,
	addNewFields = [],
	objectName,
	initialSelect = [],
	labelClassName = "font-family-red-hat text-xs pl-1 text-[#18264C]",
	layoutClassName = "flex gap-y-2 flex-col",
	fieldClassName = "border focus:outline-none  rounded-lg w-[100%]  p-2 text-sm disabled font-family-red"

}: {
	objectType: string,
	value?: string | number | readonly string[] | undefined,
	displayFields?: string[],
	label?: string,
	params?: Record<string, any>;
	filters?: Record<string, any>
	onChange?: (e: any, newValue: string, newRow: Record<string, unknown> | undefined) => void;
	onBlur?: (e: any) => void;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	addSelectObjectName?: boolean, // Add -- select ObjectName --
	addAddNew?: boolean, // add option to create a new record of this objectType
	addNewFields?: string[], // fields to display in the add new modal
	objectName?: string, // Override to meta object name
	initialSelect?: Record<string, unknown>[] // additional select options
	labelClassName?: string,
	layoutClassName?: string,
	fieldClassName?: string
}) => {
	const { data } = useGetData({ objectType, params, filters, sortBy, sortOrder });
	const [addObjectTypeModal, setAddObjectTypeModal] = useState(false);
	const [value, setValue] = usePropState(propValue as any);

	const objectTypeMeta = useGetAcsMetaObjectType(objectType);

	if (!data) return null;
	const options: any[] = []

	for (const row of data) {
		const value = displayFields.map((field) => {
			return utils.getDeepValueFromString(row, field)
		}).join(" ")
		options.push({ ...row, value })
	}

	if (!objectName) {
		objectName = objectTypeMeta?.prettyName || objectType;
	}

	if (initialSelect.length > 0) {
		options.unshift(...initialSelect)
	}
	if (addAddNew) {
		options.unshift({
			returnUndefined: true,
			id: "add", value: `--- Add New ${objectName} ---`, onChange: () => {
				setAddObjectTypeModal(true);
			},
		})
	}
	if (addSelectObjectName) {
		options.unshift({ returnUndefined: true, id: "", value: `--- Select ${objectName} ---` });
	}

	const handleChange = (e: any) => {
		const selectedValue = e.target.value;
		setValue(e.target.value);
		let selectedRow = options?.find((option: any) => option.id === selectedValue);
		if (selectedRow && typeof selectedRow.onChange === 'function') {
			selectedRow.onChange(e, selectedValue, selectedRow, e);
		} else if (onChange) {
			selectedRow = selectedRow?.returnUndefined ? undefined : selectedRow
			onChange(e, selectedValue, selectedRow);
		}
		if (onBlur) {
			onBlur(e);
		}
	}




	return (
		<div key={objectType} className={layoutClassName}>
			{label && <label className={labelClassName}>{label}</label>}
			<Select
				options={options as any[]}
				value={value}
				className={`${fieldClassName}`}
				onChange={handleChange}
			/>
			{
				addObjectTypeModal && <Modal title={"Add New " + objectTypeMeta?.prettyName} key={"add" + objectType}
					closeModal={() => { setAddObjectTypeModal(false) }}>
					<ACSForm objectType={objectType}
						closeModal={() => setAddObjectTypeModal(false)}
						postSubmit={(result) => {
							const newObject = result.apiResult.persistResults[0]
							options.push(newObject)
							const e = { target: { value: newObject.id } }
							handleChange(e)
						}}
						fields={addNewFields} />
				</Modal>
			}
		</div >



	);

}

export { ACSSelect }