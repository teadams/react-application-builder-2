import {  useQueryClient, useMutation } from "react-query";
import {create } from "../lib/data";



export const useCreateData = (postSubmit:any) => {
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: create,
    onSuccess: (data, variables) => {
 
      const {  fields, objectType} = variables;
      postSubmit && postSubmit(data, objectType, fields)
      queryClient.invalidateQueries({ queryKey: [objectType, "list"] });

      // optimistially update
    },
  });

  return mutation;
};

export default useCreateData;
