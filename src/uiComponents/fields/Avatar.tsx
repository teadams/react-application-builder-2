import React from "react";
import Image from "next/image";
import * as api from "../../lib/api";
import imageHolder from "../../../../../public/images/image-holder.svg";


import { FormWrapper } from ".";
import { usePropState } from "../../hooks";


const getFileFromS3 = async (fileName: any) => {
	const path = "recruiter_extension/getFileFromS3";
	const params = {
		fileName,
	};

	const apiResult: any = await api.callAPI({ path, params });
	return apiResult;
};

const getUploadUrl = async (fileName: string, bucketName = "") => {
	const path = "recruiter_extension/getS3UploadUrl";
	const params = {
		fileName,
		bucketName,
	};
	const apiResult: any = await api.callAPI({ path, params });
	return apiResult;
};

const uploadFileToS3 = async (file: any, fileName = "", bucketName = "") => {
	const url = await getUploadUrl(fileName, bucketName);
	const upload = await fetch(url, {
		method: "PUT",
		body: file,
	});
	const fileFromS3 = await getFileFromS3(fileName);
	return fileFromS3;
};

const Avatar = ({
	data = {},
	mode = "view",
	index = 0,
	onBlur,
	value: propValue = "", // need to default to "" or react will complain about controlled/uncontrolled input
	isForm = false,
	className,
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: {
	data?: Record<string, unknown>;
	mode: string;
	index?: number;
	value?: unknown;
	isForm?: boolean;
	onBlur?: (e: unknown, mutatedValue: unknown) => void;
	className?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const [value, setValue] = usePropState(propValue);




	const handleFileAttach = async (file: any) => {
		const uploadFile = file;
		const uploadFileName = Date.now() + "-" + uploadFile.name.replace(/\s+/g, "");
		const uploadS3Filename = await uploadFileToS3(
			uploadFile,
			uploadFileName
		);
		setValue(uploadS3Filename);
		onBlur && onBlur({ target: { value: uploadS3Filename } }, uploadS3Filename);
	}


	return (
		<div>
			<label htmlFor="avatarUploader">
				{isHovered && (
					<Image className="justify-center absolute w-[100px] h-[100px]" src={imageHolder} alt="addImage" />
				)}

				<div className="relative flex justify-center overflow-hidden text-3xl text-white bg-blue-400 items-center rounded-full w-[100px] h-[100px] cursor-pointer hover:opacity-30"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					{
						value ?
							<Image src={value} alt="upload image" width={100} height={100} />
							: <span>+</span>
					}
				</div>
			</label>
			<input
				type="file"
				className="hidden"
				onInput={(e) => {
					const file = (e.target as HTMLInputElement).files?.[0];
					if (file) {
						handleFileAttach(file);
					}
				}}
				id="avatarUploader"
			/>
		</div>
	)
}





export { Avatar };
