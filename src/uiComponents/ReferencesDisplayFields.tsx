import React, { useEffect, useState } from "react";
import { useGetAcsMeta } from "../hooks";
import { getObjectData } from "../lib/data";
import { ACSMetaModel } from "../types";
import { Text } from "./formFields";

interface ReferencesDisplayFieldsProps {
  label?: string;
  referencesTable?: string;
  register: object;
}

const ReferencesDisplayFields = ({
  label = "Select",
  register,
  referencesTable,
}: ReferencesDisplayFieldsProps) => {
  const [objectData, setObjectData] = useState<Array<object>>([]);
  const acsMeta = useGetAcsMeta();
  const getDataForObjectType = async () => {
    console.log("name", name);

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

      <div className="w-full">
        <select
          className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1`}
          aria-label="Default select example"
          {...register}
        >
          <>
            <option value="">{`Select ${label}`}</option>
            {objectData?.map((option: any, i: number) => {
              console.log("option", option);

              return (
                <option key={i} value={option?.id as string}>
                  {option?.id as string}
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
