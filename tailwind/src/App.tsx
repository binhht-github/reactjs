import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './layout/Admin';
import OAuthLogout from './components/login/OAuthLogout';
import OAuthLogin from './components/login/OAuthLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/login/Login';

const clientId ="273237233987-e7c29htmqjlk9cd406dftpbuo3hq0gva.apps.googleusercontent.com"
const clientId2 ="595764836675-olh5ve4ig2l0snd2lo2u4dkipiqgvo0t.apps.googleusercontent.com"

function App() {
  const [logined, setLogined] = useState(false);
  const actionLogin = (state : boolean)=>{
    setLogined(state)
    console.log(localStorage);
    console.log(sessionStorage);
    
    
  }
  return (
    <div className="h-screen w-full bg-[#EFF2F4]">
      {!logined ?  
        <Login actionLogin={actionLogin} />
         :

        <Admin />

        // <GoogleOAuthProvider clientId={clientId2}>
        //             <OAuthLogin  />
        //         </GoogleOAuthProvider> 
      }
    {/* <OAuthLogout/> */}
    </div>
  );
}

export default App;
