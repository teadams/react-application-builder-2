import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import axios from "axios";
import { ACSObjectType } from "../types";
import * as u from "./utils";

type APIMethod = "GET" | "POST" | "PUT" | "DELETE";
type ACSApiParam = "acsCount" | "acsMax" | unknown;
interface API {
  path?: string;
  params?: { [index in ACSApiParam]?: unknown };
  data?: { [index: string]: unknown };
  method?: APIMethod;
}

export async function callAPI({
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

  // TODO :  add env instuctions
  const domain = process.env.NEXT_PUBLIC_API_LOCATION;
  // Temp until dev environments are hooked together
  if (!domain) return null;

  // TODO: params
  // TODO: jwt token
  console.log("starting query");
  console.log("path is " + path);

  const apiResult = await axios({
    method: method,
    url: `${domain}/${path}`,
    data: data,
    params: params,
    //headers: auth_header,
  }).catch((error) => {
    const paramStr = JSON.stringify(params);
    const dataStr = JSON.stringify(data);
    const error_prompt = `error connecting to server with url: ${domain}/${path} method: ${method}
     params: ${paramStr} 
     data: ${dataStr}`;
    alert(error_prompt + error.message + " " + error.stack);
  });
  // TODO link in correct error handling
  if (apiResult) {
    if (apiResult.data.status === "validationError") {
      u.a("Validation Error", apiResult.data.validation_errors);
    }
    if (apiResult.data.status === "error") {
      if (apiResult.data.validation_errors) {
        u.a("Validation Error", apiResult.data.validation_errors);
      }
      // TODO handle this differently?
      if (apiResult.data.authorization_errors) {
        localStorage.removeItem("user");
        //** Authorization failed. Call the same API with no username */
        return callAPI({ path, params, data, method });
      }
      data = {};
    } else {
      if (apiResult.data.jwt_token) {
        //** New user session */
        localStorage.setItem("user", JSON.stringify(apiResult.data.jwt_token));
      }
      data = apiResult.data;
    }
  }
  return data;
}
