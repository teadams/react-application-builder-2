/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { useQueryClient, QueryClient } from "react-query";

import moment from "moment";
import { toast } from "react-toastify";
import { ACSMetaModel } from "../types";
import { useGetAcsMeta } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AcsDataTableEditModal from "./AcsDataTableEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createNewObjectDataRow,
  updateObjectDataById,
  deleteObjectDataById,
} from "../lib/data";

import {
  faXmark,
  faPenToSquare,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { objectTypeFieldMetaInterface } from "../types/ACSobjectTypesForUI";
import { ReferencesDisplayFields } from "./ReferencesDisplayFields";
import { useForm } from "react-hook-form";
import Icon from "./Icon";

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

const deleteRow = async (
  id: string,
  acsMeta: ACSMetaModel,
  objectType: string,
  queryClient: QueryClient
) => {
  await deleteObjectDataById(
    acsMeta as ACSMetaModel,
    queryClient,
    objectType as string,
    id
  );
  toast.success("Record Successfully Deleted", {
    className: "text-sm",
  });
};

const columnCmp = (value: string, callBack: () => void) => {
  return (
    <p title={value as string} onClick={callBack}>
      {value}
    </p>
  );
};

const getFilterComponent = (
  filterText: string,
  fieldsToDisplay: Array<object>,
  objectTypeFields: any,
  selectFilterCallback: (value: string) => void,
  cancelCallback: () => void,
  filterDataCallback: (value: string, type: string) => void
) => {
  const [searchInputText, setSearchInputText] = useState("");
  const { register, getValues } = useForm();
  const objectTypeFieldMeta: objectTypeFieldMetaInterface =
    objectTypeFields[filterText as unknown as number];

  const filterDataByObjectField = () => {
    const value = getValues("filter");
    filterDataCallback(value, "object");
  };

  return (
    <>
      <div className="w-full mb-10">
        <div className="flex items-center">
          <select
            className={`mr-5 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1`}
            aria-label="Default select example"
            onChange={(e) => selectFilterCallback(e.target.value)}
          >
            <>
              <option value="">Filter By</option>
              {fieldsToDisplay?.map((option: any, index: number) => {
                return (
                  <option key={Math.random() + index} value={option as string}>
                    {option as string}
                  </option>
                );
              })}
            </>
          </select>
          {filterText && (
            <div className="border px-2 py-1 rounded">
              <Icon
                icon="xmark"
                className="text-theme-blue"
                size="xl"
                onClick={cancelCallback}
              />
            </div>
          )}
        </div>

        {filterText && objectTypeFieldMeta?.referencesDisplayField && (
          <div className="flex items-center mt-4">
            <div className="w-full mr-5">
              <ReferencesDisplayFields
                register={register("filter")}
                label={objectTypeFieldMeta?.prettyName}
                referencesTable={objectTypeFieldMeta.referencesTable}
                referencesDisplayField={
                  objectTypeFieldMeta?.referencesDisplayField
                }
                referencesField={objectTypeFieldMeta?.referencesField}
              />
            </div>
            <Icon
              icon="search"
              className="text-theme-blue"
              size="xl"
              onClick={filterDataByObjectField}
            />
          </div>
        )}

        {filterText && !objectTypeFieldMeta?.referencesDisplayField && (
          <div className="flex items-center mt-4">
            <input
              placeholder={`Search by ${filterText}`}
              type="search"
              onBlur={(e) => setSearchInputText(e.target.value)}
              className="mt-1 mr-5 px-3 py-2 text-xs text-dark bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-gray-400 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            <Icon
              icon="search"
              className="text-theme-blue"
              size="xl"
              onClick={() => filterDataCallback(searchInputText, "string")}
            />
          </div>
        )}
      </div>
    </>
  );
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
  const [showAddRowModal, setShowAddRowModal] = useState<object>({});
  const [showEditModalForAField, setShowEditModalForAField] = useState<object>(
    {}
  );
  const [allData, setAllData] = useState<object[]>(data);
  const [filterText, setFilterText] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    setAllData(data);
    getCustomColumns(data, objectTypeFields);
  }, [data, objectType]);

  const hideEditModal = useCallback(() => setShowEditModalForAField({}), []);
  const hideAddModal = useCallback(() => setShowAddRowModal({}), []);

  const onSubmitAdd = useCallback(
    async (formData: any) => {
      const dataToAdd: any = {};

      Object.keys(formData).map((formField) => {
        if (formData[formField as string] === "") {
          return null;
        } else {
          dataToAdd[formField] = formData[formField as string];
        }
      });

      if (Object.keys(dataToAdd).length > 0) {
        const addRowResponse: any = await createNewObjectDataRow(
          acsMeta as ACSMetaModel,
          queryClient,
          objectType as string,
          { ...dataToAdd }
        );

        if ("persistResults" in addRowResponse) {
          toast.success("Record Successfully Added", {
            className: "text-sm",
          });
        }
      } else {
        toast.error("Nothing to insert", {
          className: "text-sm",
        });
      }

      hideAddModal();
    },
    [objectType]
  );

  const onSubmitEdit = useCallback(
    async (formData: any, rowId?: string, formState?: any) => {
      const dataToEdit: any = {};

      Object.keys(formData).map((formField) => {
        // if (objectTypeFields[formField as string]?.readOnly) return;

        if (formData[formField as string] === "") {
          const dataType = objectTypeFields[formField as string]?.dataType;
          dataToEdit[formField] =
            dataType === "boolean" ? false : dataType === "integer" ? 0 : "";
        } else {
          dataToEdit[formField] = formData[formField as string];
        }
      });

      if (Object.keys(dataToEdit).length > 0) {
        const editResponse: any = await updateObjectDataById(
          acsMeta as ACSMetaModel,
          queryClient,
          objectType as string,
          rowId,
          { ...dataToEdit }
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
      }
      hideEditModal();
      setFilterText("");
    },
    [objectType]
  );

  const filterTheData = useCallback(
    (searchText: string, searchType?: string) => {
      if (searchText) {
        const filteredItems = data.filter((item: any) =>
          searchType === "object"
            ? item &&
              item[filterText]["id"]?.toString()?.toLowerCase() ===
                searchText?.toLowerCase()
            : item &&
              item[filterText]
                ?.toString()
                ?.toLowerCase()
                .includes(searchText?.toLowerCase())
        );
        setAllData(filteredItems);
      } else {
        setAllData(data);
      }
    },
    [filterText, objectType]
  );

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

              const columnMetaData = {
                value: fieldValue,
                objectTypeFieldMeta: objectTypeFieldMeta,
                objectTypeFields: objectTypeFields,
                editRow: false,
                rowId: row["id"],
                allData: [],
              };

              return columnCmp(fieldValue?.toString(), () =>
                setShowEditModalForAField(columnMetaData)
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
                <Icon
                  icon="xmark"
                  className="text-rose-400"
                  size="xl"
                  onClick={() =>
                    deleteRow(
                      row.id,
                      acsMeta as ACSMetaModel,
                      objectType,
                      queryClient
                    )
                  }
                />
              </div>
              <div className="inline" title="delete row">
                <Icon
                  icon="pen-to-square"
                  className="text-[#302b2bd4] mx-4"
                  size="lg"
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
      <h5 className="font-medium py-8 lg:-mt-2 lg:mb-2 lg:text-3xl mb-1 text-2xl text-gray-900 text-center">
        {title ? title : objectType}
      </h5>

      {getFilterComponent(
        filterText,
        fieldsToDisplay,
        objectTypeFields,
        (value: string) => setFilterText(value),
        () => {
          setFilterText("");
          setAllData(data);
        },
        (value: string, type: string) => filterTheData(value, type)
      )}
      <div className="flex justify-end items-center mb-6">
        <Icon
          icon="circle-plus"
          className="text-[#302b2bd4] mr-2"
          size="lg"
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
      <div
        className={`mb-10 ${
          allData && allData.length > 0 ? "border shadow-lg" : ""
        }`}
      >
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
