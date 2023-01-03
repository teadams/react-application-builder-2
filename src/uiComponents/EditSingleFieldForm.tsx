import React from 'react'
import { TextBox } from './formFields'
import { EditFormPropsInterface } from '../types/ACSobjectTypesForUI';

const EditSingleFieldForm = ({ register, data}:EditFormPropsInterface) => { 
  return (
    <TextBox 
      type={data.objectTypeFieldMeta?.dataType}
      label={data.objectTypeFieldMeta?.prettyName} 
      value={data?.value} 
      register={register}
    />
  )
}

export default EditSingleFieldForm