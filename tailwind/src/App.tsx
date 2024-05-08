import React, { useEffect, useState } from 'react';
import './App.css';
import Admin from './layout/Admin';
import {useSearchParams } from 'react-router-dom';
import Login from './components/login/Login';
import { getCurrentUser } from './api/UserApi'; 
import { ACCESS_TOKEN } from './api/config';



function App() {
  const [authenticated, setAuthenticated] = useState(false); //!localStorage.getItem(ACCESS_TOKEN) ? false : true
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
    const token = searchParams.get("token");
    if(token){
      localStorage.setItem(ACCESS_TOKEN, token+"");
      window.location.href = '/'
    }
    getCurrentUser().then((res:any)=>{
      console.log(localStorage.getItem(ACCESS_TOKEN));
      setAuthenticated( localStorage.getItem(ACCESS_TOKEN) == null || localStorage.getItem(ACCESS_TOKEN) == "" ? false : true);
      sessionStorage.setItem("currentUser",JSON.stringify(res.data))
    })
    .catch((e:any)=>{
      setAuthenticated(false);
        sessionStorage.clear()
    })
  },[])
  
  return (
    <div className="h-screen w-full bg-[#EFF2F4]">

        {authenticated ? (
          // <h1>hihi</h1>
          <Admin/>
        ):(
          <Login />
        )}

    </div>
  );
}

export default App;
