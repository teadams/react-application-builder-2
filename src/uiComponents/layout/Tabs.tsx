import React from "react";
import { FC } from "react"

type Props = unknown;
const Tabs = ({
	names = [],
	components = [],

}: {
	names: string[];
	components: FC<Props>[];
}) => {

	const [activeTab, setActiveTab] = React.useState(0);
	const ActiveComponent = components[activeTab] as FC<Props>

	return (
		<div className="mb-4 border-b border-gray-200 dark:border-gray-700">
			<ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">

				{names.map((name, index) => {
					return (
						<>
							<li key={index} className="" role="presentation">
								<button onClick={() => setActiveTab(index)} className={`border-b-2 inline-block p-4 rounded-t-lg ${index === activeTab ? 'text-blue-600 border-blue-600 dark:border-blue-500 dark:hover:text-blue-500 dark:text-blue-500 hover:text-blue-600' : ""}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{name}</button>
							</li>
						</>
					)

				})}
			</ul >
			<div>
				{<ActiveComponent />}
			</div>
		</div >


	)
}
export { Tabs };




{/* <div key={index} className="hidden" >
{components[index]}
</div> */}