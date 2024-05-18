// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React, { FC } from "react";
import { usePropState } from "../../hooks";


const Tabs = ({
	names,
	components,
	props,
	data,
	selectedId: propsSelectedId,
	displayField = "name",
	idField = "id",
	style = "underline",
	onTabChange
}: {
	names?: string[];
	components?: FC<Props>[];
	props?: Record<string, unknown>[];
	selectedId?: string | number;
	data?: Record<string, unknown>[];
	displayField?: string;
	idField?: string;
	style?: "underline" | "tab",
	onTabChange?: (index: number) => void
}) => {
	const propsActiveTab = data?.findIndex((item: Record<string, unknown>) => item["id"] === propsSelectedId) ?? 0
	const [activeTab, setActiveTab] = usePropState(propsActiveTab ?? 0);
	const ActiveComponent = components ? components[activeTab] as FC<Props> : undefined
	const activeProps = props ? props[activeTab] ?? {} : {}
	if (!names || names.length === 0) {
		names = data?.map((item: Record<string, unknown>) => item[displayField] as string) ?? []
	}
	const handleOnClick = (index: number) => {
		setActiveTab(index)

		if (onTabChange) {
			onTabChange(data[index][idField])
		}
	}
	return (
		<div key="tabs" className="mb-4 border-b border-gray-200 dark:border-gray-700">
			{style === "underline" &&
				<ul key="tabs" className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
					{names.map((name, index) => {

						return (
							< li key={index} className="" role="presentation" >
								<button key={index} onClick={() => handleOnClick(index)} className={`border-b-2 inline-block p-4 rounded-t-lg ${index === activeTab ? 'text-blue-600 border-blue-600 dark:border-blue-500 dark:hover:text-blue-500 dark:text-blue-500 hover:text-blue-600' : ""}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{name}</button>
							</li>
						)

					})}
				</ul >
			}

			{style === "tab" &&
				<ul key="tabs" className="text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-40" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
					{names.map((name, index) => {
						return (
							<li key={index} className="w-full cursor-pointer" onClick={() => handleOnClick(index)}>
								<a className={`inline-block w-full p-4  border-r border-gray-400 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 ${index === activeTab ? 'bg-gray-100' : ''} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}>{name}</a>
							</li>
						)
					})}
				</ul >
			}
			{components && <div key="component" >
				<ActiveComponent {...activeProps} />
			</div>}
		</div >


	)
}
export { Tabs };




{/* <div key={index} className="hidden" >
{components[index]}
</div> */}