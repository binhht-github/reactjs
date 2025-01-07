import axios from "axios";
import { apiKey, baseURL, spreadsheetId } from "./config";

export const getUser = async () => {
    const range = "User!A2:D10000000";
    const url = `${baseURL}/${spreadsheetId}/values/${range}?key=${apiKey}`;
    const result = await axios.get(url)
    const data = result.data.values.map((item: any, index: number) => {
        const [vocabularyID, userID, status, createDate] = result.data.values[index];
        return { vocabularyID, userID, status, createDate }
    })

    return {
        data: data,
        status: result.status
    }
}