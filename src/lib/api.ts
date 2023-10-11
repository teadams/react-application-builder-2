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
    headers.authHeader = { "x-access-token": jwtToken };
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
  console.log("hostname is " + hostname)
  console.log("local tenant is " + localTenant)
  if (localTenant?.includes("localhost") || (!localTenant  && (hostname === "localhost" || hostname.includes("localhost")))) {
    console.log("localhost")
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
      console.log("replacing tenant")
      splicedHostname[0] = localTenant
    }
  }
    console.log("final hostname is " + splicedHostname)
    const finalHostname = `https://${splicedHostname.concat(serverDomain).join(".")}`;
    console.log(finalHostname)
    return finalHostname;
};
export async function callAPI({
  domain = "",
  path = "",
  params = {},
  data = {},
  method = "GET",
}: API): Promise<unknown> {
  // if (data_object) {
  //   Generically handles file uploads,which requires special handling */
  //   let multi_object = new FormData();
  //   let acs_type_protected_fields = {};
  //   Object.keys(data_object).forEach((key) => {
  //     if (
  //       typeof data_object[key] === "file" ||
  //       data_object[key] instanceof Blob ||
  //       typeof data_object[key] === "string"
  //     ) {
  //       multi_object.append(key, data_object[key]);
  //     } else {
  //       acs_type_protected_fields[key] = data_object[key];
  //     }
  //   });
  //   if (acs_type_protected_fields) {
  //     // FormData always sends strings. So to protect booleans, numbers, etc.
  //     // we will stringify the non-file attributes and parse server side.
  //     multi_object.append(
  //       "acs_type_protected_fields",
  //       JSON.stringify(acs_type_protected_fields)
  //     );
  //   }
  //   data_object = multi_object;
  // }
  // const jwt_token = JSON.parse(localStorage.getItem("user"));
  // let auth_header;
  // if (jwt_token) {
  //   auth_header = { "x-access-token": jwt_token };
  // }
  // const domain = getDomain();
  // Temp until dev environments are hooked together
  if (!domain) domain = getDomain();
  
  console.log("Domain is " + domain)
  console.log(`url is ${domain}/${path}`)
  console.log(data)
  console.log(params)
  const headers = getHeaders()
  const apiResult = await axios({
    method: method,
    url: `${domain}/${path}`,
    data: data,
    params: params,
    headers,
  }).catch((error) => {
    console.log("ERROR in calling api");
    const paramStr = JSON.stringify(params);
    const dataStr = JSON.stringify(data);
    const error_prompt = `error connecting to server with url: ${domain}/${path} method: ${method}
     params: ${paramStr}
     data: ${dataStr}`;
    // alert(error_prompt + error.message + " " + error.stack);
    console.log("error", error);
    toast.error(error.message?.toString(), {
      className: "text-sm",
    });
    return { status: error };
  });
  // TODO user friendly correct error handling
  if (apiResult) {
    if (apiResult.data.status === "validationError") {
      //u.a("Validation Error", apiResult.data.validation_errors);
    }
    if (apiResult.data.status === "error") {
      if (apiResult.data.validation_errors) {
        //u.a("Validation Error", apiResult.data.validation_errors);
      }
      // The login is incorrect
      // Log the user out and retry without login
      if (apiResult.data.authorization_errors) {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("user");
        }
        //** Authorization failed. Call the same API with no username */
        return callAPI({ path, params, data, method });
      }
      data = {};
    } else {
      console.log(apiResult.data)

      data = apiResult.data;
    }
  }
  return data;
}
