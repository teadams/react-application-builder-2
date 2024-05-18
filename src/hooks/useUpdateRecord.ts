import {  useQueryClient, useMutation } from "react-query";
import { updateById } from "../lib/data";



export const useUpdateRecord = () => {
  const mutation = useMutation({
    mutationFn: updateById,
  });
  return mutation;
};

export default useUpdateRecord;
