import React, { useEffect, useState } from "react";
import { Avatar } from "../components/avatar/Avatar";
import TuneIcon from '@mui/icons-material/Tune';
import { createNewNhanVien, getNhanVienByPage, getTotal } from "../api/NhanVienApi";
import { communeByDistrict, districtByProvince, provinceAll } from "../db";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { getChucVu } from "../api/ChucVuApi";
import { useOutsideClick } from "../components/board/testRef";
import { getPhongBan } from "../api/PhongBanApi";

interface props {
  authenticated: boolean
}
interface INhanVien {
  "anh": string,
  "cccd": string,
  "chucvu": string,
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
  "sdt": string,
}
interface IProvince {
  idProvince: string,
  name: string
}
interface IDistrict {
  idProvince: string,
  idDistrict: string,
  name: string,
}
interface ICommune {
  idDistrict: string,
  idCommune: string,
  name: string
}
interface IChucVu {
  maChucVu: string,
  tenChucVu: string,
  moTa: string,
  mucluongCoBan: number,
  heSoLuong: number
}
interface IPhongBan {
  maPhongBan: string,
  nhanVien: [],
  tenPhongBan: string,
  moTa: string,
  truongPhong: string
}
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function Dashboard(props: props) {

  const [users, setUsers] = useState<INhanVien[]>([]);
  const [chucVu, setChucVu] = useState<IChucVu[]>([]);
  const [phongbans, setPhongbans] = useState<IPhongBan[]>([]);
  const [isActive, setIsActive] = useState<number>(1);
  const [isAction, setIsAction] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const lengthPage = 300;
  const [totalPage, setTotalPage] = useState<number>(1);
  const [animation, setAnimation] = useState(false);
  const [provice, setProvince] = useState<IProvince[]>(provinceAll);
  const [proviceCurrent, setProvinceCurrent] = useState<string>("");
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [districtCurrent, setDistrictCurrent] = useState<string>("");
  const [commune, setCommune] = useState<ICommune[]>([]);
  const [communeCurrent, setCommuneCurrent] = useState<string>("");
  const [value, onChange] = useState<Value>(new Date());
  const [userActive, setUserActive] = useState<INhanVien>({
    "anh": "anh",
    "cccd": "cccd",
    "chucvu": "chucvu",
    "createDate": "createDate",
    "creator": "creator",
    "cv": "cv",
    "deleted": "deleted",
    "diaChi": "diaChi",
    "email": "email",
    "gioiTinh": "gioiTinh",
    "heSoLuong": "heSoLuong",
    "hoTen": "hoTen",
    "luongCoBan": "luongCoBan",
    "maNhanVien": "maNhanVien",
    "username": "username",
    "ngaySinh": "ngaySinh",
    "phongban": "phongban",
    "sdt": "sdtg"
  });
  const [userNew, setUserNew] = useState<INhanVien>({
    "anh": "",
    "cccd": "",
    "chucvu": "all",
    "createDate": dayjs(new Date() + "").format('DD-MM-YYYY'),
    "creator": "admin",
    "cv": "",
    "deleted": "deleted",
    "diaChi": "",
    "email": "",
    "gioiTinh": "nam",
    "heSoLuong": "",
    "hoTen": "",
    "luongCoBan": "",
    "maNhanVien": "",
    "username": "",
    "ngaySinh": "",
    "phongban": "all",
    "sdt": ""
  });

  const ref = useOutsideClick(() => {
    setShowDate(false)
  });

  useEffect(() => {
    getChucVu().then((res) => {
      setChucVu(res);
    })
    getPhongBan().then((res) => {
      setPhongbans(res)
    })
  }, [])

  useEffect(() => {
    setAnimation(true)
    getNhanVienByPage(page, lengthPage).then((res) => {
      setUsers(res);
      setAnimation(false)
    })
    getTotal(lengthPage).then((res: number) => {
      setTotalPage(res)

    })
  }, [page])


  useEffect(() => {
    setDistrict(districtByProvince(proviceCurrent.split("-")[0]));
    setCommune(communeByDistrict(districtCurrent.split("-")[0]))
  }, [proviceCurrent, districtCurrent])

  const handleChangePage = (page: number) => {
    console.log("change ", page);
    setIsActive(page);
    setPage(page)
  }

  const handleCreateNew = () => {
    // hoTen: string, email: string, gioiTinh: string, anh: string, sdt: string, diaChi: string, pbid: string, cvid: string, ngaySinh: string
    createNewNhanVien(userNew.hoTen,
      userNew.email,
      userNew.gioiTinh,
      userNew.anh,
      userNew.sdt,
      userNew.diaChi,
      userNew.phongban,
      userNew.chucvu,
      dayjs(value + "").format('YYYY-MM-DD')
    ).then((res) => {

    })
  }

  const onChangeNewUser = (event: any) => {
    if (event.target.id == "hoTen") {
      setUserNew({
        ...userNew,
        hoTen: event.target.value
      })
    }
    if (event.target.id == "gioiTinh") {
      setUserNew({
        ...userNew,
        gioiTinh: event.target.value
      })
    }
    if (event.target.id == "email") {
      setUserNew({
        ...userNew,
        email: event.target.value
      })
    }
    if (event.target.id == "viTri") {
      setUserNew({
        ...userNew,
        chucvu: event.target.value
      })
    }
    if (event.target.id == "phongBan") {
      setUserNew({
        ...userNew,
        phongban: event.target.value
      })
    }
    if (event.target.id == "sdt") {
      setUserNew({
        ...userNew,
        sdt: event.target.value
      })
    }
    if (event.target.id == "cccd") {
      setUserNew({
        ...userNew,
        cccd: event.target.value
      })
    }
    if (event.target.id == "provice") {
      setUserNew({
        ...userNew,
        diaChi: event.target.value.split("-")[1]
      })
    }
    if (event.target.id == "distric") {
      setUserNew({
        ...userNew,
        diaChi: userNew.diaChi+", "+event.target.value.split("-")[1]
      })
    }
    if (event.target.id == "commune") {
      setUserNew({
        ...userNew,
        diaChi: userNew.diaChi+", "+event.target.value.split("-")[1]
      })
    }

  }



  return (
    <div className="h-screen w-[calc(100%-240px)] flex">

      <div className="w-64 h-screen bg-[#E9EDFE] px-2 pt-4">
        <div className="h-14">
          <h2 className="font-bold text-xl">Users Management</h2>
          <span className="text-xs">store information of accounts in the system</span>
        </div>
        <div className="h-20">
          <button className="w-full bg-[#234EEC] rounded-lg p-1 text-white mb-2" onClick={() => { setIsAction(true) }}>Create an Account</button>
          <div className="w-full bg-[red] relative rounded-lg">
            <input type="text" className="w-full pr-7 pl-2 h-7 rounded-lg" />
            <TuneIcon className="absolute right-0 cursor-pointer p-0.5" />
          </div>
        </div>
        <div className=" py-2 relative  w-full resize-y scroll-m-0 overflow-y-scroll scroll-smooth h-[calc(100%-11rem)] ">
          {animation ?
            (
              <div className=" bg-opacity-90 w-full h-full absolute bg-[white] z-50 flex justify-center items-center">
                <div id="test" className="border-x-2 rounded-full border-x-[red] border-y-[green] border-y-2 w-10 h-10"></div>
              </div>
            ) : (
              users.map((item, index) => {
                return (
                  <div key={index} className={`flex items-center ${item.maNhanVien == userActive.maNhanVien ? "bg-[#ffffff]" : ""} rounded-md p-1 my-2 cursor-pointer`}
                    onClick={() => {
                      setUserActive(item)
                      setIsAction(false)
                    }}
                  >
                    <Avatar size={40} url={""} />
                    <div className="pl-2 h-[40px] flex flex-col">
                      <h3 className="text-[16px] font-bold">{item.hoTen}</h3>
                      <span className="text-[11px]">{item.email}</span>
                    </div>
                  </div>
                )
              })
            )
          }

          {/* {} */}
        </div>

        <div className="h-10">
          <ul className="flex">
            {(() => {
              const arr = [];
              for (let i = 1; i <= totalPage; i++) {
                arr.push(
                  // <a href="/user-manager/page/1/length/400">
                  <li key={i} onClick={() => { handleChangePage(i) }} className="p-2 hover:bg-[#d6d6d6] cursor-pointer rounded-md" style={{ backgroundColor: `${i == isActive ? "white" : ""}` }}>{i}</li>
                  // </a>
                );
              }
              return arr;
            })()}
            {/* <li>{totalPage}</li> */}
          </ul>
        </div>
      </div>

      {/* detail information */}
      <div className="h-screen  w-[calc(100%-256px)] bg-[white] pt-4" style={{ display: `${isAction ? "none" : "block"}` }} >
        <div className="h-14 w-full  flex justify-between px-4">
          <div>
            <h3 className="font-bold text-xl">Detailed information</h3>
            <span className="text-xs">Display full detail of the selected account</span>
          </div>
          <div className="flex items-center">
            <button className="bg-green-700 px-2 rounded-lg h-9 mx-2">update account</button>
            <button className="bg-green-700 px-2 rounded-lg h-9  mx-2">Deactiveted</button>
          </div>
        </div>
        <div className="w-full h-[calc(100%-56px)] bg-[white] flex flex-col items-center justify-center">
          <div className="translate-y-6 "><Avatar size={48} url={`${true != null ? userActive.anh : ""}`} /></div>
          <div className="w-[80%] h-[80%] rounded-lg border-solid border-2 border-sky-500 p-6">
            <div className="w-full flex flex-col h-fit mb-4  items-center">
              <h3 className="font-medium">{true != null ? userActive.hoTen : "Họ Tên"}</h3>
              <span className="inline-block text-xs">{true != null ? userActive.email : "Email@gmail.com"}</span>
            </div>
            <div className="flex w-full h-fit">
              <div className="px-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Mã nhân viên</label>
                  <span className="inline-block font-medium">{true != null ? userActive.maNhanVien : "Mã nhân viên"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Giới tính</label>
                  <span className="inline-block font-medium">{true != null ? userActive.gioiTinh : "Giới tính"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Ngày sinh</label>
                  <span className="inline-block font-medium">{true != null ? userActive.ngaySinh : "Ngày sinh"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Email</label>
                  <span className="inline-block font-medium">{true != null ? userActive.email : "email"}</span>
                </div>
              </div>
              <div className="px-4 ml-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Vị trí (chức vụ)</label>
                  <span className="inline-block font-medium">{true != null ? userActive.chucvu : "vị trí"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Số điện thoại</label>
                  <span className="inline-block font-medium">{true != null ? userActive.sdt : "số điện thoại"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Địa chỉ</label>
                  <span className="inline-block font-medium">{true != null ? userActive.diaChi : "địa chỉ"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Ngày vào</label>
                  <span className="inline-block font-medium">{true != null ? userActive.createDate : "ngày vào"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* create user */}
      <div className="h-screen w-[calc(100%-256px)] bg-[white] pt-4" style={{ display: `${isAction ? "block" : "none"}` }}>
        <div className="h-14 w-full  flex justify-between px-4 ">
          <div>
            <h3 className="font-bold text-xl">Create New Employey</h3>
            <span className="text-xs">Display create new account</span>
          </div>
          <div className="flex items-center">
            <button className="bg-green-700 px-2 rounded-lg h-9 mx-2" onClick={() => { handleCreateNew()  }}>Create User</button>
            <button className="bg-green-700 px-2 rounded-lg h-9  mx-2">Deactiveted</button>
          </div>
        </div>
        <div className="w-full h-[calc(100%-56px)] bg-[white] flex flex-col items-center justify-center">
          <div className="translate-y-5 hover:bg-[red] ">
            <Avatar size={48} url={`${true != null ? userNew.anh : ""}`} />
          </div>
          <div className="w-[80%] h-[90%] rounded-lg border-solid border-2 border-sky-500 p-6">
            <div className="w-full flex flex-col h-fit mb-4  items-center">
              <input
                id="hoTen"
                type="text"
                value={userNew.hoTen}
                onChange={(e) => { onChangeNewUser(e) }}
                className="inline-block font-medium bg-[#bcbcbc] px-2 py-0.5 w-[40%]"
                placeholder="Ho Ten"
              />
            </div>
            <div className="flex w-full h-fit">
              <div className="px-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">CCCD/CMT</label>
                  <input
                    id="cccd"
                    type="text"
                    value={userNew.cccd}
                    maxLength={12}
                    onChange={(e) => { onChangeNewUser(e) }}
                    className="inline-block font-medium bg-[#bcbcbc] px-1" />
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Số điện thoại</label>
                  <input
                    id="sdt"
                    type="text"
                    value={userNew.sdt}
                    maxLength={10}
                    onChange={(e) => { onChangeNewUser(e) }}
                    className="inline-block font-medium bg-[#bcbcbc] px-1" />
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Email</label>
                  <input
                    id="email"
                    type="text"
                    value={userNew.email}
                    onChange={(e) => { onChangeNewUser(e) }}
                    className="inline-block font-medium bg-[#bcbcbc] px-1" />
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Giới tính</label>
                  <select
                    id="gioiTinh"
                    value={userNew.gioiTinh}
                    onChange={(e) => { onChangeNewUser(e) }}
                    className="inline-block font-medium bg-[#bcbcbc]"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nu">Nu</option>
                  </select>
                </div>
                <div className="py-2 flex flex-col relative">
                  <label htmlFor="">Ngày sinh</label>
                  <button className="font-medium bg-[#bcbcbc] " onClick={() => { setShowDate(true) }}>{dayjs(value + "").format('DD-MM-YYYY')}</button>
                  <div
                    className="bg-[red] absolute -top-28 hidden"
                    style={{ display: `${showDate ? "block" : "none"}` }}
                    ref={ref}
                  >
                    <Calendar
                      onChange={onChange} 
                      value={value}
                      onClickDay={(v, event) =>setShowDate(false)}
                      
                    />
                  </div>
                </div>

              </div>
              <div className="px-4 ml-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Mã nhân viên</label>
                  <input 
                  id="maNhanVien" 
                  type="text" 
                  className="inline-block font-medium bg-[#bcbcbc] px-1" 
                  disabled 
                  value={userNew.maNhanVien} 
                  />
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Vị trí (chức vụ)</label>
                  <select
                    id="viTri"
                    value={userNew.chucvu}
                    onChange={(e) => { onChangeNewUser(e) }}
                    className="inline-block font-medium bg-[#bcbcbc]" >
                    <option value="all">Vị trí</option>
                    {
                      chucVu.map((item, index) => {
                        return (
                          <option key={item.maChucVu} value={item.maChucVu}>{item.tenChucVu}</option>
                        )
                      })
                    }
                  </select>
                </div>

                <div className="py-2 flex flex-col">
                  <label htmlFor="">Phòng Ban</label>
                  <select
                    id="phongBan"
                    onChange={(e) => { onChangeNewUser(e) }}
                    className="inline-block font-medium bg-[#bcbcbc]" >
                    <option value="all">Phòng Ban</option>
                    {
                      phongbans.map((item, index) => {
                        return (
                          <option key={item.maPhongBan} value={item.maPhongBan}>{item.tenPhongBan}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Địa chỉ</label>
                  <select id="provice" className="inline-block font-medium bg-[#bcbcbc] mb-2" onChange={(e) => {

                    setProvinceCurrent(e.target.value)
                    onChangeNewUser(e)
                  }}>
                    <option value="all">Tinh/TP</option>
                    {
                      provice.map((item) => {
                        return (<option key={item.idProvince} value={`${item.idProvince}-${item.name}`}>{item.name}</option>)
                      })
                    }
                  </select>
                  <select id="distric" className="inline-block font-medium bg-[#bcbcbc] mb-2 " onChange={(e) => {
                     setDistrictCurrent(e.target.value)
                     onChangeNewUser(e)
                      }}>
                    <option value="Nam">Quan/huyen</option>
                    {
                      district.length > 0 ? district.map((item) => { return (<option key={item.idDistrict} value={`${item.idDistrict}-${item.name}`}>{item.name}</option>) }) : null
                    }
                  </select>
                  <select id="commune" className="inline-block font-medium bg-[#bcbcbc] mb-2" onChange={(e)=>{
                    onChangeNewUser(e)
                  }}>
                    <option value="Nam">xa/phuong</option>
                    {
                      commune.length > 0 ? commune.map((item) => { return (<option key={item.idCommune} value={`${item.idCommune}-${item.name}`}>{item.name}</option>) }) : null
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
