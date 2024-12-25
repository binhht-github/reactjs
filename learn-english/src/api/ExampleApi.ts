
import { IExample } from "../Interface/Interfaces"
import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"


export const getExample = async () => {
    try {
        const result = await request().get(`${APIs.EXAMPLE}?auth=${localStorage.getItem("token")}`)
        const data: IExample[] = Object.keys(result.data).map(key => result.data[key]);
        return {
            success: true,
            data,

        }
    } catch (e) {
        return handleError(e)
    }
}

export const postExample = async (exmapleData: IExample[]) => {
    try {
        const reqDataConvert = exmapleData.reduce((acc, cur, index) => {
            acc[cur.id] = cur;
            return acc;
        }, {} as Record<string, object>);
        console.log(reqDataConvert);


        const result = await request().patch(`${APIs.EXAMPLE}?auth=${localStorage.getItem("token")}`, reqDataConvert)
        const { data } = result

        return {
            success: true,
            data,
        }
    } catch (error) {
        return handleError(error)
    }
}

