import { type } from "os";
import React from "react";
import { Text } from "./Text";

interface RadioButtonProps {
  type?: string;
  label: string;
  value?: string;
  name?: string;
  classNames?: string;
  placeholder?: string;
  register: object;
}

const RadioButton = ({
  label = "label",
  value,
  register,
}: RadioButtonProps) => {
  return (
    <div className="flex">
      <input
        className="mr-2 focus:outline-none focus:ring-0 focus:XZCbg-theme-gray"
        type="radio"
        defaultValue={value}
        {...register}
      />
    </div>
  );
};

export { RadioButton };
