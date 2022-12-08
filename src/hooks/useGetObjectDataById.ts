import { useQuery } from "react-query";
import { getObjectData } from "../lib/data";

// useGetObjectData
// Filters
// Write Routes
// Write Object COmponent
// Write ObjectType Component
// Path for an object Type?

export const useGetObjectDataById = (objectType: string, id: unknown) => {
  const queryResults = useQuery([objectType, { id }], getObjectData);
  return queryResults;
};

export default useGetObjectDataById;
