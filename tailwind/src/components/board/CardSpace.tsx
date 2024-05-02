import React, { useEffect, useState } from "react";
import TaskSpace from "./TaskSpace";
import { TextareaAutosize } from "@mui/material";
import {  createNewCard, getCardByColumnId } from "../../api/CardApi";

interface workListProp {
  id: number;
  name: string;
  cards:[]
}

interface workCardItem{
  id:number;
  cardName:string;
  taskEnntities:[];
}

function CardSpace({id,name,cards}:workListProp) {
  const cc = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(cc + "")

  const [listCard, setListCard] = useState<workCardItem[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [currentCard,setCurrentCard] = useState<string>("");
  const [isOpenTextArea,setIsOpenTextArea] = useState<boolean>(false);

  useEffect(()=>{
    console.log("aaaaaa");
    
    getCardByColumnId(id).then((res)=>{
      setListCard(res);
    });
  },[id])
  
  const addCardHandle = () => {
    createNewCard({columnId:id},currentCard,currentUser.nhanVien.maNhanVien).then((res)=>{
      setListCard((preCard) => [...preCard, res]);
    })
    setCurrentCard("")
    setIsOpenTextArea(false)
  };

  return (
    <div className="ml-3 mt-4 h-fit  w-64  rounded-xl bg-[#f4f2f2]  p-4">
      <div className="relative mb-2 flex h-8  w-full items-center justify-between">
        <h2 className="text-[#333] w-[calc(100%-50px)] font-medium">{name}</h2>
        <>
          <button
            className="rounded px-6 py-3 text-sm font-bold uppercase  shadow outline-none transition-all duration-150 ease-linear hover:bg-[#333] hover:shadow-lg focus:outline-none active:bg-[#5e5e5e]"
            type="button"
            onClick={() => setShowModal(true)}
          >
            ...
          </button>
          {showModal ? (
            <>
              <div className=" absolute -top-4 left-72 z-50 flex h-72 w-48 flex-col items-center justify-between overflow-y-auto overflow-x-hidden rounded-lg bg-[#292929] p-4 outline-none focus:outline-none">
                <div>
                  <label htmlFor="Thao Tác" className="text-black">
                    Thao Tác
                  </label>
                </div>
                <div className="h-full w-full pt-5 ">
                  <div className="w-full py-1 hover:bg-slate-300">
                    <button className="text-white">Thêm thẻ</button>
                  </div>
                  <div className="w-full py-1 hover:bg-slate-300">
                    <button className="text-white">Sắp sếp theo Tên</button>
                  </div>
                  <div className="w-full py-1 hover:bg-slate-300">
                    <button className="text-white">Sắp sếp theo Ngày</button>
                  </div>
                </div>
                <button className="w-full rounded-lg bg-red-600">Xóa</button>
              </div>

              <div
                className="fixed inset-0 z-40 bg-[#ffffff] opacity-25"
                onClick={() => setShowModal(false)}
              ></div>
            </>
          ) : null}
        </>
      </div>
      <div
        className={`max-h-[70vh] w-full resize-y scroll-m-0 overflow-y-scroll scroll-smooth`}
      >
        {/* <div className={`max-h-[70vh] w-full overflow-y-scroll`}> */}
        {listCard.length > 0 ? listCard.map((item, index) => {
          return <TaskSpace key={index} cardName={item.cardName} cardID={item.id} />;
        }):null}
      </div>
        {!isOpenTextArea ? (
      <div
      onClick={()=>{setIsOpenTextArea(true)}}
        className="mt-2 min-h-10 w-full cursor-pointer rounded-lg  pl-3 pt-2 hover:bg-[#ffffff]"
      >
        <label
          htmlFor="The Lam Viec"
          className="cursor-pointer font-bold text-[#9c9a9a]"
        >
          + Thêm thẻ
        </label>
      </div>
        ):(
      <div
          className="flex h-fit w-full flex-col rounded-lg bg-[#f4f2f2] bg-opacity-0 p-2"
        >
          <div className="w-full h-fit">
            <TextareaAutosize value={currentCard} onChange={(e)=>{setCurrentCard(e.target.value)}}  name="" className="px-2 rounded-lg bg-[#ffffff]   resize-none w-full overflow-hidden min-h-7 " id="" cols={1} ></TextareaAutosize>
          </div>
          <div className="w-full h-12 flex  ">
            <button onClick={()=>{addCardHandle()}} className="w-auto m-2 px-2 active:bg-[#b6c6d6] text-white  rounded-md bg-[#3e5da0] hover:bg-[#6c7e96]">Them The</button>
            <button className="text-[#aaa] font-bold"  onClick={()=>{setIsOpenTextArea(false)}}>X</button>
          </div>
        </div>
        )}
    </div>
  );
}

export default CardSpace;
