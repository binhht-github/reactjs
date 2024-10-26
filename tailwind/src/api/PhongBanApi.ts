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

export const createPhongBan = async (maPhongBan: string,
    tenPhongBan: string,
    moTa: string,
    truongPhong: string,
    type: string) => {
    try {
        const result = await request().post(APIs.PB_CREATE, {
            maPhongBan: maPhongBan,
            tenPhongBan: tenPhongBan,
            moTa: moTa,
            truongPhong: truongPhong,
            type: "user"
        })
        return result;
    } catch (e) {
        return handleError(e)
    }
}
export const updatePhongBan = async (maPhongBan: string,
    tenPhongBan: string,
    moTa: string,
    truongPhong: string,
    type: string) => {
    try {
        const result = await request().post(APIs.PB_UPDATE, {
            maPhongBan: maPhongBan,
            tenPhongBan: tenPhongBan,
            moTa: moTa,
            truongPhong: truongPhong,
            type: "user"
        })
        return result;
    } catch (e) {
        return handleError(e)
    }
}
export const deletePhongBan = async (maPhongBan: string,
    tenPhongBan: string,
    moTa: string,
    truongPhong: string,
    type: string) => {
    try {
        const result = await request().post(APIs.PB_DELETE, {
            maPhongBan: maPhongBan,
            tenPhongBan: tenPhongBan,
            moTa: moTa,
            truongPhong: truongPhong,
            type: "user"
        })
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}