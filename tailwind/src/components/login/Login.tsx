import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import OAuthLogin from './OAuthLogin';


const clientId2 ="595764836675-olh5ve4ig2l0snd2lo2u4dkipiqgvo0t.apps.googleusercontent.com"
interface accI {
    email:ResponseType,
    password:String
}
interface dataFormProps {
    actionLogin: (value:boolean)=>void
    
}


interface a {
    a:String
}

function Login(props:dataFormProps) {
    const accObj ={
        email:'',
        password:''
      }
      const [accState,setAccState]=useState(accObj);
      
      const handleChangePassWord=(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setAccState({
            ...accState,
            password:newValue
        })
        // console.log(newValue);
        
      }
      const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setAccState({
            ...accState,
            email: newValue
        })
        
      }
      const onSummitHandle = ()=>{
        // console.log("email ",accState.email);
        props.actionLogin(true);
        // console.log(accState);
      }
  return (
    <div className='flex justify-center items-center w- h-screen '>
        <div className=' bg-[#2b3038] min-w-[500px] h-auto p-8 rounded-lg'>
            {/* <form action=""> */}
                <div className='text-[#ffffff] pb-5'>
                    <h1 className='text-2xl font-bold'>Wellcome </h1>
                    {/* <p className='text-[#d1d5db]' >Start your website in seconds. Don’t have an account?</p> <a href="">Sign up</a> */}
                </div>
                <div className='flex justify-between items-center'>
                    <div className='text-[#ffffff] flex flex-col'>
                        <label className='pb-2' htmlFor="">Email</label>
                        <input onChange={(e)=>{onChangeEmail(e)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="text" placeholder="Email"/>
                    </div>
                    <div className='text-[#ffffff] flex flex-col'>
                        <label className='pb-2' htmlFor="">Password</label>
                        <input onChange={(e)=>{handleChangePassWord(e)}} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                    </div>
                </div>
            <hr className='my-5'/>
                <div>
                 <GoogleOAuthProvider clientId={clientId2}>
                    <OAuthLogin  actionLogin = {props.actionLogin} />
                 </GoogleOAuthProvider> 
                 {/* <button className="bg-blue-500    hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Login with Google
                    </button> */}
                </div>
                <div className='flex justify-between items-center my-3'>
                    <div className='py-2 flex items-center'>
                        <input type="checkbox" name="remeber" id="remember" />
                        <label className='text-[#d1d5db] pl-2' htmlFor="Remember">Remember</label>
                    </div>
                    <div className='text-[#3b82f6]'>
                        <a  href="">Forgot password?</a>
                    </div>
                </div>
                <div className='flex  w-full px-4  justify-center items-center'>
                    <button onClick={onSummitHandle} className="bg-blue-500  w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Sign in to your account
                    </button>
                </div>
            {/* </form> */}
        </div>
    </div>
  );
}

export default Login;
