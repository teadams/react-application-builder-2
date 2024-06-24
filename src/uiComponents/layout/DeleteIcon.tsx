// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { useQueryClient } from "react-query";
import crossSign from "./crossSign.svg";
import Image from "next/image";
import * as data from "../../lib/data";



export const DeleteIcon = ({
    objectType,
    id,
    icon = "crossSign",
}) => {
    const queryClient = useQueryClient();

    if (icon === "crossSign") {

        return (<Image src={crossSign} onClick={async () => {
            await data.updateById({
                objectType, id, queryClient, data: { isActive: false }
            });
        }} className="cursor-pointer" />)
    } else {
        return (
            <span
                className="border rounded-lg  w-9 hover:opacity-100 h-9 flex justify-center items-center cursor-pointer"
                onClick={() => alert("HI")
                }>
                <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 12V17"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 12V17"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M4 7H20"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        );
    }
};

export default DeleteIcon;
