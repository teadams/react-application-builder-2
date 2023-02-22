import React, { useState, useEffect } from "react";
import AcsAuthContext from "./AcsAuthContext";
import { useGetData } from "../hooks";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const AcsAuthContextProvider = (props: any) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const tenantSetup: { [index: string]: unknown } = {};
  const { data = [] } = useGetData("acsTenantSetup");

  for (const row of data ?? []) {
    const rowParameter: any = row.parameter;
    tenantSetup[rowParameter?.key as string] = row.value;
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
      setUserInfo(userInfo);
    }
  }, []);

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
