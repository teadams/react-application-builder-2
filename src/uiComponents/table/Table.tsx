// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React from "react";
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
	ColumnHelper,
	Table as TableType,
} from '@tanstack/react-table'
import { Headers, Body } from "./"


const createColumns = (columnHelper: ColumnHelper<unknown>, columnMeta: unknown, fields: string[] = []) => {
	const columns = []
	if (!columnMeta) return null
	for (const field of fields) {
		columns.push(columnHelper.accessor(field, {
			header: columnMeta[field].prettyName as string,
			cell: (info: { getValue: () => any; }) => info.getValue(),
		}))
	}
	return columns
}



const Table = ({ data, meta, fields, headerClassName, headerSpacingClassName, bodyClassName }: {
	data: unknown[],
	meta: unknown,
	fields: string[],
	headerClassName?: string
	headerSpacingClassName?: string
	bodyClassName?: string

}) => {
	const columnHelper = createColumnHelper<unknown>()
	const columns = createColumns(columnHelper, meta, fields) as unknown
	const table = useReactTable({
		data: data as unknown[],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	if (!data || !meta) return null

	return (
		<table>
			<thead>
				<Headers table={table} headerClassName={headerClassName} headerSpacingClassName={headerSpacingClassName} />
			</thead>
			<tbody>
				<Body table={table} bodyClassName={bodyClassName} />
			</tbody>
		</table>
	)
}

export { Table };


