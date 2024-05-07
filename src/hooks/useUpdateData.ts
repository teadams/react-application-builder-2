import {  useQueryClient, useMutation } from "react-query";
import {updateById } from "../lib/data";



export const useUpdateData = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateById,
    onSuccess: (data, variables) => {
      const { id, fields, objectType } = variables;
      queryClient.invalidateQueries({ queryKey: [objectType, "list"] });
      queryClient.invalidateQueries({ queryKey: [objectType, "one", id] });
      const fieldQueries = queryClient.getQueriesData([objectType, "one", "field"]);
      for (const query of fieldQueries) {
        const [queryKey, queryData] = query;
        if ((queryData as { id: string })?.id === id) {
          queryClient.invalidateQueries({queryKey});
        }
      }

    },
  });

  return mutation;
};

export default useUpdateData;
