import React from "react";
import { Text } from "./";

interface TextBoxProps {
  type?: string;
  label: string;
  value?: string;
  name?: string;
  classNames?: string;
  placeholder?: string;
  register: object;
  required?: boolean;
  readOnly?: boolean;
  labelClassNames?: string;
  textBoxClassNames?: string;
}

function TextBox({
  label = "label",
  placeholder = "",
  value,
  classNames,
  type = "text",
  register,
  required = false,
  readOnly = false,
  labelClassNames = "text-sm",
  textBoxClassNames = "mb-8",
}: TextBoxProps) {
  return (
    <div className={textBoxClassNames}>
      <Text fontSizeClass={labelClassNames}>{label}</Text>
      <div className="w-full flex">
        <input
          type={type}
          {...register}
          defaultValue={value}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`mt-1 px-3 py-2 text-xs text-dark ${
            readOnly ? "bg-slate-200" : "bg-white"
          } border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-gray-400 block w-full rounded-md sm:text-sm focus:ring-1 ${classNames}`}
        />
        {required && <p className="text-rose-400 text-base ml-1">*</p>}
      </div>
    </div>
  );
}

export { TextBox };
