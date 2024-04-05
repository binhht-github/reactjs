import React from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './layout/Admin';
import OAuthLogout from './components/login/OAuthLogout';
import OAuthLogin from './components/login/OAuthLogin';

function App() {
  return (
    <div className="h-screen w-full bg-[#EFF2F4]"> 
      <OAuthLogin/>
      {/* <OAuthLogout/> */}
    <Admin />
    </div>
  );
}

export default App;
