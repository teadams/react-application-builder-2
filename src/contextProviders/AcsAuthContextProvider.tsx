import React, { useState, useEffect } from "react";
import AcsAuthContext from "./AcsAuthContext";
import { useGetData } from "../hooks";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const AcsAuthContextProvider = (props: any) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  const tenantSetup: { [index: string]: unknown } = {};
  const { data = [] } = useGetData("acsTenantSetup");
  for (const row of data) {
    tenantSetup[row.parameter as string] = row.value;
  }

  return (
    <AcsAuthContext.Provider
      value={{
        userId: userId,
        user: user,
        tenantSetup: tenantSetup,
        logout: () => {
          localStorage.removeItem("user");
          setUser({});
          setUserId("");
        },
        login: (acsUserAuthContext) => {
          localStorage.setItem(
            "user",
            JSON.stringify(acsUserAuthContext.jwtToken)
          );
          setUserId(acsUserAuthContext.id as string);
          setUser(acsUserAuthContext.user as { [key: string]: unknown });
        },
      }}
    >
      {props.children}
    </AcsAuthContext.Provider>
  );
};

export default AcsAuthContextProvider;
