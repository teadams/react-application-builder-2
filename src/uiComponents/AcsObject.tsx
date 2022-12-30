// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React  from "react";
import {
  useGetDataById,
  useGetAcsMetaObjectType,
} from "../hooks";
import moment from 'moment';

export const AcsObject = ({
  objectType,
  id,
}: {
  objectType: string;
  id: unknown;
}) => {
  const objectTypeMeta = useGetAcsMetaObjectType(objectType);
  let { data } = useGetDataById(objectType, id);
  if (!data || !objectTypeMeta || !objectType) {
    return null;
  }
  if (data.length > 1) {
    // TODO - MAKE A NICE ERROR MESSAGE
    alert(`Error - more than 1 row returned for ${objectType}-${id}`);
    return null;
  } else {
    data = data[0];
  }
  const objectTypeFields = objectTypeMeta.fields;


  return (
    <div className="px-14 py-8">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <h5 className="font-medium py-8 lg:-mt-2 lg:mb-2 lg:text-3xl mb-1 text-2xl text-gray-900 text-center">{`${objectTypeMeta?.prettyName}`}</h5>
            <div className={`overflow-hidden ${ data ? "border shadow-lg" : ""}`}>
              <table className="min-w-full"> 
                <tbody>
                  {
                  (data && objectTypeFields)
                  ?
                  Object.keys(objectTypeFields).map((field:any , index:number) => {
                    const objectTypeFieldMeta = objectTypeFields[field];
                    const fieldPrettyName = objectTypeFieldMeta.prettyName;
                    const fieldValue = data[field];
                    return (
                      <tr className="bg-white border-b" key={index}>
                        <td
                          className="text-dark px-6 py-4 whitespace-nowrap font-medium text-sm border"
                          style={{ width: "10%" }}
                        >
                          {fieldPrettyName}
                        </td>
                        <td
                          className="text-sm text-theme-gray font-light px-6 py-4 whitespace-nowrap"
                          style={{ width: "80%" }}
                        >
                          {objectTypeFieldMeta.dataType === "timestamp" ? moment(fieldValue).format('MM-DD-YYYY') : fieldValue}
                        </td>
                      </tr>
                    );
                  })
                  :
                  <h4 className="text-sm font-regular text-dark px-6 py-4 whitespace-nowrap text-center">There are no records to display</h4>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcsObject;
