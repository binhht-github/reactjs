import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

interface prtemplate {
    id: number,
    projectName: string,
    createDate: string,
    listUser: [],
    createUser: string
}

export const getProject = async () => {
    try {
        const result = await request().get(`${APIs.P_GETALLBYYUSER}`)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}