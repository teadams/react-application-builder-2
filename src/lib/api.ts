// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import axios from "axios";
import { toast } from "react-toastify";
import { acsHooks } from "../../../lib/acsHooks";
import { hostname } from "os";
type APIMethod = "GET" | "POST" | "PUT" | "DELETE";
type ACSApiParam = "acsCount" | "acsMax" | unknown;

interface API {
  domain?: string;
  path?: string;
  params?: { [index: string]: unknown };
  data?: { [index: string]: unknown };
  method?: APIMethod;
}
const getHeaders = () => {
  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Origin": "*",
  };
  const user = localStorage.getItem("user");
  if (user !== "undefined") {

    const jwtToken = JSON.parse(user as string);  
    headers["x-access-token"] = jwtToken;
  }
  
  return headers;
};

export const getDomain = () => {
  console.log("in get domain")
  console.log("process " + process.env.NEXT_PUBLIC_API_LOCATION )
  return process.env.NEXT_PUBLIC_API_LOCATION
    ? process.env.NEXT_PUBLIC_API_LOCATION
    : getServerDomainFromHostname();
};
export const getHostname = () => {
  return process.env.NEXT_PUBLIC_DOMAIN
    ? process.env.NEXT_PUBLIC_DOMAIN
    : typeof window !== "undefined"
    ? window.location.hostname
    : "localhost";
};

export const getTenant = () => {
  const localTenant = localStorage?.getItem("tenant")
  console.log("window defined")
  console.log(typeof window !== "undefined")
  if (typeof window !== "undefined" && localTenant) {
    console.log("In api local tenant is " + localTenant)
    return localTenant
  } 
};


export const getStage = () => {
  const localStage = localStorage?.getItem("stage")
  console.log("window defined")
  console.log(typeof window !== "undefined")
  if (typeof window !== "undefined" && localStage) {
    console.log("In api local stage is " +localStage)
    return localStage
  } 
};


export const getServerDomainFromHostname = () => {
  console.log("getting server domain from hostname")
  const serverDomain = acsHooks.getServerDomain
    ? acsHooks.getServerDomain()
    : "";

  const domainFragmentsToRemove = acsHooks.getDomainFragmentsToRemove
    ? acsHooks.getDomainFragmentsToRemove()
    : "";
  const hostname = getHostname();
  const localTenant = getTenant()
  if (localTenant?.includes("localhost") || (!localTenant  && (hostname === "localhost" || hostname.includes("localhost")))) {
    return "http://localhost:2000";
  }
  const hostnameSplit = hostname.split(".");
  let splicedHostname
  if (hostnameSplit.includes("vercel")) {
    console.log("vercel")
    splicedHostname = ["vercel","stage"]
  } else {
  
    if (domainFragmentsToRemove) {
      for (const fragment of domainFragmentsToRemove) {
        const index = hostnameSplit.indexOf(fragment);
        if (index > -1) {
          hostnameSplit.splice(index, 1);
        }
      }
    }
    const serverDomainLength = serverDomain?.split(".").length ?? 0;
    
    splicedHostname = hostnameSplit.slice(
      0,
      hostnameSplit.length - serverDomainLength
    );
    if (localTenant) {
      splicedHostname[0] = localTenant
    }
    const stage = getStage()
    if (stage && !splicedHostname.includes("stage"))  {
      splicedHostname.push("stage")
    }
  }
  
    const finalHostname = `https://${splicedHostname.concat(serverDomain).join(".")}`;
    return finalHostname;
};

export async function callAPI({
  domain = "",
  path = "",
  params = {},
  data = {},
  method = "GET",
}: API): Promise<unknown> {
  console.log("call api")
 

  if (!domain) domain = getDomain();

  const headers = getHeaders()
  try {
    const apiResult = await axios({
      method: method,
      url: `${domain}/${path}`,
      data: data,
      params: params,
      headers,
    })

    if (apiResult) {
      let data = apiResult.data
      if (apiResult.data.status === "error") {
        // The login is incorrect
        // Log the user out and retry without login
        if (apiResult.data.authorization_errors) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            localStorage.removeItem("userInfo");
            //** Authorization failed. Call the same API with no username */
            return callAPI({ path, params, data, method });
          }
        } else if (apiResult.status !== 200) {
   
            toast.error(apiResult.data.message, {
              className: "text-sm",
            });
    
        }
        data = {};
      }  
        return data;
    
    }
  } catch (error) { 
    toast.error(error.message, {
      className: "text-sm",
    });
  }
}
