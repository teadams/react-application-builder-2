import {  useQueryClient, useMutation } from "react-query";
import {updateById } from "../lib/data";

export const useUpdateData = ({ REMOVE
  objectType,
  id,
  fields,
  onSuccess = () => {},
}: {
  objectType: string;
  id: string;
  fields: Record<string, unknown>;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateById,
    onSuccess: (data, variables) => {
      const {id, fields, objectType} = variables;
      queryClient.setQueryData(objectType, (oldData: any={}) => {return {...oldData, ...fields}});
      queryClient.invalidateQueries({ queryKey: [objectType] });
      queryClient.invalidateQueries({ queryKey: [objectType, id] });
    },
  });

  return useMutation;
};

export default useUpdateData;
