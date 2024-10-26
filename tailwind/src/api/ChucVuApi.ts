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
export const createChucVu = async (maChucVu: string,
    tenChucVu: string,
    moTa: string,
    mucluongCoBan: number,
    heSoLuong: number) => {
    try {
        const result = await request().post(`${APIs.CV_CREATE}`, {
            maChucVu: maChucVu,
            tenChucVu: tenChucVu,
            moTa: moTa,
            mucluongCoBan: mucluongCoBan,
            heSoLuong: heSoLuong,
            type: "user"
        })
        return result;
    } catch (e) {
        return handleError(e)
    }
}
export const updateChucVu = async (
    maChucVu: string,
    tenChucVu: string,
    moTa: string,
    mucluongCoBan: number,
    heSoLuong: number) => {
    try {
        const result = await request().post(APIs.CV_UPDATE, {
            maChucVu: maChucVu,
            tenChucVu: tenChucVu,
            moTa: moTa,
            mucluongCoBan: mucluongCoBan,
            heSoLuong: heSoLuong,
            type: "user"
        })
        return result;
    } catch (e) {
        return handleError(e)
    }
}