import { APIs } from "./config";
import { handleError } from "./handleError";
import request from "./request";

interface ITaskWork {
    taskWorkId: number;
    taskId: number;
    taskWorkName: string;
    creaeteDate: string;
    creaeteUser: string;
    status: boolean;
}
export const getTaskWorkByTask = async (taskID: number) => {
    try {
        const result = await request().get(`${APIs.T_GETALLTASKWORKBYTASKID}?task-id=${taskID}`)
        const { data } = result
        console.log(data);

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
export const createNewTaskWork = async (taskEnntity: object, taskWorkName: string, createUser: string) => {
    try {
        const result = await request().post(APIs.T_CREATENEWTASKWORK, {
            taskEnntity: taskEnntity,
            status: false,
            taskWorkName: taskWorkName,
            createDate: "2024-04-22",
            createUser: createUser
        })
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}

export const updateStatusTaskWork = async (taskWorkId: number, taskId: number, taskWorkName: string, creaeteDate: string, creaeteUser: string, status: boolean) => {
    try {
        const result = await request().post(APIs.T_UPDATESTATUSTASKWORK, {
            taskWorkId: taskWorkId,
            taskId: taskId,
            taskWorkName: taskWorkName,
            creaeteDate: creaeteDate,
            creaeteUser: creaeteUser,
            status: status,
        })
        const { data } = result
        console.log("update ", result);

        return data;
    } catch (e) {
        return handleError(e)
    }
}

export const deleteTaskWork = async (taskWorkId: number) => {
    try {
        const result = await request().post(`${APIs.T_DELETETASKWORK}?work-id=${taskWorkId}`)
        const { data } = result
        console.log("delete ", result);

        return result;
    } catch (e) {
        return handleError(e)
    }
}