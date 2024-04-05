import React from 'react';
// import {GoogleLogin} from  'react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId ="273237233987-e7c29htmqjlk9cd406dftpbuo3hq0gva.apps.googleusercontent.com"
const clientId2 ="595764836675-olh5ve4ig2l0snd2lo2u4dkipiqgvo0t.apps.googleusercontent.com"


function OAuthLogin() {
  const onSuccess = (res) =>{
      console.log("login");
      console.log("log in",res.profileobj);
      
  }
  const onFailure = (res) =>{
    console.log("failure", res); 
    
}

  return (
    <div>
      {/* <GoogleLogin
        clientId={clientId}
        buttonText="login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        signInFlow="redirect"
        isSignedIn={true}
      /> */}
    </div>
  );
}

export default OAuthLogin;
