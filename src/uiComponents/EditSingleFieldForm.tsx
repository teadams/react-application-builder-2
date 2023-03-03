import React, { useEffect } from "react";
import { RadioButton, TextBox } from "./formFields";
import { EditFormPropsInterface } from "../types/ACSobjectTypesForUI";
import { ReferencesDisplayFields } from "./ReferencesDisplayFields";
import { formField } from "./EditRowForm";

const EditSingleFieldForm = ({
  register,
  data,
  onSubmit,
  hideEditModal,
}: EditFormPropsInterface) => {
  const fieldValue: any =
    data.objectTypeFieldMeta?.dataType === "timestamp" && data?.value
      ? new Date(data.value).toISOString().substring(0, 10)
      : data.value;

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
              {data.objectTypeFieldMeta?.referencesDisplayField ? (
                <ReferencesDisplayFields
                  register={register}
                  label={data.objectTypeFieldMeta?.prettyName}
                  referencesTable={data.objectTypeFieldMeta.referencesTable}
                  referencesDisplayField={
                    data.objectTypeFieldMeta?.referencesDisplayField
                  }
                  referencesField={data.objectTypeFieldMeta?.referencesField}
                  readOnly={
                    data?.objectTypeFieldMeta?.readOnly
                      ? data?.objectTypeFieldMeta?.readOnly
                      : false
                  }
                  value={fieldValue}
                />
              ) : (
                formField(
                  fieldValue,
                  data.objectTypeFieldMeta?.prettyName,
                  data.objectTypeFieldMeta?.dataType,
                  register,
                  data.objectTypeFieldMeta?.readOnly
                )
              )}
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

export default EditSingleFieldForm;
