import React, { useEffect, useState } from 'react';
import './App.css';
import Admin from './layout/Admin';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import Login from './components/login/Login';
import Log from './components/login/Log';
import { ACCESS_TOKEN } from './utils/enum';
import { getCurrentUser } from './utils/APIUtils';



function App() {
  const [authenticated, setAuthenticated] = useState(false); //!localStorage.getItem(ACCESS_TOKEN) ? false : true
 
  getCurrentUser().then((res:any)=>{
    console.log(res.data);
    setAuthenticated(!localStorage.getItem(ACCESS_TOKEN) ? false : true);
    sessionStorage.setItem("currentUser",JSON.stringify(res.data))
  }).catch(
    (e:any)=>{console.log(e);
  })

  useEffect(()=>{
    
  },[authenticated])


  
  return (
    <div className="h-screen w-full bg-[#EFF2F4]">

        {/* {authenticated ? (
          <Admin/>
        ):(
          <Log></Log>
        )} */}

        <Admin/>

    </div>
  );
}

export default App;
