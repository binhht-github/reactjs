import axios from "axios"
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

export const uploadFiles = async (files: any) => {
    console.log(files);

    const formData = new FormData();
    formData.append('file', files); // file là biến chứa tệp bạn muốn tải lên

    // axios.post("http://localhost:8080/uploadFile", formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGlsYnQxMzM5NEBnbWFpbC5jb20iLCJpYXQiOjE3MTQ3MDQzNTIsImV4cCI6MTcxNTMwOTE1Mn0.lKmaFyTJW5-rcDhDXwRN1MNK0ff8TvP8JIAP-FgMTJzUWR6dzlypJ1Hp7Wsg-8LGzQ9LW5ueDxhew-B6iVECgg'
    //     },
    // }).then((res) => {
    //     console.log(res);

    // }).catch((e) => {
    //     console.log(e);
    // })

    try {
        const result = await request().postFile(`${APIs.F_UPLOAD}`, formData)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}