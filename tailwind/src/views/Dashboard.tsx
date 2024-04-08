import React from "react";
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';

function Dashboard() {
  const check = ()=>{
    let config = {
      headers: {"Access-Control-Allow-Origin": "http://localhost:8080"}
    }
    const data ={
                  username:"admin",
                  password:"admin"
                }
    axios.post(`http://localhost:8080/login`,data,config)
    .then((res:any)=>{
      console.log('aaaa');
      
      console.log(res.headers);
      
    })
    .catch(
      (e:any)=>{console.log(e);}
    )
  }

  const check2 = ()=>{
    axios.get(`http://localhost:8080/phong-ban/all`)
    .then((res:any)=>{
      
      console.log(res.data);
      
    })
    .catch(
      (e:any)=>{console.log(e);}
    )
  }
  return (
    <div>
      <h1>Dash Board</h1>
      <button className="w-16 h-6 bg-slate-100" onClick={()=>{
        //  console.log(localStorage);
        //  console.log(sessionStorage);
        console.log(sessionStorage.getItem("currentUser"));
        
      }}>show log</button>
      <button onClick={()=>{ check()}} className="bg-white ml-10">check api</button>

    </div>
  );
}

export default Dashboard;
<h1>Dash Board</h1>;
