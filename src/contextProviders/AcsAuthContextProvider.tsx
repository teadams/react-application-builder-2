import React, { useState, useEffect } from "react";
import { ACSAuthContext } from "../types";
import AcsAuthContext from "./AcsAuthContext";

export const AcsAuthContextProvider = (props: any) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  return (
    <AcsAuthContext.Provider
      value={{
        userId: userId,
        user: user,
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
