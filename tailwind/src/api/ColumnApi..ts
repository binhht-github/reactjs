import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

interface columnTemp {
    id: number,
    projectName: string,
    createDate: string,
    listUser: [],
    createUser: string
}

export const getColumnByProjectId = async (id: number) => {
    try {
        const result = await request().get(`${APIs.C_GETALLBYPROJECTID}?projectId=${id}`)
        const { data } = result
        // console.log("aaaa ", data);
        return data;
        // return {
        //     success: true,
        //     data,
        // }
    } catch (e) {
        return handleError(e)
    }
}

interface INewColumn {
    projectEntity: object,
    columnName: string,
    cardEntities: [],
    createUser: string

}
export const createNewColumn = async (projectEntity: object, columnName: string, createUser: string) => {
    try {
        console.log("cehck ", columnName)
        const result = await request().post(APIs.C_CREATENEW, {
            projectEntity: projectEntity,
            columnName: columnName,
            cardEntities: [],
            createDate: "2024-04-22",
            createUser: createUser
        })
        const { data } = result
        console.log("aaaa ", data);
        return data;
        // return {
        //     success: true,
        //     data,
        // }
    } catch (e) {
        return handleError(e)
    }
}