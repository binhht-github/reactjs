import { APIs } from "./config";
import { handleError } from "./handleError";
import request from "./request";


export const getTaskByCard = async (cardID: number) => {
    try {
        const result = await request().get(`${APIs.T_GETALLTASKBYTASKID}?card-id=${cardID}`)
        const { data } = result
        return data;
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
export const createNewTask = async (cardEntity: object, taskName: string, createUser: string) => {
    try {
        const result = await request().post(APIs.T_CREATENEWTASK, {
            cardEntity: cardEntity,
            taskName: taskName,
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