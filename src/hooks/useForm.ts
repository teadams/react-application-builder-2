import React, {useState} from "react";
import {useGetAcsMetaFields, useCreateData} from "./"

export const useForm = ({
  objectType,
  fields,
  mode = "create"
}: {
  objectType: string,
  fields: string[],
  mode?:  "edit" | "create";
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
      defaultValues[field] = acsMeta[field]?.defaultValue ?? ""
 
      }
      setValues({...values, ...defaultValues})
      setDefaultsLoaded(true)
  }

  const handleSubmit = () => { 
    if (!isMutating) {
			mutate({ objectType, fields:values });
		} 
    alert (JSON.stringify(values))
  }

  const handleChange = ( field:unknown, value:unknown) => {
    setValues({...values, [field as string]: value})
  }
  console.log("values", values)
  return {touched, handleSubmit, handleChange}
};

export default useForm
