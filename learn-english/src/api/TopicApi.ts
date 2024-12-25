
import { ITopic } from "../Interface/Interfaces"
import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

export const getTopicByExampleId = async (exampleId: string) => {
    try {
        const result = await request().get(`${APIs.TOPIC}?orderBy="example"&equalTo="${exampleId}"&auth=${localStorage.getItem("token")}`) //https://api-learn-eng-default-rtdb.firebaseio.com/Topic.json?orderBy="example"&equalTo="exm3hee49fuaupy"
        const data: ITopic[] = Object.keys(result.data).map(key => result.data[key]);
        data.sort((a, b) => { return a.index - b.index })

        return {
            success: true,
            data,
        }
    } catch (e) {
        return handleError(e)
    }
}


export const postTopic = async (topicData: ITopic[]) => {
    try {

        const reqDataConvert = topicData.reduce((acc, cur, index) => {
            acc[cur.id] = cur;
            return acc;
        }, {} as Record<string, object>);
        console.log(reqDataConvert);


        const result = await request().patch(`${APIs.TOPIC}?auth=${localStorage.getItem("token")}`, reqDataConvert)
        const { data } = result

        return {
            success: true,
            data,
        }
    } catch (e) {
        return handleError(e)
    }
}



// export const getCodeSong = async () => {
//     try {
//         const result = await request().get(`${APIs.CODE_SONG}`)
//         const { data } = result
//         return {
//             success: true,
//             data,
//         }
//     } catch (e) {
//         return handleError(e)
//     }
// }


