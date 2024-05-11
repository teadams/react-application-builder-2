import { children } from "cheerio/lib/api/traversing";
import React from "react";

const Card = ({ children, key = "card" }: { children: React.ReactNode, key?: string }) => {

	return (
		<div className={`p-4 border-b-2 bg-white shadow-md dark:bg-gray-800`} key={key} role="tabpanel" aria-labelledby="profile-tab">
			<div className="grid grid-cols-2 gap-6">
				<div>
					{children}
				</div>
			</div>
		</div>
	)
}

export { Card };



