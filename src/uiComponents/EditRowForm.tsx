import React from "react";
import { RadioButton, TextBox } from "./formFields";
import {
  EditFormPropsInterface,
  objectTypeFieldMetaInterface,
  dataObjectForEditInterface,
} from "../types/ACSobjectTypesForUI";
import { ReferencesDisplayFields } from "./ReferencesDisplayFields";

const formField = (
  value: string | undefined,
  prettyName: string,
  dataType: string,
  register: any
) => {
  const standardProps = {
    register: { ...register },
    label: prettyName,
    value: value,
  };

  switch (dataType) {
    case "string":
      return <TextBox {...standardProps} />;
    case "timestamp":
      return <TextBox type="date" {...standardProps} />;
    case "boolean":
      return <RadioButton {...standardProps} />;
    default:
      return null;
  }
};

const EditRowForm = ({
  register,
  data,
  onSubmit,
  hideEditModal,
}: EditFormPropsInterface) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Edit
            </h3>
            <div className="mt-6">
              <div className="grid grid-cols-3 gap-x-10">
                {data.objectTypeFields
                  ? Object.keys(data.objectTypeFields).map(
                      (field: string, index: number) => {
                        const objectTypeFields: objectTypeFieldMetaInterface =
                          data.objectTypeFields ? data.objectTypeFields : [];
                        const objectTypeFieldMeta: objectTypeFieldMetaInterface =
                          objectTypeFields[field as unknown as number];
                        const label = objectTypeFieldMeta.prettyName;
                        if (objectTypeFieldMeta?.referencesDisplayField) {
                          return (
                            <ReferencesDisplayFields
                              register={register(objectTypeFieldMeta?.name)}
                              label={label}
                              referencesTable={
                                objectTypeFieldMeta.referencesTable
                              }
                              referencesDisplayField={
                                objectTypeFieldMeta?.referencesDisplayField
                              }
                            />
                          );
                        } else {
                          const dataType = objectTypeFieldMeta.dataType;
                          let value;
                          if (data.rowId) {
                            const currentRow: any = data.allData?.find(
                              (item: any) => item.id === data.rowId
                            );
                            value =
                              dataType === "timestamp"
                                ? new Date(currentRow[field])
                                    .toISOString()
                                    .substring(0, 10)
                                : currentRow[field];
                          } else {
                            value = null;
                          }
                          return formField(
                            value,
                            label,
                            dataType,
                            register(objectTypeFieldMeta?.name)
                          );
                        }
                      }
                    )
                  : null}
                {/* {data.objectTypeFields
                  ? Object.keys(data.objectTypeFields).map(
                      (field: string, index: number) => {
                        return formField(field, index, register, data);
                      }
                    )
                  : null} */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            onSubmit={onSubmit}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => hideEditModal()}
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditRowForm;
