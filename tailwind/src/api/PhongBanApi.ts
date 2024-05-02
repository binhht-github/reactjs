import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

interface IPhongBan {
    maPhongBan: string,
    nhanVien: [],
    tenPhongBan: string,
    moTa: string,
    truongPhong: string
}

export const getPhongBan = async () => {
    try {
        const result = await request().get(`${APIs.PB_GETALL}`)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}