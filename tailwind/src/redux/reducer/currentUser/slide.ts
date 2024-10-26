import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ICurrentUser {
  id: number | null,
  maNhanVien: string,
  hoTen: string,
  cccd: string,
  email: string,
  gioiTinh: string,
  anh: string,
  sdt: string,
  diaChi: string,
  ngaySinh: string,
  cv: any, luongCoBan: number, heSoLuong: number,
  deleted: string,
  createDate: string,
  creator: string,
  cvid: string,
  pbid: string,
  phongban: string,
  chucvu: string,
  username: string,

}
const initialState: ICurrentUser = {
  "id": null,
  "maNhanVien": "",
  "hoTen": "",
  "cccd": "",
  "email": "",
  "gioiTinh": "",
  "anh": "",
  "sdt": "",
  "diaChi": "",
  "ngaySinh": "",
  "cv": null,
  "luongCoBan": 0,
  "heSoLuong": 0,
  "deleted": "",
  "createDate": "",
  "creator": "",
  "cvid": "",
  "pbid": "",
  "phongban": "",
  "chucvu": "",
  "username": ""
}
export const currentUserReducer = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<any>) {
      state.id = action.payload.id
      state.maNhanVien = action.payload.nhanVien.maNhanVien
      state.hoTen = action.payload.nhanVien.hoTen
      state.cccd = action.payload.nhanVien.cccd
      state.email = action.payload.nhanVien.email
      state.gioiTinh = action.payload.nhanVien.gioiTinh
      state.anh = action.payload.nhanVien.anh
      state.sdt = action.payload.nhanVien.sdt
      state.diaChi = action.payload.nhanVien.diaChi
      state.ngaySinh = action.payload.nhanVien.ngaySinh
      state.cv = action.payload.nhanVien.cv
      state.luongCoBan = action.payload.nhanVien.luongCoBan
      state.heSoLuong = action.payload.nhanVien.heSoLuong
      state.deleted = action.payload.nhanVien.deleted
      state.createDate = action.payload.nhanVien.createDate
      state.creator = action.payload.nhanVien.creator
      state.cvid = action.payload.nhanVien.cvid
      state.pbid = action.payload.nhanVien.pbid
      state.phongban = action.payload.nhanVien.phongban
      state.chucvu = action.payload.nhanVien.chucvu
      state.username = action.payload.username
    }
  }
})
export const { setCurrentUser } = currentUserReducer.actions
export default currentUserReducer;
