import { useQuery } from "react-query";
import { getObjectData } from "../lib/data";

// useGetObjectData
// Filters
// Write Routes
// Write Object COmponent
// Write ObjectType Component
// Path for an object Type?

export const useGetObjectData = (objectType: string) => {
  const queryResults = useQuery([objectType], getObjectData);
  return queryResults;
};

export default useGetObjectData;
