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
  if (typeof window !== "undefined") {
    const localTenant = localStorage?.getItem("tenant");
    if (localTenant) {
      return localTenant;
    }
  }
};

export const getStage = () => {
  if (typeof window !== "undefined") {
    const localStage = localStorage?.getItem("stage");
    return localStage;
  }
};

export const getServerDomainFromHostname = () => {
  const serverDomain = acsHooks.getServerDomain
    ? acsHooks.getServerDomain(getHostname())
    : "";
  console.log("serveri domain is " + serverDomain)
  const domainFragmentsToRemove = acsHooks.getDomainFragmentsToRemove
    ? acsHooks.getDomainFragmentsToRemove()
    : "";
  const hostname = getHostname();
  console.log("hostname is " + hostname)

  const localTenant = getTenant();
  console.log("local tenant is " + localTenant)
  if (
    localTenant?.includes("localhost") ||
    (!localTenant &&
      (hostname === "localhost" || hostname.includes("localhost")))
  ) {
    return "http://localhost:2000";
  }
  const hostnameSplit = hostname.split(".");
  let splicedHostname;
  if (hostnameSplit.includes("vercel")) {
    splicedHostname = ["vercel", "stage"];
  } else {
    if (domainFragmentsToRemove) {
      for (const fragment of domainFragmentsToRemove) {
        const index = hostnameSplit.indexOf(fragment);
        if (index > -1) {
          hostnameSplit.splice(index, 1);
        }
      }
    }
 //   const serverDomainLength = serverDomain?.split(".").length ?? 0;
 //   console.log("server domain length is " + serverDomainLength)

    splicedHostname = hostnameSplit.slice(
      0,
      hostnameSplit.length - 2
    );
    console.log("spliced hostname is " + splicedHostname)
    if (localTenant) {
      // using local storage not hostname
      splicedHostname[0] = localTenant;
      const stage = getStage();
      if (stage && !splicedHostname.includes("stage")) {
        splicedHostname.push("stage");
      } else {
        const index = splicedHostname.indexOf("stage");
        if (index > -1) {
          splicedHostname.splice(index, 1);
        }
      }
    }
 
  }

  const finalHostname = `https://${splicedHostname
    .concat(serverDomain)
    .join(".")}`;
  return finalHostname;
};

export async function callAPI({
  domain = "",
  path = "",
  params = {},
  data = {},
  method = "GET",
}: API): Promise<unknown> {

  if (!domain) domain = getDomain();

  const headers = getHeaders();

  try {
    data = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});

    params = Object.entries(params)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});

    console.log("CALLING API", "domain", domain, "path", path, "params", params, "data", data, "method", method, "headers", headers)
    const apiResult = await axios({
      method: method,
      url: `${domain}/${path}`,
      data: data,
      params: params,
      headers,
    });

    if (apiResult) {
      let data = apiResult.data;
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
        } else if (apiResult.data.create_account_errors) {
          toast.error("There was a problem creating your account: " + apiResult.data.message, {
            className: "text-sm",
          });
        } else {
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
