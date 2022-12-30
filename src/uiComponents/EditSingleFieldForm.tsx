import React from 'react'
import { TextBox } from './formFields'

interface EditSingleFieldFormProps {
  register:object;
  data:object
}


const EditSingleFieldForm = ({ register, data}:EditSingleFieldFormProps) => { 
  const {prettyName , dataType} = data?.objectTypeFieldMeta;
  return (
    <TextBox 
      type={dataType}
      label={prettyName} 
      value={data?.value} 
      register={register}
    />
  )
}

export default EditSingleFieldForm