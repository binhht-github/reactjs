import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"

interface IChucVu {
    maChucVu: string,
    tenChucVu: string,
    moTa: string,
    mucluongCoBan: number,
    heSoLuong: number
}

export const getChucVu = async () => {
    try {
        const result = await request().get(`${APIs.CV_GETALL}`)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}