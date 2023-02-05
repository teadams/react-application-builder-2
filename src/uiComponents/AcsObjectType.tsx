import React from "react";
import { useGetData, useGetAcsMetaObjectType } from "../hooks";
import AcsDataTable from "./AcsDataTable";
import { fieldsForObjectType } from "../lib/acsDataTableParams";

export const AcsObjectType = ({ objectType = "" }: { objectType: string }) => {
	const objectTypeMeta = useGetAcsMetaObjectType(objectType);
	const { data } = useGetData(objectType);
	if (!data || !objectTypeMeta || !objectType) {
		return null;
	}

	const objectTypeFields = objectTypeMeta.fields;

	return (
		<div>
			<AcsDataTable
				data={data}
				title={objectTypeMeta?.prettyPlural}
				objectTypeFields={objectTypeFields}
				objectType={objectType}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				fieldsToDisplay={fieldsForObjectType[objectType]}
			/>
		</div>
	);
};

export default AcsObjectType;
