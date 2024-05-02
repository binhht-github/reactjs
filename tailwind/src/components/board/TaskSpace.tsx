import React, { useEffect, useState } from "react";
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import SubjectIcon from '@mui/icons-material/Subject';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Avatar } from "../avatar/Avatar";
import { createNewTask, getTaskByCard } from "../../api/TaskApi";
import TaskWork from "./TaskWork";

interface cardProp {
  cardName: string;
  cardID: number;
}
interface Itask {
  id: number;
  cardid: number;
  cardname: string;
  creaeteDate: string;
  creaeteUser: string;
  taskName: string;
  taskStack: number;
  // iprocess: number;

}
function TaskSpace({ cardName, cardID }: cardProp) {

  const [tasks, setTasks] = useState<Itask[]>([])
  const [currentTask, setCurrentTask] = useState<string>("")
  const [model, setModel] = useState(false);
  const [modelAddNew, setModelAddNew] = useState(false);

  useEffect(() => {
    getTaskByCard(cardID).then((res) => { setTasks(res) });
  }, [cardID])


  const handleCraeteNewTask = () => {

    createNewTask({ cardId: cardID }, currentTask, "admin").then((res) => {
      setTasks((preTask) => [...preTask, res]);
    })
    setCurrentTask("");
    setModelAddNew(false);
  }




  return (
    <div >
      <div className="mb-2 h-auto min-h-10 w-full rounded-lg bg-[white] pl-2 pt-2 cursor-pointer" onClick={() => { setModel(true) }}>
        <label htmlFor="The Lam Viec" className="text-[#333]">
          {cardName}
        </label>
      </div>

      {/* modal */}
      {model ? (
        <div className="overflow-y-auto overflow-x-hidden absolute w-screen h-screen top-0 left-0  mb-52" >
          <div className="w-[60%] h-fit  bg-[#eeeeee] absolute inset-0 left-[20%] top-[4%] z-50 rounded-lg   ">
            <div className="w-full h-16  px-12 py-2 relative">
              <div className="absolute left-3 top-2">
                <VideoLabelIcon />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-black font-medium">{cardName}</label> <label htmlFor="">X</label>
              </div>
              <label htmlFor="" className="text-black">trong danh sach: Todo</label>
            </div>
            <div className="w-full px-2  h-[calc(100%-64px)] flex ">
              <div className=" px-2 w-[75%] h-full bg-opacity-100">
                {/* Nhãn vs thông báo */}
                <div className="w-auto h-fit mt-2 ml-8">
                  <div>
                    <label htmlFor="">Nhãn</label>
                    <div className="bg-[green] h-6 w-12 rounded-sm" />
                  </div>
                </div>
                {/* end Nhãn vs thông báo */}
                {/* Mô tả */}
                <div className="w-auto h-fit flex justify-center flex-col relative ml-8 py-2 hidden">
                  <div className="absolute top-2 -left-9">
                    <SubjectIcon />
                  </div>
                  <label htmlFor="" className="text-black font-medium">Mô tả</label>
                  <div className="w-full mt-4">
                    <textarea name="" id="" cols={60} rows={10} className="w-full"></textarea>
                  </div>
                  <div className="w-full">
                    <button className="bg-[#85B8FF] w-12 h-8 hover:bg-[#adc7ff] rounded-md mr-2">Lưu</button>
                    <button className=" w-12 h-8 hover:bg-[#adc7ff] rounded-md mr-2">Hủy</button>
                  </div>
                </div>
                {/* end mô tả */}
                {/* việc cần làm */}
                {
                  tasks.length > 0 ? tasks.map((item, index) => {
       
                    return (
                      <div key={index} className="w-auto h-fit relative ml-8 mt-2">
                        <div className="pt-2 mb-3">
                          <div className=" absolute -left-9 top-1.5">
                            <FactCheckIcon />
                          </div>
                          <label htmlFor="" className="text-black font-medium">{item.taskName} {item.id}</label>
                        </div>
                        {/* sliderbar da tach sang taskwork */}
                        <div className="">
                          <TaskWork taskID={item.id} />
                        </div>
                        
                      </div>
                    )
                  }) : null
                }

                {/* end việc cần làm */}
                {/* hoạt động */}
                <div className="w-auto h-fit relative ml-8 mt-2">
                  <div className="pt-2 mb-3">
                    <div className=" absolute -left-9 top-1.5">
                      <FormatListBulletedIcon />
                    </div>
                    <label htmlFor="" className="text-black font-medium">Hoạt động</label>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div>
                      <input type="text" name="" id="" className="w-full p-2" />
                    </div>
                  </div>
                  {/* ======================? */}
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>
                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div className="bg-white p-2">
                      <span>Bình Luận 1</span>
                    </div>
                  </div>

                  {/* ======================? */}
                </div>
                {/* end hoạt động */}
              </div>


              <div className="bg-[#ffffff] w-[25%] h-screen bg-opacity-90 px-2 ">
                <label htmlFor="">Thêm vào thẻ</label>
                <div className="flex justify-center flex-col">
                  <div className="w-full h-fit p-2 bg-[#bcbcbc] mt-2 rounded-sm cursor-pointer relative ">
                    <label className="w-full  h-full block" htmlFor="" onClick={(e)=>{setModelAddNew(!modelAddNew) }}>Việc cần làm</label>
                    <div className="bg-[#d4d4d4] w-fit p-3 rounded-md absolute top-12 z-50 " style={{display: `${!modelAddNew ? "none":"block"}`}}>
                      <label className="" htmlFor="">Tiêu đề</label>
                      <input className="py-1 px-2 my-3" type="text" placeholder="Việc Cần Làm" value={currentTask} onChange={(e)=>{setCurrentTask(e.target.value)}}/>
                      <button className="bg-[#85B8FF] w-12 h-8 hover:bg-[#adc7ff] rounded-md mr-2" onClick={()=>{if( currentTask !="" ){ handleCraeteNewTask()} }} >Thêm</button>
                    </div>
                  </div>
                  <div className="w-full h-fit p-2 bg-[#bcbcbc] mt-2 rounded-sm cursor-pointer relative ">
                    <label htmlFor="">Việc cần làm</label>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[black] bg-opacity-50 w-screen h-screen fixed inset-0 z-40" onClick={() => { setModel(false) }}>
          </div>
        </div>
      ) : null}
      {/* and modal */}
    </div>
  );
}

export default TaskSpace;
