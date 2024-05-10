import React from "react";
import {
	flexRender,
	Table
} from '@tanstack/react-table'


const Headers = ({ table,
	headerClassName = "cursor-pointer p-4 text-[#808080] font-family-red-hat text-sm font-bold text-left",
	headerSpacingClassName = "mx-5"
}: {
	table: Table<unknown>
	headerClassName?: string
	headerSpacingClassName?: string

}) => {
	return (
		table.getHeaderGroups().map(headerGroup => (
			<tr className={headerClassName} key={headerGroup.id}>

				{headerGroup.headers.map(header => (
					<th key={header.id}>
						{header.isPlaceholder
							? null
							: flexRender(
								header.column.columnDef.header,
								header.getContext()
							)}
						<span
							className={headerSpacingClassName}>
						</span>
					</th>
				))}
			</tr>
		))
	)

}

export { Headers };


