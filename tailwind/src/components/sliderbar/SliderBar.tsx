import React, { useState } from "react";
import { SliderItem } from "./SliderItem";
import { routers } from "../../routes";
import { Avatar } from "../avatar/Avatar";

import SettingsIcon from '@mui/icons-material/Settings';
import { ACCESS_TOKEN } from "../../api/config";

function SliderBar() {
  // const currentUser = {
  //                     id:5329,
  //                     nhanVien:{
  //                       maNhanVien:"118401708690434782648",
  //                       hoTen:"hung hoang",
  //                       cccd:null,
  //                       email:"hoanghung2354454@gmail.com",
  //                       gioiTinh:null,
  //                       anh:"https://lh3.googleusercontent.com/a/ACg8ocIgwP9dkBjlRThXKd3msDLtPV9lXZjflbAsOzxYP1Ocw7b66A=s96-c",
  //                       sdt:null,
  //                       diaChi:null,
  //                       ngaySinh:
  //                       "2024-04-10",
  //                       cv:null,
  //                       luongCoBan:10000000,
  //                       heSoLuong:1.2,
  //                       deleted:null,
  //                       createDate:null,
  //                       creator:null,
  //                       phongban:"Phong Phat TrienB",
  //                       chucvu:"Nhan vien"
  //                     },
  //                     username:"hoanghung2354454@gmail.com",
  //                     deleted:"false",
  //                     createDate:null         
  // }




  const cc = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(cc + "")

  // console.log(currentUser);

  var router = [
    {
      title: "DashBoard",
      textColor: "black",
      icon: {},
    },
  ];

  const [indexActive, setIndexActive] = useState(null);

  return (
    <div className={`bg-white h-screen w-64`}>
      {/* <div className="h-14 w-60 bg-[#1317299f]"></div> */}
      <div className=" w-full h-16 flex items-center pl-4 ">
        {/* <Avatar size={36} url={"https://media.muanhatructuyen.vn/post/221/31/3/hinh-nen-girl-xinh-tinh-nghich.jpg"} /> */}
        <Avatar size={36} url={currentUser.nhanVien.anh} />
        {/* <Avatar size={36} url={`${currentUser.nhanVien.anh}`} /> */}
        <label htmlFor="name" className="pl-2 cursor-pointer">{currentUser.nhanVien.hoTen}</label>
      </div>
      <hr />
      <div className="flex h-[calc(100%-8rem-1px)] w-full flex-col items-center  bg-[#ffffff] bg-opacity-1 pb-2 shadow-lg backdrop-blur-md">
        <div className="w-56  ">
          {routers.map((item, index) => {
            if (item.role.includes(currentUser.nhanVien.cvid)) {
              return (
                <SliderItem
                  key={index}
                  path={item.path}
                  title={item.name}
                  textColor={indexActive == index ? "white" : "#333"}
                  icon={item.icon}
                  isActive={indexActive == index ? true : false}
                  setActive={setIndexActive}
                  index={index}
                />
              );
            }
          })}

          <hr />

          <div
            onClick={
              () => { console.log("click"); }
            }
            key="seting"
            className="my-5 flex h-8 w-full  cursor-pointer items-center space-x-3 pl-2 pr-2 active:bg-indigo-100 active:text-indigo-500">
            <SettingsIcon />
            <label htmlFor="Setting" className='text-[#333] cursor-pointer'>
              Setting
            </label>
          </div>

        </div>
      </div>



      <div className="w-full h-16 bg-sky-800 ">
        <div className="h-9 w-full ">
          <button
          onClick={()=>{
            localStorage.removeItem(ACCESS_TOKEN);
            sessionStorage.clear()
            window.location.href = '/login'
          }}
          >log out</button>
        </div>
        {/* <div className="flex h-9 w-full items-center space-x-2 rounded-lg bg-[#667A8A] pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
                clipRule="evenodd"
              />
            </svg>
            <label htmlFor="Log out">Log out</label>
          </div> */}
      </div>
    </div>
  );
}

export default SliderBar;
