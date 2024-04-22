import React, { useRef, useState } from "react";
import WorkList from "./WorkList";
import { TextareaAutosize } from "@mui/material";
import { useOutsideClick } from "./testRef";
import { useOutsideAlerter } from "./test2";


interface workSpaceTemplate {
  idSpace:number,
  nameSpace:string
}


interface workListTemplate {
  id: string;
  name: string;
  spaceId:number
}


const EX = [
  {
    id:"1",
    name:"cần làm",
    spaceId:1
  },
  {
    id:"2",
    name:"đang làm",
    spaceId:1
  },
  {
    id:"3",
    name:"đã làm",
    spaceId:1
  }
]

function WorkSpace({idSpace,nameSpace}:workSpaceTemplate) {
  console.log(idSpace + " ",nameSpace);
  
  const [listWork, setListWork] = useState<workListTemplate[]>(EX);
  const [textAreaValue,setTextAreaValue] = useState<string>("");
  const [isOpenTextArea,setIsOpenTextArea] = useState<boolean>(false);
  
  const ref = useOutsideClick(() => {
    setIsOpenTextArea(false)
  });


  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);



  const addWorkHandle = () => {
    let obj = {
      id: "1",
      name: textAreaValue,
      spaceId:1
    };
    setListWork((preWork) => [...preWork, obj]);
    setTextAreaValue("");
    setIsOpenTextArea(false);
  };

  const removeWork=( id:string)=>{console.log("remove ",id);
  }

  return (
    <div className=" h-[calc(100%-48px)] w-full overflow-y-auto "  >

      <div className=" flex h-full w-fit " ref={ref}>
        {listWork.map((item, index) => {
          return item.spaceId == idSpace ?  <WorkList key={index} id={item.id} name={item.name} /> : null
        })}
 
        {!isOpenTextArea ?(
        <div 
          onClick={()=>{setIsOpenTextArea(true)}}
          className="m-4 flex h-10 w-64 cursor-pointer items-center rounded-lg bg-[white] bg-opacity-55 pl-4 hover:bg-opacity-5"
        >
          <label htmlFor="" className="cursor-pointer font-bold text-[#ffffff]">
            + Thêm danh sách khác
          </label>
        </div>
        ) : (
        <div
          className="m-4 flex h-fit w-72 flex-col rounded-lg bg-[#f4f2f2] bg-opacity-90 p-2"
        >
          <div className="w-full h-fit p-1">
            <TextareaAutosize  value={textAreaValue} onChange={(e)=>{setTextAreaValue(e.target.value)}}  name="" className="resize-none w-full overflow-hidden min-h-7 " id="" cols={1} ></TextareaAutosize>
          </div>
          <div className="w-full h-12 flex  ">
            <button onClick={()=>{addWorkHandle()}} className="w-auto m-2 px-2 active:bg-[#b6c6d6] text-[#333] font-medium rounded-md hover:bg-[#ffffff]">Thêm danh sách</button>
            {/* <button className="text-[#aaa] font-bold" onClick={()=>{setIsOpenTextArea(false)}}>X</button> */}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default WorkSpace;
