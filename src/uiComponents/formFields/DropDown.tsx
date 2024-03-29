import React from "react";
import { Text } from "./";

interface DropDownProps {
  label?: string;
  register?: object;
  readOnly?: boolean;
  data: Array<object>;
  value: boolean | string | null;
  labelClassNames?: string;
  dropDownClassNames?: string;
}

function DropDown({
  label = "Select",
  register,
  readOnly = false,
  data = [],
  value,
  dropDownClassNames = "mb-8",
  labelClassNames = "text-sm",
}: DropDownProps) {
  return (
    <div className={dropDownClassNames}>
      <Text fontSizeClass={labelClassNames}>{label}</Text>

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
            <option value="">{`${label}`}</option>
            {data?.map((option: any, i: number) => {
              return (
                <option
                  key={i}
                  // value={option?.value}
                  selected={option?.value === value ? true : false}
                >
                  {option?.key}
                </option>
              );
            })}
          </>
        </select>
      </div>
    </div>
  );
}

export { DropDown };
