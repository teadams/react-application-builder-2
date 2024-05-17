import {  useQueryClient, useMutation } from "react-query";
import { create } from "../lib/data";



export const useCreateRecord = (props:{invalidateQueryKeys?:string[]}) => {
  const {invalidateQueryKeys} = props ?? {};
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: create,
    onSuccess: (data, variables) => {
       const {  fields, objectType} = variables;
      queryClient.invalidateQueries({ queryKey: [objectType, "list"] });
      for (const queryKey of invalidateQueryKeys ?? []) {
        queryClient.invalidateQueries({ queryKey });
      }

    },
  });

  return mutation;
};

export default useCreateRecord;
