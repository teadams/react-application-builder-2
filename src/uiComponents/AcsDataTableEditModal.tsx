import React from 'react';
import { toast } from 'react-toastify';
import { ACSMetaModel } from '../types';
import EditRowForm from './EditRowForm';
import { useGetAcsMeta } from '../hooks';
import { useForm } from 'react-hook-form';
import { updateObjectDataById } from '../lib/data';
import EditSingleFieldForm from './EditSingleFieldForm';

type objectTypeFieldMetaInterface = {
  [key: string]: any;
};

interface dataProp {
  value?:string,
  objectTypeFieldMeta?:objectTypeFieldMetaInterface,
  objectTypeFields?:object,
  editRow?:boolean,
  rowId?:string,
  allData?:object
}

interface modalProps {
	data: dataProp;
	hideEditModal:Function;
  objectType:string
}

const AcsDataTableEditModal = (
{
  data,
  hideEditModal,
  objectType
}:modalProps
) => {  
  
  const acsMeta = useGetAcsMeta();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(formData:any) =>{
    const response = await updateObjectDataById(
      acsMeta as ACSMetaModel,
      objectType as string,
      data?.rowId,
      {...formData}
    );    
    toast.success("Record Successfully Updated",{
      className:"text-sm"
    });

    hideEditModal();
  };  

  const standardProps = {
    data:data,
    register: data?.editRow === true ? register : {...register(data?.objectTypeFieldMeta?.name)},
  };
  
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
       <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ${data?.editRow === true ? "w-9/12" : "w-2/5"}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Edit</h3>
                    <div className="mt-6">
                      {
                        data?.editRow === true
                        ?
                        <EditRowForm {...standardProps} />
                        :
                        <EditSingleFieldForm {...standardProps} />
                      }
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" onClick={handleSubmit(onSubmit)} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                <button type="button" onClick={() => hideEditModal()} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                </div>
            </div>
          </form>
       </div>
       </div>
      </div>
    </div>
  )
}

export default AcsDataTableEditModal;