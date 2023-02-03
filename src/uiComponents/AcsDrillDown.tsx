import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AcsObjectType from "./AcsObjectType";
import AcsAuthContext from "../contextProviders/AcsAuthContext";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const AcsDrillDown = () => {
  const router = useRouter();
  const [objectType, setObjectType] = useState("");
  const AcsAuthContextObject: any = useContext(AcsAuthContext);

  console.log("AcsAuthContextObject", AcsAuthContextObject.userInfo?.firstName);

  const logout = () => {
    AcsAuthContextObject.logout();
    router.push("/acs/auth/login");
  };

  return (
    <div>
      <section className="grid md:grid-cols-[12%,_1fr] grid-cols-1 h-[100vh]">
        <SideBar
          logout={logout}
          username={`${AcsAuthContextObject.userInfo?.firstName} ${AcsAuthContextObject.userInfo?.lastName}`}
        >
          <>
            {/* <div className="flex items-center">
              <FontAwesomeIcon
                icon={faHome}
                style={{ color: "#000" }}
                className="h-4 mx-4"
              /> */}
            <p
              className="text-dark m-0 p-0 mb-2"
              onClick={() => setObjectType("jobs")}
            >
              Jobs
            </p>
            {/* </div> */}
            <p
              className="text-dark m-0 p-0 mb-2"
              onClick={() => setObjectType("applications")}
            >
              Applications
            </p>
            <p
              className="text-dark m-0 p-0 mb-2"
              onClick={() => setObjectType("candidates")}
            >
              Candidates
            </p>
          </>
        </SideBar>
        {/* right */}
        <div className="flex w-full flex-col rounded h-full">
          {objectType !== "" && (
            <AcsObjectType objectType={objectType as string} />
          )}
        </div>
        {/* right */}
      </section>
    </div>
  );
};

export default AcsDrillDown;
