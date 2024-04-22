import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import SliderBar from "../components/sliderbar/SliderBar";
import { getCurrentUser } from '../utils/APIUtils';
import ProjectManagement from "../views/ProjectManagement";
import { routers } from '../routes';
// import routers from '../routes';
function Admin() {

  const [authenticated, setLogined] = useState(localStorage.getItem("ACCESS_TOKEN") == null ? false : true);
  const [currentUser, setCurrentUser] = useState({})


  useEffect(()=>{
    getCurrentUser().then((res:any)=>{
      console.log(res);
      
    })
    .catch((e:any)=>{console.log(e);
    })
   
  },[])


  const actionLogin = (state : boolean)=>{
    setLogined(state)
    console.log(localStorage);
    console.log(sessionStorage);
    
    
  }


  return (
    <div className="flex h-screen w-full  bg-[url('https://embed-ssl.wistia.com/deliveries/d5ae8190f0aa7dfbe0b01f336f29d44094b967b5.webp?image_crop_resized=1280x720')] bg-cover">
      <SliderBar />
      <Routes>
        {routers.map((item, index) => {
          return (
          //  <Route path={item.path} element={item.component(authenticated)} key={index}  />
           <Route path={item.path} element={item.component}  key={index}  />
          );
        })}
        {/* <Route path='/' element={<ProjectManagement/>}/> */}
      </Routes>
    </div>
  );
}

export default Admin;
