import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface INhanVien {
    "anh": string,
    "cccd": string,
    "chucvu": string,
    "cvid": string,
    "createDate": string,
    "creator": string,
    "cv": string,
    "deleted": string,
    "diaChi": string,
    "email": string,
    "gioiTinh": string,
    "heSoLuong": string,
    "hoTen": string,
    "luongCoBan": string,
    "maNhanVien": string,
    "username": string,
    "ngaySinh": string,
    "phongban": string,
    "pbid": string;
    "sdt": string,
}
const initialState: INhanVien[] = []
export const nhanvienReduces = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setNhanViens(state, action: PayloadAction<any>) {
            return [...action.payload]

        },
        addNewNhanVien(state, action: PayloadAction<any>) {
            return [...state, action.payload]
        },
        reset: () => initialState
    }
})
export const { setNhanViens, addNewNhanVien } = nhanvienReduces.actions
export default nhanvienReduces;
