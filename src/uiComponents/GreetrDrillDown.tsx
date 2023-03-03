import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import AcsObjectType from "./AcsObjectType";
import AcsAuthContext from "../contextProviders/AcsAuthContext";
import SideBar from "./SideBar";
import Icon from "./Icon";

const GreetrDrillDown = () => {
  const router = useRouter();
  const [objectType, setObjectType] = useState("");
  const AcsAuthContextObject: any = useContext(AcsAuthContext);

  const logout = () => {
    router.push("/acs/auth/login");
    AcsAuthContextObject.logout();
  };

  return (
    <div>
      <section className="grid lg:grid-cols-[14%,_1fr] md:grid-cols-[20%,_1fr] sm:grid-cols-[30%,_1fr] grid-cols-1 md:h-[100vh]">
        <SideBar
          logout={logout}
          username={`${AcsAuthContextObject.userInfo?.firstName} ${AcsAuthContextObject.userInfo?.lastName}`}
          title="Greetr"
        >
          <>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all "
                onClick={() => setObjectType("jobs")}
              >
                Jobs
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("applications")}
              >
                Applications
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("candidates")}
              >
                Candidates
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("greetrStages")}
              >
                Greetr Stages
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("offices")}
              >
                offices
              </p>
            </div>

            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("greetrInterviews")}
              >
                Greetr Interviews
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("greetrAssessments")}
              >
                Greetr Assessments
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("acsUsers")}
              >
                Users
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("acsMessages")}
              >
                Messages
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("recruiterApplicationMap")}
              >
                recruiterApplicationMap
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("interviewerInterviewMap")}
              >
                interviewerInterviewMap
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("greetrContent")}
              >
                greetrContent
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("greetrContentMappings")}
              >
                greetrContentMappings
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("surveyStageMap")}
              >
                surveyStageMap
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("acsSurveys")}
              >
                acsSurveys
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("acsSurveyQuestions")}
              >
                acsSurveyQuestions
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all"
                onClick={() => setObjectType("acsSurveyResponses")}
              >
                acsSurveyResponses
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon="home" className="h-4 mr-2" />
              <p
                className="text-dark m-0 p-0 break-words break-all "
                onClick={() => setObjectType("acsTenantSetup")}
              >
                acsTenantSetup
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

export default GreetrDrillDown;
