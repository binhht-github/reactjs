import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "../views/Board";
import Dashboard from "../views/Dashboard";
import Post from "../views/Post";
import Imgage from "../views/Imgage";
import Page from "../views/Page";
import SliderBar from "../components/sliderbar/SliderBar";
import routes from "../routes";
import OAuthLogin from "../components/login/OAuthLogin";
function Admin() {
  return (
    <div className="flex h-screen w-full  bg-[url('https://c.wallhere.com/photos/ae/e9/landscape_nature_mist_Moon_mountains_forest_night_moonlight-89640.jpg!d')] bg-cover">
      <SliderBar />
      <Routes>
        {routes.map((item, index) => {
          return (
           <Route path={item.path} element={item.component} key={index} />
          );
        })}
        <Route path={"/"}  element={<Dashboard/>}/>
        {/* <Route path={"/oauth2/redirect"}  element={<OAuthLogin/>}/> */}
      </Routes>
    </div>
  );
}

export default Admin;
