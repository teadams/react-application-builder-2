import React from "react";
import { useForm } from "react-hook-form";
import EditSingleFieldForm from "./EditSingleFieldForm";
import EditRowForm from "./EditRowForm";
import { dataObjectForEditInterface } from "../types/ACSobjectTypesForUI";

interface modalProps {
  data: dataObjectForEditInterface;
  hideEditModal: any;
  objectType?: string;
  onSubmit: (
    formData: any,
    rowId?: string | undefined,
    formState?: object
  ) => Promise<void>;
}

const AcsDataTableEditModal = ({
  data,
  hideEditModal,
  onSubmit,
}: modalProps) => {
  const { register, handleSubmit, formState } = useForm();

  const standardProps = {
    data: data,
    register:
      data?.editRow === true
        ? register
        : { ...register(data?.objectTypeFieldMeta?.name) },
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ${
              data?.editRow === true ? "w-9/12" : "w-2/5"
            }`}
          >
            {data?.editRow === true ? (
              <EditRowForm
                onSubmit={handleSubmit((formData) =>
                  onSubmit(formData, data.rowId, formState)
                )}
                hideEditModal={hideEditModal}
                {...standardProps}
              />
            ) : (
              <EditSingleFieldForm
                onSubmit={handleSubmit((formData) =>
                  onSubmit(formData, data.rowId, formState)
                )}
                hideEditModal={hideEditModal}
                {...standardProps}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcsDataTableEditModal;
