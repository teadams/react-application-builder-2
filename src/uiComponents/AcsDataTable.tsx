import React from "react";

import moment from "moment";
import { toast } from "react-toastify";
import { ACSMetaModel } from "../types";
import { useGetAcsMeta } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteObjectDataById } from "../lib/data";
import AcsDataTableEditModal from "./AcsDataTableEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createNewObjectDataRow, updateObjectDataById } from "../lib/data";

import {
	faXmark,
	faPenToSquare,
	faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { objectTypeFieldMetaInterface } from "../types/ACSobjectTypesForUI";

const customStyles = {
	headCells: {
		style: {
			paddingLeft: "8px",
			paddingRight: "8px",
			background: "#fff",
			color: "#000",
		},
	},
	cells: {
		style: {
			padding: "10px",
			color: "#7A8994",
		},
	},
	pagination: {
		style: {
			background: "#fff",
			color: "#000",
		},
		pageButtonsStyle: {
			background: "#fff",
			margin: "0 2px",
			color: "#000",
			fill: "#000",
			height: "30px",
			width: "30px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			padding: "6px",
			"&:hover:not(:disabled)": {
				backgroundColor: "#7A8994",
				color: "#000",
				fill: "#fff",
				border: "1px solid white !important",
			},
		},
	},
	table: {
		style: {
			minHeight: "70vh",
		},
	},
};

const AcsDataTable = ({
	data,
	title,
	objectTypeFields,
	objectType,
	fieldsToDisplay = [],
}: any) => {
	const acsMeta = useGetAcsMeta();
	const [columns, setColumns] = useState<object[]>([]);
	const [allData, setAllData] = useState<object[]>(data);
	const [showAddRowModal, setShowAddRowModal] = useState<object>({});
	const [showEditModalForAField, setShowEditModalForAField] = useState<object>(
		{}
	);

	useEffect(() => {
		getCustomColumns(allData, objectTypeFields);
	}, [allData]);

	const hideEditModal = useCallback(() => setShowEditModalForAField({}), []);
	const hideAddModal = useCallback(() => setShowAddRowModal({}), []);

	const onSubmitAdd = useCallback(async (formData: any) => {
		const addRowResponse: any = await createNewObjectDataRow(
			acsMeta as ACSMetaModel,
			objectType as string,
			{ ...formData }
		);

		if ("persistResults" in addRowResponse) {
			toast.success("Record Successfully Added", {
				className: "text-sm",
			});
		}
		hideAddModal();
	}, []);

	const onSubmitEdit = useCallback(async (formData: any, rowId?: string) => {
		const editResponse: any = await updateObjectDataById(
			acsMeta as ACSMetaModel,
			objectType as string,
			rowId,
			{ ...formData }
		);

		if ("persistResults" in editResponse) {
			toast.success("Record Successfully Updated", {
				className: "text-sm",
			});
		} else {
			toast.error("Record Can not be Updated", {
				className: "text-sm",
			});
		}
		hideEditModal();
	}, []);

	const deleteRow = async (id: string) => {
		await deleteObjectDataById(
			acsMeta as ACSMetaModel,
			objectType as string,
			id
		);

		const filteredDataAfterDeletion = allData.filter(
			(item: any) => item.id != id
		);
		setAllData(filteredDataAfterDeletion);
		toast.success("Record Successfully Deleted", {
			className: "text-sm",
		});
	};

	const columnCmp = (
		value: string,
		rowId: object,
		objectTypeFieldMeta: object,
		objectTypeFields: any
	) => {
		const object = {
			value: value,
			objectTypeFieldMeta: objectTypeFieldMeta,
			objectTypeFields: objectTypeFields,
			editRow: false,
			rowId: rowId,
			allData: [],
		};

		return (
			<p
				title={value as string}
				onClick={() => setShowEditModalForAField(object)}
			>
				{value}
			</p>
		);
	};

	// get custom (names/header cells) for data table
	const getCustomColumns = (
		data: Array<object> = [],
		objectTypeFields: Array<object> = []
	) => {
		if (objectTypeFields) {
			const customColumns: Array<object> = [];
			const arrayOfFields = Object.keys(objectTypeFields);

			for (let i = 0; i < arrayOfFields?.length; i++) {
				const field = arrayOfFields[i];

				if (fieldsToDisplay.includes(field) || fieldsToDisplay.length === 0) {
					const objectTypeFieldMeta: objectTypeFieldMetaInterface =
						objectTypeFields[field as unknown as number];
					const fieldPrettyName = objectTypeFieldMeta.prettyName;

					const columnObject = {
						name: fieldPrettyName,
						sortable: true,
						selector: (row: any) => row[field],
						cell: (row: any) => {
							const fieldValue =
								row[field] === null
									? "--"
									: typeof row[field] === "object"
									? row[field][objectTypeFieldMeta.referencesDisplayField] ===
									  null
										? "--"
										: row[field][objectTypeFieldMeta.referencesDisplayField]
									: objectTypeFieldMeta.dataType === "timestamp"
									? moment(row[field]).format("MM-DD-YYYY")
									: row[field];

							return columnCmp(
								fieldValue,
								row["id"],
								objectTypeFieldMeta,
								objectTypeFields
							);
						},
					};

					customColumns.push(columnObject);
				}
			}

			const actionsColumn = {
				name: "Actions",
				width: "100px",
				selector: (row: any) => {
					const object = {
						value: "",
						objectTypeFieldMeta: {},
						objectTypeFields: objectTypeFields,
						editRow: true,
						rowId: row["id"],
						allData: data,
					};

					return (
						<div className="flex items-center">
							<div className="inline" title="delete row">
								<FontAwesomeIcon
									icon={faXmark}
									style={{ color: "#eb0808" }}
									className="h-5"
									onClick={() => deleteRow(row.id)}
								/>
							</div>
							<div className="inline" title="delete row">
								<FontAwesomeIcon
									icon={faPenToSquare}
									style={{ color: "#302b2bd4" }}
									className="h-4 mx-4"
									onClick={() => setShowEditModalForAField(object)}
								/>
							</div>
						</div>
					);
				},
			};

			customColumns.push(actionsColumn);
			setColumns(customColumns);
		} else {
			return [];
		}
	};

	return (
		<div className="px-14">
			{title && (
				<h5 className="font-medium py-8 lg:-mt-2 lg:mb-2 lg:text-3xl mb-1 text-2xl text-gray-900 text-center">
					{title}
				</h5>
			)}
			{allData.length > 0 && (
				<div className="flex justify-end items-center mb-6">
					<FontAwesomeIcon
						icon={faCirclePlus}
						style={{ color: "#302b2bd4" }}
						className="h-4 mr-2"
						onClick={() =>
							setShowAddRowModal({
								value: "",
								objectTypeFieldMeta: {},
								objectTypeFields: objectTypeFields,
								editRow: true,
								rowId: "",
								allData: [],
							})
						}
					/>
					Add
				</div>
			)}
			<div className={`mb-10 ${allData.length > 0 ? "border shadow-lg" : ""}`}>
				<DataTable
					columns={columns}
					data={allData}
					pagination
					customStyles={customStyles}
					noDataComponent={
						<h4 className="text-sm font-regular text-dark px-6 py-4 whitespace-nowrap text-center">
							There are no records to display
						</h4>
					}
				/>
			</div>
			{Object.keys(showEditModalForAField).length > 0 && (
				<AcsDataTableEditModal
					hideEditModal={hideEditModal}
					data={showEditModalForAField}
					objectType={objectType}
					onSubmit={onSubmitEdit}
				/>
			)}
			{Object.keys(showAddRowModal).length > 0 && (
				<AcsDataTableEditModal
					hideEditModal={hideAddModal}
					data={showAddRowModal}
					objectType={objectType}
					onSubmit={onSubmitAdd}
				/>
			)}
		</div>
	);
};
export default AcsDataTable;
