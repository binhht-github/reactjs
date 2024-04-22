import React, { useState } from "react";
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { Avatar } from "../components/avatar/Avatar";
import TuneIcon from '@mui/icons-material/Tune';

interface props {
  authenticated: boolean
}

function Dashboard(props: props) {

  const [users, setUsers] = useState([1, 2, 3, 4, 5, 5, 6, 23, 234, 2, 342, 35, 235, 2134, 2]);

  const [isActive, setIsActive]=useState<Number>();

  return (
    <div className="h-screen w-[calc(100%-240px)] flex">

      <div className="w-64 h-screen bg-[#E9EDFE] px-2 pt-4">
        <div className="h-14">
          <h2 className="font-bold text-xl">Users Management</h2>
          <span className="text-xs">store information of accounts in the system</span>
        </div>
        <div className="h-20">
          <button className="w-full bg-[#234EEC] rounded-lg p-1 text-white mb-2">Create an Account</button>
          <div className="w-full bg-[red] relative rounded-lg">
            <input type="text" className="w-full pr-7 pl-2 h-7 rounded-lg" />
            <TuneIcon className="absolute right-0 cursor-pointer p-0.5"  />
          </div>
        </div>
        <div className="py-2  resize-y scroll-m-0 overflow-y-scroll scroll-smooth h-[calc(100%-11rem)] ">
          {users.map((item, index) => {
            return (
              <div className={`flex items-center ${index == isActive ? "bg-[#ffffff]":""} rounded-md p-1 my-2 cursor-pointer`}
                onClick={()=>{setIsActive(index)}}
              >
                <Avatar size={40} url={""} />
                <div className="pl-2 h-[40px] flex flex-col">
                  <h3 className="text-[16px] font-bold">Nguyen Van Anh</h3>
                  <span className="text-[11px]">AnhNV19042004@gmail.com</span>
                </div>
              </div>
            )
          })}

        </div>
        <div className="h-10"> 1 2 3 4 </div>
      </div>
      <div className="h-screen w-[calc(100%-256px)] bg-[white] pt-4">
        <div className="h-14 w-full  flex justify-between px-4">
          <div>
            <h3 className="font-bold text-xl">Detailed information</h3>
            <span className="text-xs">Display full detail of the selected account</span>
          </div>
          <div className="flex items-center">
            <button className="bg-green-700 px-2 rounded-lg h-9 mx-2">update account</button>
            <button className="bg-green-700 px-2 rounded-lg h-9  mx-2">Deactiveted</button>
          </div>
        </div>
        <div className="w-full h-[calc(100%-56px)] bg-[white] flex flex-col items-center justify-center">
          <div className="translate-y-6 "><Avatar size={48} url="" /></div>
          <div className="w-[80%] h-[80%] rounded-lg border-solid border-2 border-sky-500 p-6">
            <div className="w-full flex flex-col h-fit mb-4  items-center">
              <h3 className="font-medium">Nguyen Van A</h3>
              <span className="inline-block text-xs">AnhNV19042004@gmail.com</span>
            </div>
            <div className="flex w-full h-fit">
              <div className="px-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Mã nhân viên</label>
                  <span className="inline-block font-medium">DEV0001</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Giới tính</label>
                  <span className="inline-block font-medium">Nam</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Ngày sinh</label>
                  <span className="inline-block font-medium">19-04-2024</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Email</label>
                  <span className="inline-block font-medium">AnhNV19042024@gmail.com</span>
                </div>
              </div>
              <div className="px-4 ml-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Vị trí (chức vụ)</label>
                  <span className="inline-block font-medium">Deverloper</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Số điện thoại</label>
                  <span className="inline-block font-medium">0365719297</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Địa chỉ</label>
                  <span className="inline-block font-medium">Vĩnh phúc</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Ngày vào</label>
                  <span className="inline-block font-medium">19-04-2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
