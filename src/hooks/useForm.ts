import React, {useState} from "react";
import {useGetAcsMetaFields} from "./"

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
 
  if (mode === "create" && acsMeta && !defaultsLoaded) {
    const defaultValues: { [key: string]: any } = {} // Add type annotation for defaultValues object
     for (const field of fields) {
      defaultValues[field] = acsMeta[field]?.defaultValue ?? ""
 
      }
      setValues({...values, ...defaultValues})
      setDefaultsLoaded(true)
  }

  console.log(values)
  const handleSubmit = () => {  
    alert (JSON.stringify(values))
  }

  const handleChange = ( field:unknown, value:unknown) => {
    setValues({...values, [field as string]: value})
  }
  console.log("values", values)
  return {touched, handleSubmit, handleChange}
};

export default useForm
