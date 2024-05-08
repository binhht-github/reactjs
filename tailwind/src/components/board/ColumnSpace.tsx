import React, { useEffect, useState } from "react";
import CardSpace from "./CardSpace";
import { TextareaAutosize } from "@mui/material";
import { useOutsideClick } from "./testRef";
import { createNewColumn, getColumnByProjectId } from "../../api/ColumnApi.";


interface workSpaceTemplate {
  idSpace: number,
  nameSpace: string
}


interface IColumnItem {
  id: number;
  projectName: string;
  columnName: string;
  cardEntities: [];
  createDate: string;
  createUser: string;
}

function ColumnSpace({ idSpace, nameSpace }: workSpaceTemplate) {
  const cc = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(cc + "")

  console.log("idSpace ", idSpace);


  const [listColumns, setListColumns] = useState<IColumnItem[]>([]);
  const [curentColumn, setCurrentColumn] = useState<string>("");
  const [isOpenTextArea, setIsOpenTextArea] = useState<boolean>(false);

  const ref = useOutsideClick(() => {
    setIsOpenTextArea(false)
  });



  useEffect(() => {
    getColumnByProjectId(idSpace)
      .then((res) => {
        // console.log(res);

        setListColumns(res);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [idSpace])

  const addWorkHandle = () => {
    let newColumn = {
      projectEntity: {
        projectId: 1
      },
      columnName: curentColumn,
      cardEntities: [],
      createUser: currentUser.nhanVien.maNhanVien
    };
    createNewColumn({ projectId: 1 }, curentColumn, currentUser.nhanVien.maNhanVien)
      .then((res) => {
        console.log(res);
        setListColumns((preWork) => [...preWork, res]);
      })
      .catch((e) => {
        console.log(e);
      });
    // setListColumns((preWork) => [...preWork, newColumn]);
    setCurrentColumn("");
    setIsOpenTextArea(false);
  };

  const removeWork = (id: string) => {
    console.log("remove ", id);
  }

  return (
    <div className=" h-[calc(100%-48px)] w-full overflow-y-auto " >

      <div className=" flex h-full w-fit "  >
        {listColumns.length > 0 ? listColumns.map((item, index) => {
          return true ? <CardSpace key={index} id={item.id} name={item.columnName} cards={item.cardEntities} /> : null
        }) : null}

        {!isOpenTextArea ? (
          <div
            onClick={() => { setIsOpenTextArea(true) }}
            className="m-4 flex h-10 w-64 cursor-pointer items-center rounded-lg bg-[white] bg-opacity-55 pl-4 hover:bg-opacity-5"
            ref={ref}
          >
            <label htmlFor="" className="cursor-pointer font-bold text-[#ffffff]">
              + Thêm danh sách khác
            </label>
          </div>
        ) : (
          <div
            className="m-4 flex h-fit w-72 flex-col rounded-lg bg-[#f4f2f2] bg-opacity-90 p-2"
            ref={ref}
          >
            <div className="w-full h-fit p-1">
              <TextareaAutosize value={curentColumn} onChange={(e) => { setCurrentColumn(e.target.value) }} name="" className="resize-none w-full overflow-hidden min-h-7 " id="" cols={1} ></TextareaAutosize>
            </div>
            <div className="w-full h-12 flex  ">
              <button onClick={() => { addWorkHandle() }} className="w-auto m-2 px-2 active:bg-[#b6c6d6] text-[#333] font-medium rounded-md hover:bg-[#ffffff]">Thêm danh sách</button>
              {/* <button className="text-[#aaa] font-bold" onClick={()=>{setIsOpenTextArea(false)}}>X</button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnSpace;
