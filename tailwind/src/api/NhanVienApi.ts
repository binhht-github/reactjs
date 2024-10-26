import { APIs } from "./config"
import { handleError } from "./handleError"
import request from "./request"


export const getAllNhanVien = async () => {
    try {
        const result = await request().get(`${APIs.N_ALL}`)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}

export const getNhanVienByPage = async (page: number, length: number) => {
    try {
        const result = await request().get(`/nhanviens/page/${page}/length/${length}`)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}

export const createNewNhanVien = async (hoTen: string, cccd: string, email: string, gioiTinh: string, anh: string, sdt: string, diaChi: string, pbid: string, cvid: string, ngaySinh: string) => {
    try {
        const result = await request().post(APIs.N_CREATE, {
            hoTen: hoTen,
            cccd: cccd,
            email: email,
            gioiTinh: gioiTinh,
            anh: anh,
            sdt: sdt,
            diaChi: diaChi,
            phongBan: {
                maPhongBan: pbid,
            },
            chucVu: {
                maChucVu: cvid,
            },
            ngaySinh: ngaySinh,
            taoTaiKhoan: true,
            cv: null,
            deleted: false,
            creator: "admin",
        })

        return result;
    } catch (e) {
        return handleError(e)
    }


    // try {
    //     const result = await request().post(APIs.N_CREATE, {
    //         hoTen: hoTen,
    //         cccd: "0213265065",
    //         email: email,
    //         gioiTinh: gioiTinh,
    //         anh: anh,
    //         sdt: sdt,
    //         diaChi: diaChi,
    //         phongBan: {
    //             maPhongBan: pbid
    //         },
    //         chucVu: {
    //             maChucVu: cvid
    //         },
    //         ngaySinh: ngaySinh,
    //         taoTaiKhoan: true,
    //         cv: null,
    //         deleted: false,
    //         creator: "admin"
    //     })
    //     const { data } = result
    //     return data;
    // } catch (e) {
    //     return handleError(e)
    // }
}
export const updateNhanVien = async (maNhanVien: string, hoTen: string, cccd: string, email: string, gioiTinh: string, anh: string, sdt: string, diaChi: string, pbid: string, cvid: string, ngaySinh: string) => {

    try {
        const result = await request().post(APIs.N_UPDATE, {
            maNhanVien: maNhanVien,
            hoTen: hoTen,
            cccd: cccd,
            email: email,
            gioiTinh: gioiTinh,
            anh: anh,
            sdt: sdt,
            diaChi: diaChi,
            phongBan: {
                maPhongBan: pbid,
            },
            chucVu: {
                maChucVu: cvid,
            },
            ngaySinh: ngaySinh,
            taoTaiKhoan: true,
            cv: null,
            deleted: false,
            creator: "admin",
        })
        return result;
    } catch (e) {
        return handleError(e)
    }

}

export const deleteNhanVien = async (maNhanVien: string) => {
    try {
        const result = await request().post(`${APIs.N_DELETE}`, { maNhanVien: maNhanVien })
        return result;
    } catch (e) {
        return handleError(e)
    }
}

export const getAllNhanVienByProject = async (projectId: string) => {
    try {
        const result = await request().get(`${APIs.N_GETBYPROJECT}?prpject-id=${projectId}`)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}
export const getAllNhanVienNotProject = async (projectId: number) => {
    try {
        const result = await request().get(`${APIs.N_GETNOTPROJECT}?prpject-id=${projectId}`)
        return result;
    } catch (e) {
        return handleError(e)
    }
}

export const getTotal = async (length: number) => {
    try {
        const result = await request().get(`${APIs.N_TOTAL}?length=${length}`)
        const { data } = result
        return data;
    } catch (e) {
        return handleError(e)
    }
}