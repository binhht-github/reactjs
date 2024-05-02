import axios from "axios"
import { API_BASE_URL, APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

interface columnTemp {
    id: number,
    projectName: string,
    createDate: string,
    listUser: [],
    createUser: string
}

export const loginAPI = async (userName: string, passWord: string) => {
    try {
        const result = await request().post(`${APIs.U_LOGIN}`, { username: userName, password: passWord })
        const { data } = result
        return data;
        // return {
        //     success: true,
        //     data,
        // }
    } catch (e) {
        return handleError(e)
    }
}