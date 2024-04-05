import React, { useState } from "react";
import WorkList from "./WorkList";
import { TextareaAutosize } from "@mui/material";

interface workItem {
  id: string;
  name: string;
}

function WorkSpace() {
  const [listWork, setListWork] = useState<workItem[]>([]);
  const [textAreaValue,setTextAreaValue] = useState<string>("");
  const [isOpenTextArea,setIsOpenTextArea] = useState<boolean>(false);

  const addWorkHandle = () => {
    let obj = {
      id: "1",
      name: textAreaValue,
    };
    setListWork((preWork) => [...preWork, obj]);
    setTextAreaValue("");
    setIsOpenTextArea(false);
  };

  const removeWork=( id:string)=>{console.log("remove ",id);
  }

  return (
    <div className=" h-[calc(100%-48px)] w-full overflow-y-auto">

      <div className=" flex h-full w-fit ">
        {listWork.map((item, index) => {
          return <WorkList key={index} id={item.id} name={item.name} />;
        })}

        {!isOpenTextArea ?(
        <div
          onClick={()=>{setIsOpenTextArea(true)}}
          className="m-4 flex h-10 w-72 cursor-pointer items-center rounded-lg bg-[#d3d3d3] bg-opacity-25 pl-4 hover:bg-opacity-5"
        >
          <label htmlFor="" className="cursor-pointer font-bold text-[#ffffff]">
            + Thêm danh sách khác
          </label>
        </div>
        ) : (
        <div
          className="m-4 flex h-fit w-72 flex-col rounded-lg bg-[#0a0a0a] bg-opacity-90 p-2"
        >
          <div className="w-full h-fit p-1">
            <TextareaAutosize  value={textAreaValue} onChange={(e)=>{setTextAreaValue(e.target.value)}}  name="" className=" bg-[#2c54c279]  text-white resize-none w-full overflow-hidden min-h-7 " id="" cols={1} ></TextareaAutosize>
          </div>
          <div className="w-full h-12 flex  ">
            <button onClick={()=>{addWorkHandle()}} className="w-auto m-2 px-2 active:bg-[#b6c6d6] text-white  rounded-md bg-[#3e5da0] hover:bg-[#6c7e96]">Them danh sach</button>
            <button className="text-[#aaa] font-bold" onClick={()=>{setIsOpenTextArea(false)}}>X</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default WorkSpace;
