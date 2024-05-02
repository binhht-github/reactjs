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

export const createNewNhanVien = async (hoTen: string, email: string, gioiTinh: string, anh: string, sdt: string, diaChi: string, pbid: string, cvid: string, ngaySinh: string) => {
    console.log(ngaySinh + " - " +
        email + " - " +
        gioiTinh + " - " +
        pbid + " - " +
        cvid + " - " +
        diaChi
    );


    try {
        // const result = await request().post(APIs.N_CREATE, {
        //     hoTen: hoTen,
        //     cccd: "0213265065",
        //     email: email,
        //     gioiTinh: gioiTinh,
        //     anh: anh,
        //     sdt: sdt,
        //     diaChi: diaChi,
        //     phongBan: {
        //         maPhongBan: pbid,
        //     },
        //     chucVu: {
        //         maChucVu: cvid,
        //     },
        //     ngaySinh: ngaySinh,
        //     taoTaiKhoan: true,
        //     cv: null,
        //     deleted: false,
        //     creator: "admin",
        // })
        // const { data } = result
        // return data;
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

export const getAllNhanVienByProject = async (projectId: string) => {
    try {
        const result = await request().get(`${APIs.N_GETBYPROJECT}?prpject-id=${projectId}`)
        const { data } = result
        return data;
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