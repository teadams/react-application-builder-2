import React from "react";
import { useGetObjectDataById } from "../hooks";

export const AcsObject = ({
  objectType,
  id,
}: {
  objectType: string;
  id: unknown;
}) => {
  const { data } = useGetObjectDataById(objectType, id);
  return <>{JSON.stringify(data)} </>;
};

export default AcsObject;
