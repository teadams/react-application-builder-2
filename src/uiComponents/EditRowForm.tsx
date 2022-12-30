import React from 'react'
import { RadioButton, TextBox } from './formFields'

interface EditRowFormProps {
	register:any;  
  data:object
}

type acsObjectInterface = {
  [key: string]: any;
};

const EditRowForm = ({register, data}:EditRowFormProps) => {
   const formField = (field:string, index:number) =>{
    console.log("data.allData",data);
    
     const objectTypeFieldMeta:acsObjectInterface = data.objectTypeFields[field as unknown as number];
     const dataType = objectTypeFieldMeta.dataType;
     const label = objectTypeFieldMeta.prettyName;
     let currentRow = data.allData.find((item:any) => item.id === data.rowId)
     let value = dataType === "timestamp" ? new Date(currentRow[field]).toISOString().substring(0, 10) : currentRow[field];

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
        Object.keys(data.objectTypeFields).map((field:string , index:number) =>{
          return formField(field, index)
        })
      }
      </div>
  )
}

export default EditRowForm