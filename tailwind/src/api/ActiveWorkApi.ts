import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"


export const getActiveWorkbyTask = async (id: number) => {
    try {
        const result = await request().get(`${APIs.ATW_GETBYTASK}?room=${id}`)
        return result;
    } catch (e) {
        return handleError(e)
    }
}
