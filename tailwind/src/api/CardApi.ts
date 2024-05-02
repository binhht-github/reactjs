import { APIs } from "./config";
import { handleError } from "./handleError";
import request from "./request";


export const getCardByColumnId = async (columnID: number) => {
    try {
        console.log("call api ", columnID);

        const result = await request().get(`${APIs.C_GETALLBYCOLUMNID}?column-id=${columnID}`)
        const { data } = result
        console.log("data ", data);
        return data;
        // return {
        //     success: true,
        //     data,
        // }
    } catch (e) {
        return handleError(e)
    }
}

export const createNewCard = async (columEntity: object, cardName: string, createUser: string) => {
    try {
        const result = await request().post(APIs.C_CREATENEWCARD, {
            cardName: cardName,
            columnEntity: columEntity,
            taskEntities: [],
            createUser: createUser
        })
        const { data } = result
        console.log("aaaa ", data);
        return data;
    } catch (e) {
        return handleError(e)
    }
}