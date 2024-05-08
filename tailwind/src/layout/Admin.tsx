import React from 'react';
import { Route, Routes } from "react-router-dom";
import SliderBar from "../components/sliderbar/SliderBar";
import { routers } from '../routes';
import ColumnSpace from '../components/board/ColumnSpace';
import NavBoard from '../components/board/NavBoard';
function Admin() {
  const cc = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(cc + "")

  return (
    <div className="flex h-screen w-full  bg-[url('https://embed-ssl.wistia.com/deliveries/d5ae8190f0aa7dfbe0b01f336f29d44094b967b5.webp?image_crop_resized=1280x720')] bg-cover">
      <SliderBar />
      <Routes>
        {routers.map((item, index) => {
          if (item.role.includes(currentUser.nhanVien.cvid)) {
            return (
              <Route path={item.path} element={item.component} key={index} >
                <Route path="project/*" ></Route>
              </Route>
            );
          }
        })}
        <Route path={"/"} />
      </Routes>
    </div>
  );
}


export default Admin;
