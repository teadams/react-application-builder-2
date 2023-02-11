import { useContext } from "react";
import AcsMetaContext from "../contextProviders/AcsMetaContext";
import {
  ACSMetaModel,
  ACSAppParams,
  ACSObjectTypes,
  ACSObjectType,
  ACSObjectFields,
  ACSField,
} from "../types";

export const useGetAcsMeta = (): ACSMetaModel | Record<string, never> => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext : {};
};

export const useGetAcsMetaAppParams = ():
  | ACSAppParams
  | Record<string, never> => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.appParams : {};
};

export const useGetAcsMetaObjectTypes = ():
  | ACSObjectTypes
  | Record<string, never> => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.objectTypes : {};
};

export const useGetAcsMetaObjectType = (
  objectType: string
): ACSObjectType | Record<string, never> => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.objectTypes[objectType] : {};
};

export const useGetAcsMetaFields = (
  objectType: string
): ACSObjectFields | Record<string, never> => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.objectTypes[objectType].fields : {};
};

export const useGetAcsMetaField = (
  objectType: string,
  field: string
): ACSField | Record<string, never> => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext
    ? acsMetaContext.objectTypes[objectType].fields[field]
    : {};
};

export default useGetAcsMeta;
