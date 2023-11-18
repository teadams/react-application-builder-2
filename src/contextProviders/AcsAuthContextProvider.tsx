import React, { useState, useEffect } from "react";
import AcsAuthContext from "./AcsAuthContext";
import { useGetData } from "../hooks";

export const AcsAuthContextProvider = (props: any) => {
	const [user, setUser] = useState({});
	const [userId, setUserId] = useState("");
	const [userInfo, setUserInfo] = useState({});
	const [initialLoad, setInitialLoad] = useState(true);
	const [tenantSetup, setTenantSetup] = useState<{ [index: string]: unknown }>(
		{}
	);

	// Loding in tenant parameters
	const { data = [] } = useGetData("acsTenantSetup", {}, initialLoad);
	if (data && data.length > 0 && Object.keys(tenantSetup).length === 0) {
		const info: { [index: string]: unknown } = {};
		for (const row of data ?? []) {
			// Parameter is a foreign key
			const rowParameter: any = row.parameter;
			info[rowParameter?.key as string] = row.value;
		}
		setTenantSetup(info);
	}

	useEffect(() => {
		const userFromLocalstorage = localStorage.getItem("user");
		const userInfoFromLocalstorage = localStorage.getItem("userInfo");

		if (userFromLocalstorage !== "undefined") {
			const user = JSON.parse(userFromLocalstorage as string);
			setUser(user);
		}
		if (userInfoFromLocalstorage !== "undefined") {
			const userInfo = JSON.parse(userInfoFromLocalstorage as string);
			setUserId(userInfo?.id);
			setUserInfo(userInfo);
		}

		setInitialLoad(false);
	}, []);

	// Return application only after initial user is loaded
	if (initialLoad) {
		return null;
	}
	return (
		<AcsAuthContext.Provider
			value={{
				userId: userId,
				user: user,
				tenantSetup: tenantSetup,
				userInfo: userInfo,
				logout: () => {
					localStorage.removeItem("user");
					localStorage.removeItem("userInfo");
					setUser({});
					setUserId("");
					setUserInfo({});
				},
				login: (acsUserAuthContext) => {
					localStorage.setItem(
						"user",
						JSON.stringify(acsUserAuthContext.jwtToken)
					);
					localStorage.setItem(
						"userInfo",
						JSON.stringify(acsUserAuthContext.user)
					);
					setUserId(acsUserAuthContext.id as string);
					setUser(acsUserAuthContext.user as { [key: string]: unknown });
					setUserInfo(acsUserAuthContext.user as object);
				},
			}}
		>
			{props.children}
		</AcsAuthContext.Provider>
	);
};

export default AcsAuthContextProvider;
