import { ACCESS_TOKEN, APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

export const  getCurrentUser = async () => {
  if(localStorage.getItem(ACCESS_TOKEN) != "" || localStorage.getItem(ACCESS_TOKEN) != null){
    return  await request().get(`${APIs.U_CURRENT}`)
  }
    // try {
    //     const result = await request().get(`${APIs.U_CURRENT}`)
    //     const { data } = result
    //     return {
    //       success: true,
    //       data,
    //     }
    //   } catch (e) {
    //     return e
    //   }
  }