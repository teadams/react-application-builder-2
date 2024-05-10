import React from "react";

import {
	flexRender,
	Table
} from '@tanstack/react-table'


const Body = ({ table,
	bodyClassName = "p-4 font-family-red-hat text-[#808080] text-sm text-left",
}: {
	table: Table<unknown>
	bodyClassName?: string
}) => {
	return (
		<>
			{table.getRowModel().rows.map(row => (
				<tr key={row.id}>
					{row.getVisibleCells().map(cell => (
						<td className={bodyClassName} key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</td>
					))}
				</tr>
			))}
		</>
	)

}


export { Body };


