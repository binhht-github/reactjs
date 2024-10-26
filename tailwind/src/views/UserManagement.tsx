import React, { useEffect, useState } from "react";
import { Avatar } from "../components/avatar/Avatar";
import TuneIcon from '@mui/icons-material/Tune';
import 'react-calendar/dist/Calendar.css';
import { deleteNhanVien, getNhanVienByPage, getTotal } from "../api/NhanVienApi";
import CreateNewUser from "../components/usermanagement/CreateNewUser";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { setNhanViens } from "../redux/reducer/nhanVienSlide";

interface props {
  authenticated: boolean
}
interface INhanVien {
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
  "pbid": string,
  "sdt": string,
}



function Dashboard(props: props) {
  const selector = useSelector((state: RootState) => state.nhanViens);

  const [users, setUsers] = useState<INhanVien[]>(selector);
  const [isActive, setIsActive] = useState<number>(1);
  const [isAction, setIsAction] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const lengthPage = 300;
  const [totalPage, setTotalPage] = useState<number>(1);
  const [animation, setAnimation] = useState(false);
  const [userActive, setUserActive] = useState<INhanVien | null>(null);
  const dispath = useDispatch();


  useEffect(() => {
    setAnimation(true)
    getNhanVienByPage(page, lengthPage).then((res) => {
      dispath(setNhanViens(res));
      setAnimation(false)
    })
    getTotal(lengthPage).then((res: number) => {
      setTotalPage(res)

    })
  }, [page])

  const handleChangePage = (page: number) => {
    console.log("change ", page);
    setIsActive(page);
    setPage(page)
  }

  const handleDelete = () => {

    if (
      userActive != null && userActive.deleted != "true"
    ) {

      deleteNhanVien(
        userActive.maNhanVien!
      ).then((res: any) => {
        if (res.status == 200) {
          const index = users.findIndex((item) => item.maNhanVien == res.data.maNhanVien);
          const newArr = [...users];
          newArr[index] = res.data;
          setUsers(newArr);
          toast.success("Xóa thành công")
        } else {
          toast.warning("Xóa thất bại")
        }
      })
    } else {
      alert(userActive?.deleted != "true" ? "vui long cho nhan vien" : "Nhan Vien Nay Da Bi Xoa")
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
          <button className="w-full bg-[#234EEC] rounded-lg p-1 text-white mb-2" onClick={() => {
            setIsAction(true)
            setUserActive(null)
          }}>Create an Account</button>
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
                  <div key={index} className={`flex items-center ${item.maNhanVien == userActive?.maNhanVien ? "bg-[#ffffff]" : ""} rounded-md p-1 my-2 cursor-pointer`}
                    onClick={() => {
                      setUserActive(item)
                      setIsAction(false)
                    }}
                  >
                    <Avatar size={40} url={item.anh} />
                    <div className="pl-2 h-[40px] flex flex-col">
                      <h3 className="text-[16px] font-bold" style={{ textDecoration: `${item.deleted == "true" ? "line-through" : "none"}` }}>{item.hoTen} </h3>
                      <span className="text-[11px]">{item.email}</span>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

        {/* select page */}
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
          </ul>
        </div>
      </div>

      {/* create user */}
      <div style={{ display: `${isAction ? "block" : "none"}` }} className="h-screen  w-[calc(100%-256px)] bg-[white] pt-4">
        <CreateNewUser userActive={userActive} users={users} setUsers={setUsers} />
      </div>

      {/* detail information */}
      <div className="h-screen  w-[calc(100%-256px)] bg-[white] pt-4" style={{ display: `${isAction ? "none" : "block"}` }} >
        <div className="h-14 w-full  flex justify-between px-4">
          <div>
            <h3 className="font-bold text-xl">Detailed information</h3>
            <span className="text-xs">Display full detail of the selected account</span>
          </div>
          <div className="flex items-center">
            <button className="bg-green-700 px-2 rounded-lg h-9 mx-2" onClick={() => {
              if (userActive?.deleted) {
                if (userActive.deleted != "true") {
                  setIsAction(true)
                } else { alert("Nhan Vien Nay Da Bi Xoa") }
              } else { alert("Chua chon nhan vien") }
            }}>update account</button>
            <button className="bg-green-700 px-2 rounded-lg h-9  mx-2" onClick={() => { handleDelete() }}>Deactiveted</button>
          </div>
        </div>
        <div className="w-full h-[calc(100%-56px)] bg-[white] flex flex-col items-center justify-center">
          <div className="translate-y-6 "><Avatar size={80} url={`${userActive ? userActive?.anh : ""}`} /></div>
          <div className="w-[80%] h-[80%] rounded-lg border-solid border-2 border-sky-500 p-6">
            <div className="w-full flex flex-col h-fit mb-4  items-center">
              <h3 className="font-medium">{userActive ? userActive?.hoTen : "Họ Tên"}</h3>
              <span className="inline-block text-xs">{userActive ? userActive?.email : "Email@gmail.com"}</span>
            </div>
            <div className="flex w-full h-fit">
              <div className="px-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Mã nhân viên</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.maNhanVien : "Mã nhân viên"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Giới tính</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.gioiTinh : "Giới tính"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Ngày sinh</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.ngaySinh : "Ngày sinh"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Email</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.email : "email"}</span>
                </div>
              </div>
              <div className="px-4 ml-4 w-[50%]">
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Vị trí (chức vụ)</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.chucvu : "vị trí"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Số điện thoại</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.sdt : "số điện thoại"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Địa chỉ</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.diaChi : "địa chỉ"}</span>
                </div>
                <div className="py-2 flex flex-col">
                  <label htmlFor="">Ngày vào</label>
                  <span className="inline-block font-medium">{userActive ? userActive?.createDate : "ngày vào"}</span>
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
