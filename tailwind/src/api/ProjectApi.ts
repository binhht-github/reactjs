import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

interface IProject {
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
export const createProject = async (projectName: string, maNhanVien: string) => {
    try {
        const result = await request().post(`${APIs.P_CREATE}`, { projectName: projectName, createUser: maNhanVien })
        const { data } = result
        return result;
    } catch (e) {
        return handleError(e)
    }
}