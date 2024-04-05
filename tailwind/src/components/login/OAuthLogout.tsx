import React from 'react';
// import {GoogleLogout} from  'react-google-login'


const clientId ="131775647817-1e3sq81qs93fhq4c8j7jk9c7mraf48p2.apps.googleusercontent.com"
const clientId2 ="595764836675-olh5ve4ig2l0snd2lo2u4dkipiqgvo0t.apps.googleusercontent.com"

function OAuthLogout() {
  const onSuccess = () =>{
    console.log("log in");
    
}


  return (
    <div>
    {/* <GoogleLogout
      clientId={clientId}
      buttonText="logout"
      onLogoutSuccess={onSuccess}
    /> */}
  </div>
  );
}

export default OAuthLogout;
