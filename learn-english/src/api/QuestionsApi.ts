
import { IQuestions } from "../Interface/Interfaces"
import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"


export const getQuestionByTopicID = async (topicId: string) => {
    try {
        const result = await request().get(`${APIs.QUESTIONS}?orderBy="topic"&equalTo="${topicId}"&auth=${localStorage.getItem("token")}`) //https://api-learn-eng-default-rtdb.firebaseio.com/Topic.json?orderBy="example"&equalTo="exm3hee49fuaupy"
        const data: IQuestions[] = Object.keys(result.data).map(key => result.data[key]);
        data.sort((a, b) => { return a.index - b.index })
        return {
            success: true,
            data,
        }
    } catch (e) {
        return handleError(e)
    }
}
export const postQuestions = () => {

}

