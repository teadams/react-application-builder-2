import React from 'react'
import { RadioButton, TextBox } from './formFields'
import { EditFormPropsInterface,objectTypeFieldMetaInterface } from '../types/ACSobjectTypesForUI';

const EditRowForm = ({register, data}:EditFormPropsInterface) => {
   const formField = (field:string, index:number) =>{
     const objectTypeFields:objectTypeFieldMetaInterface = data.objectTypeFields ? data.objectTypeFields : [];
     const objectTypeFieldMeta:objectTypeFieldMetaInterface =  objectTypeFields[field as unknown as number]
     const dataType = objectTypeFieldMeta.dataType;
     const label = objectTypeFieldMeta.prettyName;
     const currentRow:any = data.allData?.find((item:any) => item.id === data.rowId)
     const value = dataType === "timestamp" ? new Date(currentRow[field]).toISOString().substring(0, 10) : currentRow[field];

     const standardProps = {
        register:{...register(objectTypeFieldMeta.name)},
        label:label,
        value:value
     }
     
     switch (dataType) {
      case "string":
        return <TextBox key={index} {...standardProps}  />
      case "timestamp":
        return <TextBox key={index} type='date' {...standardProps} />
      case "boolean":
        return <RadioButton key={index} {...standardProps}  />
      default:
        return null
     }
   }
    
  return (
      <div className='grid grid-cols-3 gap-x-10'>
      {
        data.objectTypeFields
        ?
        Object.keys(data.objectTypeFields).map((field:string , index:number) =>{
          return formField(field, index)
        })
        :
        null
      }
      </div>
  )
}

export default EditRowForm