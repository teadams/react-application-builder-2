import React, { useEffect, useState } from "react";
import { useGetAcsMeta } from "../hooks";
import { getObjectData } from "../lib/data";
import { ACSMetaModel } from "../types";
import { Text } from "./formFields";

interface ReferencesDisplayFieldsProps {
  label?: string;
  referencesTable?: string;
  referencesDisplayField?: string;
  register?: object;
  readOnly?: boolean;
  value?: any;
  referencesField?: string;
}

const ReferencesDisplayFields = ({
  label = "Select",
  register,
  referencesTable,
  referencesDisplayField,
  readOnly = false,
  value = null,
  referencesField = "",
}: ReferencesDisplayFieldsProps) => {
  const [objectData, setObjectData] = useState<Array<object>>([]);
  const acsMeta = useGetAcsMeta();
  const getDataForObjectType = async () => {
    const data = await getObjectData(
      acsMeta as ACSMetaModel,
      referencesTable as string
    );
    setObjectData(data);
  };
  useEffect(() => {
    getDataForObjectType();
  }, []);

  return (
    <div className="mb-8">
      <Text fontSizeClass="text-sm">{label}</Text>

      <div className="w-full flex">
        <select
          className={`mt-1 px-3 py-2 ${
            readOnly ? "bg-slate-200" : "bg-white"
          } border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1`}
          aria-label="Default select example"
          {...register}
          disabled={readOnly}
        >
          <>
            <option value="">{`Select ${label}`}</option>
            {objectData &&
              objectData?.map((option: any, i: number) => {
                return (
                  <option
                    key={i}
                    value={option ? option[referencesField] : ""}
                    selected={option?.id === value ? true : false}
                  >
                    {
                      option[
                        referencesDisplayField as unknown as number
                      ] as string
                    }
                  </option>
                );
              })}
          </>
        </select>
      </div>
    </div>
  );
};

export { ReferencesDisplayFields };
