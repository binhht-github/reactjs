import React, { useEffect, useState } from "react";
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import SubjectIcon from '@mui/icons-material/Subject';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Avatar } from "../avatar/Avatar";
import { createNewTask, getTaskByCard } from "../../api/TaskApi";
import { getActiveWorkbyTask } from "../../api/ActiveWorkApi";
import TaskWork from "./TaskWork";
import { useSocket } from "../netty-socket/useSocket";

interface cardProp {
  cardName: string;
  cardID: number;
  cardLenght: number;
  cardStack: number;
  moveStack: any;
}
interface Itask {
  id: number;
  cardid: number;
  cardname: string;
  creaeteDate: string;
  creaeteUser: string;
  taskName: string;
  taskStack: number;
}

interface IActiveWork {
  id: number;
  content: string;
  createDateTime: string;
  room: string;
  maNhanVien: string;
  hoTen: string;
  anh: string;
  activeType: string;
}


function TaskSpace({ cardName, cardID, cardLenght, cardStack, moveStack }: cardProp) {
  const cc = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(cc + "")

  const { socketResponse, sendActiveWork } = useSocket(cardID, currentUser.nhanVien.maNhanVien, currentUser.nhanVien.anh, currentUser.nhanVien.hoTen);
  const [tasks, setTasks] = useState<Itask[]>([])
  const [activeWroks, setActiveWorks] = useState<IActiveWork[]>([])
  const [contentActiveWork, setContentActiveWork] = useState<string>("")



  const [modal, setModal] = useState(false);
  const [detailActive, setDetailActive] = useState(false);
  const [currentTask, setCurrentTask] = useState<string>("")
  const [modalAddNew, setModalAddNew] = useState(false);
  const [modalMove, setModalMove] = useState(false);

  useEffect(() => {
    getTaskByCard(cardID).then((res) => { setTasks(res) });

  }, [cardID])


  const handleCraeteNewTask = () => {

    createNewTask({ cardId: cardID }, currentTask, "admin").then((res) => {
      setTasks((preTask) => [...preTask, res]);
    })
    setCurrentTask("");
    setModalAddNew(false);
  }

  const onChangehandle = (e: any) => {
    // console.log(e.target.value);
    setContentActiveWork(e.target.value)

  }


  const addActiveWork = (val: any) => {
    if (val.room == "") return;
    setActiveWorks([...activeWroks, val]);
  };
  useEffect(() => {
    addActiveWork(socketResponse);
  }, [socketResponse]);

  const onHandleActiveWork = () => {
    const newActiveWork = {
      "id": 0,
      "content": contentActiveWork,
      "createDateTime": "",
      "room": "1",
      "nhanVien": {
        "maNhanVien": ""
      }
    }

    if (contentActiveWork != "") {
      sendActiveWork({
        content: contentActiveWork,
      });
      const time = ""; //timeStampConverter(Math.floor(Date.now() / 1000));
      addActiveWork({
        content: contentActiveWork,
        maNhanVien: currentUser.nhanVien.maNhanVien,
        hoTen: currentUser.nhanVien.hoTen,
        anh: currentUser.nhanVien.anh,
        createdDateTime: new Date(),
        activeType: "CLIENT",
      });
      setContentActiveWork("");
    }
  }

  return (
    <div >
      <div onClick={() => {
        getActiveWorkbyTask(cardID).then((res: any) => {
          setActiveWorks(res.data);
        });
        setModal(true)
      }} className="mb-2 h-auto min-h-10 w-full rounded-lg bg-[white] pl-2 pt-2 cursor-pointer" >
        <label htmlFor="The Lam Viec" className="text-[#333] cursor-pointer">
          {cardName}
        </label>
      </div>

      {/* modal */}
      {modal ? (
        <div className="opacity-50 overflow-y-auto overflow-x-hidden absolute w-screen h-screen top-0 left-0  mb-52" >
          <div className="w-[60%] h-fit  bg-[#eeeeee] absolute inset-0 left-[20%] top-[4%] z-50 rounded-lg   ">
            <div className="w-full h-16  px-12 py-2 relative">
              <div className="absolute left-3 top-2">
                <VideoLabelIcon />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-black font-medium">{cardName}</label> <label htmlFor="">X</label>
              </div>
              <label htmlFor="" className="text-black">trong danh sach: {cardName}</label>
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
                      <div key={item.id} className="w-auto h-fit relative ml-8 mt-2">
                        <div className="pt-2 mb-3">
                          <div className=" absolute -left-9 top-1.5">
                            <FactCheckIcon />
                          </div>
                          <label htmlFor="" className="text-black font-medium">{item.taskName}</label>
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
                  <div className="pt-2 mb-3 flex justify-between">
                    <div>
                      <div className=" absolute -left-9 top-1.5">
                        <FormatListBulletedIcon />
                      </div>
                      <label htmlFor="" className="text-black font-medium">Hoạt động</label>
                    </div>
                    <div>
                      <button onClick={() => { setDetailActive(!detailActive) }}>{detailActive ? "an chi tiet" : "hien chi tiet"}</button>
                    </div>
                  </div>

                  <div className="pt-2 mb-3 relative">
                    <div className=" absolute -left-10 top-2.5">
                      <Avatar size={35} url="" />
                    </div>
                    <div>
                      <input value={contentActiveWork} onChange={(e) => { onChangehandle(e) }} type="text" name="" id="" className="w-full p-2" placeholder="Viết bình luận" />
                      {contentActiveWork != "" ? (<button onClick={onHandleActiveWork} className="bg-[#415fe4] px-2 py-1 mt-2">Lưu</button>) : null}
                    </div>
                  </div>
                  {activeWroks.length > 0 ?
                    activeWroks.map((item) => {
                      return (
                        <div key={item.id} className="pt-1 mb-1 relative flex items-center">
                          <div className=" absolute -left-10 top-2.5">
                            <Avatar size={35} url="" />
                          </div>
                          <div className="flex justify-center flex-col">
                            {item.activeType == "CLIENT" ?
                              <>
                                <span className="w-full">{item.hoTen}</span>
                                <span className="w-full" >{item.content}</span>
                              </> : <>
                                {detailActive ? null :
                                  <span className="w-full">{item.hoTen} {item.content}</span>
                                }
                              </>

                            }
                          </div>
                        </div>
                      )
                    }) : null}
                </div>
                {/* end hoạt động */}
              </div>

              {/* Nav TaskSpace */}
              <div className="bg-[#ffffff] w-[25%] h-screen bg-opacity-90 px-2 ">

                <span >Hành Động</span>
                <div>
                  <button className="w-full text-left rounded-sm p-2 h-full  bg-[#bcbcbc] ">Tham gia | rời khỏi</button>
                </div>
                <span >Thêm vào thẻ</span>
                <div className="flex justify-center flex-col">
                  <div className="w-full h-fit p-2 bg-[#bcbcbc] mt-2 rounded-sm  relative ">

                    <span className="w-full  h-full block  cursor-pointer" onClick={(e) => { setModalAddNew(!modalAddNew) }}>Việc cần làm</span>
                    {/* modal */}
                    <div className="bg-[#d4d4d4] w-fit p-3 rounded-md absolute top-12 z-50 " style={{ display: `${!modalAddNew ? "none" : "block"}` }}>
                      <div className="w-full  mb-4 flex justify-between">
                        <label htmlFor="">Thêm danh sách làm việc</label>
                        <span onClick={() => { setModalAddNew(false) }} className="hover:bg-[#e7e4e4] cursor-pointer px-1">x</span>
                      </div>
                      <label className="" htmlFor="">Tiêu đề</label>
                      <input className="py-1 px-2 my-3" type="text" placeholder="Việc Cần Làm" value={currentTask} onChange={(e) => { setCurrentTask(e.target.value) }} />
                      <button className="bg-[#85B8FF] w-12 h-8 hover:bg-[#adc7ff] rounded-md mr-2" onClick={() => { if (currentTask != "") { handleCraeteNewTask() } }} >Thêm</button>
                    </div>
                  </div>
                  <div className="w-full h-fit p-2 bg-[#bcbcbc] mt-2 rounded-sm cursor-pointer relative ">
                    <label onClick={() => { setModalMove(true) }} htmlFor="" className="w-full block cursor-pointer">Di Chuyển</label>
                    {/* modal */}
                    <div className="bg-[#d4d4d4] w-72 p-3 rounded-md absolute top-12 z-50 " style={{ display: `${!modalMove ? "none" : "block"}` }}>
                      <div className="w-full  mb-4 flex justify-between">
                        <label htmlFor="" className="text-center w-full">Di chuyển thẻ</label>
                        <span onClick={() => { setModalMove(false) }} className="hover:bg-[#e7e4e4] cursor-pointer px-1">x</span>
                      </div>
                      <div >
                        <span>Chọn đích đến</span>
                        <div className="flex mt-2 ">
                          <div className="mr-1 w-[70%] ">
                            <span>danh sách</span>
                            <select id="countries" className="rounded-lg block w-full p-2.5 ">
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="FR">France</option>
                              <option value="DE">Germany</option>
                            </select>
                          </div>
                          <div className="ml-1 w-[30%]">
                            <span>vị trí</span>
                            <select onChange={(e) => {
                              // console.log(e.target.value);
                              moveStack(cardStack, Number(e.target.value))
                              cardStack = Number(e.target.value)
                            }} id="countries" className="rounded-lg block w-full p-2.5 ">
                              {
                                [...Array(cardLenght)].map((item, index) => {
                                  return (<option key={index} value={index + 1}>{index + 1} {index + 1 == cardStack ? "hien tai" : ""}</option>)
                                })
                              }
                              {/* <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option> */}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}
            </div>
          </div>
          <div className="bg-[black] bg-opacity-50 w-screen h-screen fixed inset-0 z-40" onClick={() => { setModal(false) }}>
          </div>
        </div>
      ) : null}
      {/* and modal */}
    </div>
  );
}

export default TaskSpace;
