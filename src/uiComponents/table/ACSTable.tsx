import React from "react";
import { useGetAcsMetaFields } from "../../hooks/useGetAcsMeta"
import { useGetData } from "../../hooks/useGetData"
import { Table } from "./"


const ACSTable = ({
	objectType,
	fields,
	data: propsData,
	headerClassName, headerSpacingClassName, bodyClassName
}: {
	objectType: string,
	fields: string[],
	data?: Record<string, unknown>[],
	headerClassName?: string
	headerSpacingClassName?: string
	bodyClassName?: string
}) => {
	const { data } = useGetData({ objectType: objectType, enabled: propsData === undefined })
	const acsMeta = useGetAcsMetaFields(objectType)

	if (!data || !acsMeta) return null
	return <Table data={data} meta={acsMeta} fields={fields} headerClassName={headerClassName}
		headerSpacingClassName={headerSpacingClassName} bodyClassName={bodyClassName} />
}

export { ACSTable };


