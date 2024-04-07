import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
const clientId ="273237233987-e7c29htmqjlk9cd406dftpbuo3hq0gva.apps.googleusercontent.com"
const clientId2 ="595764836675-olh5ve4ig2l0snd2lo2u4dkipiqgvo0t.apps.googleusercontent.com"

interface Iname{
  name:String
  picture:String
}

interface dataFormProps {
  actionLogin: (value:boolean)=>void
  
}

function OAuthLogin(props:dataFormProps) {

 

  const onSuccess = (res:any) =>{
    // console.log("log in",res.credential);
    // console.log("log in",res.credential);
    // console.log("login",res);
    const token = res.credential;
    const decoded = jwtDecode(token) as Iname;
    // console.log("name ",decoded);
    
    const currentUser = {
      name:decoded.name,
      avt:decoded.picture
    }
    localStorage.setItem("token",token)
    sessionStorage.setItem("currentUser",JSON.stringify(currentUser))
    props.actionLogin(true)
   
  }
  const onFailure = (res:any) =>{
    console.log("failure", res); 
    
}

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        text="continue_with"
        theme="outline"
        width="100%"
        // onSuccess={credentialResponse => {
        //   console.log(credentialResponse);
        // }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </div>
  );
}

export default OAuthLogin;
