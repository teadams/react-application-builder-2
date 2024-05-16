import React, {useState} from "react";
import {useGetAcsMetaFields, useCreateData} from "./"

export const useForm = ({
  objectType,
  fields,
  mode = "create",
  hiddenFields,
  defaultValues:propDefaultValues,
  onSubmit,
  closeModal,
  data
}: {
  objectType: string,
  fields: string[],
  hiddenFields?: Record<string, unknown>,
  defaultValues?: Record<string, unknown>,
  mode?:  "edit" | "create",
  onSubmit?: () => void,
  closeModal?: () => void,
  data?: Record<string, unknown>
}) => {
  //only create supported right now
  const acsMeta = useGetAcsMetaFields(objectType)
  const [touched, setTouched] = useState(false)
  const [values, setValues] = useState<{ [key: string]: any }>({}) // Add type annotation for values object
  const [defaultsLoaded, setDefaultsLoaded] = useState(false)
  const { mutate, isLoading: isMutating } = useCreateData();
  
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
  const  handleSubmit = (e: { preventDefault: () => void; }) => { 
    e.preventDefault()
    if (!isMutating) {
      console.log("SUBMITTING THE MUTATION", values)
			mutate({ objectType, fields:values });
		} 
    if  (onSubmit) {
      onSubmit()
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
