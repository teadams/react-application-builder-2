// ACS Enterprise Core
// Auth  Module
// Copyright © 2019-2023 ACSPropel and Tracy Adams. All rights reserved.

export interface objectTypeFieldMetaInterface {
  [key: string]: any;
}

export interface EditFormPropsInterface {
  register:any;
  data:dataObjectForEditInterface;
  onSubmit: (
    formData: any,
    rowId?: string | undefined,
    formState?: object,
  ) => Promise<void>;
  hideEditModal:() => void;
}

export interface dataObjectForEditInterface { 
  value?:string;
  objectTypeFieldMeta?:objectTypeFieldMetaInterface;
  objectTypeFields?:object;
  editRow?:boolean;
  rowId?:string;
  allData?:Array<object>;
}
  
  