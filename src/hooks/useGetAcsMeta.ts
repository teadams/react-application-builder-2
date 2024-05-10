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

export const useGetAcsMeta = (): ACSMetaModel | undefined => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext : undefined;
};

export const useGetAcsMetaAppParams = ():
  | ACSAppParams
  | undefined => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.appParams : undefined;
};

export const useGetAcsMetaObjectTypes = ():
  | ACSObjectTypes
  | undefined => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.objectTypes :undefined;
};

export const useGetAcsMetaObjectType = (
  objectType: string
): ACSObjectType | undefined => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.objectTypes[objectType] : undefined;
};

export const useGetAcsMetaFields = (
  objectType: string
): ACSObjectFields | undefined => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext ? acsMetaContext.objectTypes[objectType].fields : undefined;
};

export const useGetAcsMetaField = (
  objectType: string,
  field: string
): ACSField | undefined => {
  const acsMetaContext = useContext(AcsMetaContext);
  return acsMetaContext
    ? acsMetaContext.objectTypes[objectType].fields[field]
    : undefined;
};

export default useGetAcsMeta;
