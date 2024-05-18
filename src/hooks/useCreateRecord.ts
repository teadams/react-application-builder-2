import {  useQueryClient, useMutation } from "react-query";
import { create } from "../lib/data";



export const useCreateRecord = () => {
  
  const mutation = useMutation({
    mutationFn: create
  });

  return mutation;
};

export default useCreateRecord;
