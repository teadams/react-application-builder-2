import React, {useState} from "react";
import { useQueryClient } from "react-query";
import {useGetAcsMetaFields, useCreateData} from "./"

export const useForm = ({
  objectType,
  fields,
  mode = "create",
  hiddenFields,
  defaultValues:propDefaultValues,
  onSubmit:onSuccess,
  preSubmit,
  postSubmit,
  overrideSubmit,
  closeModal,
  data,

}: {
  objectType: string,
  fields: string[],
  hiddenFields?: Record<string, unknown>,
  defaultValues?: Record<string, unknown>,
  mode?:  "edit" | "create",
  onSubmit?: () => void, /// Should be onSuccess.. called after mutation
  preSubmit?: (objectType:string, fields:Record<string,unknown>) => void, // 
  postSubmit?: (data:Record<string,unknown>, objectType:string, fields:Record<string,unknown>) => void, // run in "useCreateData", which should be usePerist Data
  closeModal?: () => void,
  overrideSubmit?: (objectType:string, fields:Record<string,unknown>) => void,
  data?: Record<string, unknown>
}) => {
  //only create supported right now
  const acsMeta = useGetAcsMetaFields(objectType)
  const [touched, setTouched] = useState(false)
  const [values, setValues] = useState<{ [key: string]: any }>({}) // Add type annotation for values object
  const [defaultsLoaded, setDefaultsLoaded] = useState(false)
  const queryClient = useQueryClient();
  const { mutate, isLoading: isMutating } = useCreateData(postSubmit);
  
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
    e.preventDefault()
    if (!isMutating) {
      if (preSubmit) {
         await preSubmit(objectType, values)
       }
       if (overrideSubmit) {
         await overrideSubmit(objectType, values)
         // These usualy run in the mutate function
         // Doing a broad stroke and invalidating everything
         // for that object type to keep it simple
         queryClient.invalidateQueries({ queryKey: [objectType] });
    
       } else {
         mutate({ objectType, fields:values });
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
