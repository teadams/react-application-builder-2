import React, { useState, useEffect } from "react";
import { ACSMetaModel } from "../types/ACSMetaModel";

import AcsMetaContext from "./AcsMetaContext";
import meta from "../lib/meta";

export const AcsMetaContextProvider = (props: any) => {
	const [acsMetaModel, setAcsMetaModel] = useState<ACSMetaModel | null>(null);
	useEffect(() => {
		const fetchMetaData = async () => {
			const acsMetaModel: ACSMetaModel = await meta.load("all");
			Object.freeze(acsMetaModel);
			setAcsMetaModel(acsMetaModel);
		};
		fetchMetaData().catch(console.error);
	}, []);

	return (
		<AcsMetaContext.Provider value={acsMetaModel}>
			{props.children}
		</AcsMetaContext.Provider>
	);
};

export default AcsMetaContextProvider;
