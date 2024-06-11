import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import * as api from "../../lib/api";



const Upload = ({
	data = {},
	mode = "view",
	index = 0,
	onBlur,
	onChange,
	value,
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
	onBlur?: (e: unknown) => void;
	onChange?: (e: unknown) => void;
	className?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}
) => {
	const [uploading, setUploading] = useState(false);

	const getFileNameFromS3Url = (s3Url: string) => {
		const unsignedUrl = s3Url.split("?")[0].split("://")[1];
		const fileName = unsignedUrl.split("com/")[1].split("-")[1];

		return decodeURIComponent(fileName);
	};

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


	const autoFocus = index === 0;

	const handleOnBlur = (e: unknown) => {
		onBlur && onBlur({ target: { value: value } });
	}

	const handleOnChange = async (e: any) => {
		if (e.target.files) {
			setUploading(true);
			const uploadFile = e.target.files[0];
			const uploadFileName =
				Date.now() + "-" + uploadFile.name.replace(/\s+/g, "");


			const uploadS3Filename = await uploadFileToS3(
				uploadFile,
				uploadFileName
			);
			console.log("UploadS3Filename", uploadS3Filename)
			onChange && onChange({ target: { value: uploadS3Filename } })
			setUploading(false);
		}

	}

	console.log("BIOvalue", value)

	if (mode === "view") {
		return (
			<Link
				href={value as string}
				target="_blank"
				className="underline"
			>
				{getFileNameFromS3Url(value as string)}
			</Link>)
	} else {
		return (

			<input type="file" autoFocus={autoFocus}
				onChange={handleOnChange}
				onBlur={handleOnBlur}
				className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />

		)
	}
}

export { Upload };
