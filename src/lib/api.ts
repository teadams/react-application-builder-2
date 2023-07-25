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
// const getHeaders = () => {
//   const user = localStorage.getItem("user");
//   let authHeader = {};
//   if (user !== "undefined") {
//     const jwtToken = JSON.parse(user as string);
//     authHeader = { "x-access-token": jwtToken };
//   }
//   return authHeader;
// };

export const getDomain = () => {
  console.log("get domain");
  console.log("env is " + process.env.NEXT_PUBLIC_API_LOCATION);
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
export const getServerDomainFromHostname = () => {
  console.log("get server domain from hosting");
  const serverDomain = acsHooks.getServerDomain
    ? acsHooks.getServerDomain()
    : "";
  const domainFragmentToRemove = acsHooks.getDomainFragmentToRemove
    ? acsHooks.getDomainFragmentToRemove()
    : "";
  // console.log("SEVER DOMAIN IS " + serverDomain);
  console.log(
    "PRoess env next_public Domain " + process.env.NEXT_PUBLIC_DOMAIN
  );
  // console.log("window location " + window.location.hostname);
  const hostname = getHostname();
  if (hostname === "localhost") {
    return "http://localhost:2000";
  }
  const hostnameSplit = hostname.split(".");
  if (domainFragmentToRemove) {
    const index = hostnameSplit.indexOf(domainFragmentToRemove);
    if (index > -1) {
      hostnameSplit.splice(index, 1);
    }
  }
  const serverDomainLength = serverDomain?.split(".").length ?? 0;
  const splicedHostname = hostnameSplit.slice(
    0,
    hostnameSplit.length - serverDomainLength
  );
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
  console.log("calling api " + path);
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
  console.log("DOMAIn IS " + domain);
  console.log("PATH IS " + path);
  // Temp until dev environments are hooked together
  if (!domain) domain = getDomain();
  // TODO: params
  console.log("getting from ");
  console.log(`${domain}/${path}`);
  const apiResult = await axios({
    method: method,
    url: `${domain}/${path}`,
    data: data,
    params: params,
  }).catch((error) => {
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
      data = apiResult.data;
    }
  }
  return data;
}
