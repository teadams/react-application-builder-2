import React, {useState} from "react";
import { useQueryClient } from "react-query";
import {useGetAcsMetaFields, useCreateRecord, useUpdateRecord} from "./"
import { cp } from "fs";

export const useForm = ({
  objectType,
  fields,
  mode = "create",
  hiddenFields,
  defaultValues:propDefaultValues,
  path,
  onSuccuss:onSuccess,
  preSubmit,
  postSubmit,
  overrideSubmit,
  closeModal,
  data,
  invalidateQueryKeys

}: {
  objectType: string,
  fields: string[],
  hiddenFields?: Record<string, unknown>,
  defaultValues?: Record<string, unknown>,
  mode?:  "edit" | "create",
  onSuccess?: () => void, /// Should be onSuccess.. called after mutation
  preSubmit?: ({objectType, data}: 
    {objectType:string, data:Record<string,unknown>}) => any, // 
  overrideSubmit?: ({objectType, data, preSubmitResult}: 
    {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>}) => any, // 
  postSubmit?: ({objectType, data, preSubmitResult, submitResult}: 
     {objectType:string, data:Record<string,unknown>, 
      preSubmitResult:Record<string,unknown>,
      submitResult:Record<string,unknown>}) => any, // 
  closeModal?: () => void,
  data?: Record<string, unknown>
  invalidateQueryKeys?: string[]
}) => {
  //only create supported right now
  const acsMeta = useGetAcsMetaFields(objectType)
  const [touched, setTouched] = useState(false)
  const [values, setValues] = useState<{ [key: string]: any }>({}) // Add type annotation for values object
  const [defaultsLoaded, setDefaultsLoaded] = useState(false)
  const queryClient = useQueryClient();
 
  console.log("before create mutate")
  const { mutate: createMutate, isLoading: isCreateLoading } = useCreateRecord({invalidateQueryKeys})
console.log("after create mutate")
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateRecord({invalidateQueryKeys})
console.log("after update mutate")
  const isMutating =  isCreateLoading || isUpdateLoading
  if (mode === "create" && acsMeta && !defaultsLoaded) {
    const defaultValues: { [key: string]: any } = {} // Add type annotation for defaultValues object
     for (const field of fields) {
      if(acsMeta[field]?.defaultValue !== undefined) {
        defaultValues[field] = propDefaultValues?.[field]??acsMeta[field]?.defaultValue
      } 
    }
    
    setValues({...hiddenFields, ...defaultValues})
    setDefaultsLoaded(true)
  }

  if (mode === "edit" && !defaultsLoaded) {
    const defaultValues: { [key: string]: any } = {} // Add type annotation for defaultValues object
    for (const field of fields) {
      if (data?.[field] !== undefined) {
       defaultValues[field] = data?.[field]
      }
    }
    setValues({...hiddenFields, ...defaultValues})
    setDefaultsLoaded(true)
  }
 console.log("Default Values", values)
  const  handleSubmit = async (e: { preventDefault: () => void; }) => { 
      console.log("handleSubmit")
        e.preventDefault()
        if (!isMutating) {
          if (mode === "create") {
             createMutate({ objectType, fields:values, path, preSubmit, overrideSubmit, postSubmit});
          } else {
             updateMutate({ objectType, id:values?.id, fields:values, path, preSubmit, overrideSubmit, postSubmit});
          }
    		} 
        //THIS SHOULD BE ON SUCCESS
        if  (onSuccess) {
          onSuccess()
        } 
        if (closeModal) {
          closeModal()
        }
  }
  console.log("VVVALLUES", values)
  const handleChange = ( field:unknown, value:unknown) => {
    setValues({...values, [field as string]: value})

    if (!touched) setTouched(true)
  }
  return {touched, handleSubmit, handleChange, defaultsLoaded}
};

export default useForm
