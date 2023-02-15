import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import AcsObjectType from "./AcsObjectType";
import AcsAuthContext from "../contextProviders/AcsAuthContext";
import SideBar from "./SideBar";
import Icon from "./Icon";

const AcsDrillDown = () => {
  const router = useRouter();
  const [objectType, setObjectType] = useState("");
  const AcsAuthContextObject: any = useContext(AcsAuthContext);

  const logout = () => {
    router.push("/acs/auth/login");
    AcsAuthContextObject.logout();
  };

  return (
    <div>
      <section className="grid lg:grid-cols-[12%,_1fr] md:grid-cols-[20%,_1fr] sm:grid-cols-[30%,_1fr] grid-cols-1 md:h-[100vh]">
        <SideBar
          logout={logout}
          username={`${AcsAuthContextObject.userInfo?.firstName} ${AcsAuthContextObject.userInfo?.lastName}`}
        >
          <>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("jobs")}
              >
                Jobs
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("applications")}
              >
                Applications
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("candidates")}
              >
                Candidates
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("jobStages")}
              >
                Job Stages
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("offices")}
              >
                offices
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("offers")}
              >
                Offers
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("interviews")}
              >
                Interviews
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("greetrAssessments")}
              >
                Assessment
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("acsUsers")}
              >
                Users
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0"
                onClick={() => setObjectType("departments")}
              >
                Departments
              </p>
            </div>
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
