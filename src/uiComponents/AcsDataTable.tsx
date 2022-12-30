import moment from "moment";
import { toast } from "react-toastify";
import { ACSMetaModel } from "../types";
import { useGetAcsMeta } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteObjectDataById } from "../lib/data";
import AcsDataTableEditModal from "./AcsDataTableEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark , faPenToSquare} from '@fortawesome/free-solid-svg-icons'


type acsObjectInterface = {
  [key: string]: any;
};

const customStyles = {
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      background: "#fff",
      color: "#000",
    },
  },
  cells: {
    style: {
      padding: "10px",
      color: "#7A8994",
    },
  },
  pagination: {
    style: {
      background: "#fff",
      color: "#000",
    },
    pageButtonsStyle: {
      background: "#fff",
      margin: "0 2px",
      color: "#000",
      fill: "#000",
      height: "30px",
      width: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "6px",
      "&:hover:not(:disabled)": {
        backgroundColor: "#7A8994",
        color: "#000",
        fill: "#fff",
        border: "1px solid white !important",
      },
    },
  },
  table: {
    style: {
      minHeight: "70vh",
    },
  },
};

const AcsDataTable = ({ data, title , objectTypeFields,objectType }: any) => {
  const acsMeta = useGetAcsMeta();
  const [columns, setColumns] = useState<object[]>([]);
  const [allData , setAllData] = useState<object[]>(data);
  const [showEditModalForAField, setShowEditModalForAField] = useState<object>({});

  useEffect(() => {
    getCustomColumns(allData ,objectTypeFields);
  }, [allData]);

  const hideEditModal = useCallback(() => setShowEditModalForAField({}),[]);

  const deleteRow = async(id:string) =>{
     const result =  await deleteObjectDataById(acsMeta as ACSMetaModel, objectType as string, id);
     const filteredDataAfterDeletion = allData.filter((item:any) => item.id != id);
     setAllData(filteredDataAfterDeletion);
     toast.success("Record Successfully Deleted",{
       className:"text-sm"
     });
  }


  const columnCmp = (value:string, rowId:object, objectTypeFieldMeta:object,objectTypeFields:any) =>{
    let object = {
      value:value,
      objectTypeFieldMeta:objectTypeFieldMeta,
      objectTypeFields:{},
      editRow:false,
      rowId:rowId,
      allData:{}
    }
   
    return <p onClick={()=> setShowEditModalForAField(object)}>{value}</p>
  }

  // get custom (names/header cells) for data table
  const getCustomColumns = (data: Array<object>,objectTypeFields: Array<object>) => {
    const singleData:acsObjectInterface = data[0];
    if(objectTypeFields){
      const customColumns:Array<object> =  Object.keys(objectTypeFields).map((field) => {        
        const objectTypeFieldMeta:acsObjectInterface = objectTypeFields[field as unknown as number];
        const fieldPrettyName = objectTypeFieldMeta.prettyName;
        const columnObject = {
            name:fieldPrettyName,
            selector: (row:any) => {
              let fieldValue = objectTypeFieldMeta.dataType === "timestamp" ?  moment(row[field]).format('MM-DD-YYYY') : row[field];
              return columnCmp(fieldValue, row["id"], objectTypeFieldMeta,objectTypeFields)
            }
        }
        return columnObject;
      });

        const actionsColumn = {
          name:"Actions",
          width: "100px", 
          selector: (row:any) =>{
            let object = {
              value:"",
              objectTypeFieldMeta:{},
              objectTypeFields:objectTypeFields,
              editRow:true,
              rowId:row["id"],
              allData:data
            }

            return(
              <div className="flex items-center">
               <FontAwesomeIcon icon={faXmark} style={{color:"#eb0808"}} className="h-5" onClick={() => deleteRow(row.id) }/>
               <FontAwesomeIcon icon={faPenToSquare} style={{color:"#302b2bd4"}} className="h-4 mx-4" onClick={() => setShowEditModalForAField(object)} />
              </div>
            )
          }
        }

      customColumns.unshift(actionsColumn);
      setColumns(customColumns);
    }else{
      return []
    }
  };


  return (
    <div className="px-14">
      {title && (
        <h5 className="font-medium py-8 lg:-mt-2 lg:mb-2 lg:text-3xl mb-1 text-2xl text-gray-900 text-center">
          {title}
        </h5>
      )}
      <div className={`mb-10 ${data.length > 0 ? "border shadow-lg" : ""}`}>
        <DataTable
          columns={columns}
          data={allData}
          pagination
          customStyles={customStyles}
          noDataComponent={<h4 className="text-sm font-regular text-dark px-6 py-4 whitespace-nowrap text-center">There are no records to display</h4>}
        />
      </div>
      {
        Object.keys(showEditModalForAField).length > 0 
        &&
        <AcsDataTableEditModal hideEditModal={hideEditModal} data={showEditModalForAField} objectType={objectType} />
      }
    </div>
  );
};
export default AcsDataTable;
