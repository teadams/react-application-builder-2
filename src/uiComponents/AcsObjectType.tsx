import React from "react";
import { useGetObjectTypeData } from "../hooks";

export const AcsObjectType = ({ objectType }: { objectType: string }) => {
  const { data } = useGetObjectTypeData(objectType);
  return <>{JSON.stringify(data)} </>;
};

export default AcsObjectType;
