import React from "react";
import { FC } from "react"

type Props = unknown;
const Tabs = ({
	names = [],
	components = [],
	props = [],
	style = "underline"

}: {
	names: string[];
	components: FC<Props>[];
	props: Record<string, unknown>[];
	style: "underline" | "tab"
}) => {

	const [activeTab, setActiveTab] = React.useState(0);
	const ActiveComponent = components[activeTab] as FC<Props>
	const activeProps = props[activeTab] ?? {}

	return (
		<div key="tabs" className="mb-4 border-b border-gray-200 dark:border-gray-700">
			{style === "underline" &&
				<ul key="tabs" className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
					{names.map((name, index) => {
						return (
							< li key={index} className="" role="presentation" >
								<button key={index} onClick={() => setActiveTab(index)} className={`border-b-2 inline-block p-4 rounded-t-lg ${index === activeTab ? 'text-blue-600 border-blue-600 dark:border-blue-500 dark:hover:text-blue-500 dark:text-blue-500 hover:text-blue-600' : ""}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{name}</button>
							</li>
						)

					})}
				</ul >
			}

			{style === "tab" &&
				<ul key="tabs" className="text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-40" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
					{names.map((name, index) => {
						return (
							<li className="w-full cursor-pointer" onClick={() => setActiveTab(index)}>
								<a className={`inline-block w-full p-4  border-r border-gray-400 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 ${index === activeTab ? 'bg-gray-100' : ''} focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}>{name}</a>
							</li>
						)
					})}
				</ul >
			}
			<div key="component" >
				<ActiveComponent {...activeProps} />
			</div>
		</div >


	)
}
export { Tabs };




{/* <div key={index} className="hidden" >
{components[index]}
</div> */}