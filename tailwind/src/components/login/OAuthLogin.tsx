import React from 'react';
import logoGG from '../../logoGG.svg';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin   } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
const clientId ="273237233987-e7c29htmqjlk9cd406dftpbuo3hq0gva.apps.googleusercontent.com"
const clientId2 ="595764836675-olh5ve4ig2l0snd2lo2u4dkipiqgvo0t.apps.googleusercontent.com"

interface IcurenUser{
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
    const decoded = jwtDecode(token) as IcurenUser;
    // console.log("name ",decoded);
    
    const currentUser = {
      name:decoded.name,
      avt:decoded.picture
    }
    localStorage.setItem("accessToken",token)
    sessionStorage.setItem("currentUser",JSON.stringify(currentUser))
    props.actionLogin(true)
    
   
  }
  const  login  =  useGoogleLogin ( { 
    onSuccess : onSuccess,
    onError : () => {
      console.log('Login Failed');
    },
    flow : 'auth-code' , 
    redirect_uri:"dashboard",
    ux_mode:'redirect'
    // login_uri:"http://localhost:5000/dashboard"
  } ) ; 
  const onFailure = (res:any) =>{
    console.log("failure", res); 
    
}

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        text="signin"
        // theme="outline"
        logo_alignment='center'
        width="100%"
        onError={() => {
          console.log('Login Failed');
        }}
      //  useOneTap
      />
     
      <button onClick={()=>{login()}} className='w-64 h-9 rounded-lg bg-white flex items-center pl-4 ' title=''>  <img className='h-6' src={logoGG} alt="React Logo" /><span className='pl-3'>Đăng nhập bằng Google</span></button>
    </div>
  );
}

export default OAuthLogin;
