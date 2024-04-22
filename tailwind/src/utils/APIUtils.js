import { API_BASE_URL,ACCESS_TOKEN } from "./enum";
import axios from "axios";


const  request = (options) => {



    // let config = {
    //     headers: {"Access-Control-Allow-Origin": "http://localhost:8080"}
    //   }
    //   const data ={
    //                 username:"admin",
    //                 password:"admin"
    //               }
    //   axios.post(`http://localhost:8080/login`,data)
    //   .then((res:any)=>{
    //     localStorage.setItem("Authorization",res.data)
    //     console.log("Author ",res.data);
        
        
    //   })
    //   .catch(
    //     (e:any)=>{console.log(e);}
    //   )


    let config = {
        headers: {"Authorization":  "Bearer " + localStorage.getItem(ACCESS_TOKEN)}
      }

    const headers = new Headers({
      "Content-Type": "application/json",
    });
  
    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      );
    }
  
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
  
    return axios(options.url, config)
  };

  export const  getCurrentUser = () => {
    console.log("curen");
    console.log(!localStorage.getItem(ACCESS_TOKEN) ? false : true);
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }
  
    return request({
      url: API_BASE_URL + "/user/me",
      method: "GET",
    });
  }