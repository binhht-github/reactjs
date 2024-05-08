import dayjs from 'dayjs';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { createNewNhanVien, updateNhanVien } from '../../api/NhanVienApi';
import { Avatar } from '../avatar/Avatar';
import Calendar from 'react-calendar';
import { useOutsideClick } from '../board/testRef';
import { getChucVu } from '../../api/ChucVuApi';
import { getPhongBan } from '../../api/PhongBanApi';
import { communeByDistrict, districtByProvince, provinceAll } from '../../db';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface props {
    users: INhanVien[],
    setUsers: any
    userActive: INhanVien | null
}

interface INhanVien {
    "anh": string,
    "cccd": string,
    "chucvu": string,
    "cvid":string,
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
    "pbid":string;
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

function CreateNewUser({ userActive, setUsers, users }: props) {
    const [userNew, setUserNew] = useState<INhanVien|null>(
        {
        "anh": "",
        "cccd": "",
        "chucvu": "all",
        "cvid":"",
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
        "pbid":"",
        "sdt": ""
    });
    const [value, onChange] = useState<Value>(new Date());
    const [chucVu, setChucVu] = useState<IChucVu[]>([]);
    const [phongbans, setPhongbans] = useState<IPhongBan[]>([]);
    const [provice, setProvince] = useState<IProvince[]>(provinceAll);
    const [proviceCurrent, setProvinceCurrent] = useState<string>("");
    const [district, setDistrict] = useState<IDistrict[]>([]);
    const [districtCurrent, setDistrictCurrent] = useState<string>("");
    const [commune, setCommune] = useState<ICommune[]>([]);
    const [communeCurrent, setCommuneCurrent] = useState<string>("");
    const [showDate, setShowDate] = useState<boolean>(false);
    const ref = useOutsideClick(() => {
        setShowDate(false)
    });
    const [selectFile, setSelectFile] = useState<File | null>(null)
    const [testImg, setTestImg] = useState<String>("")

    
    useEffect(() => {
        getChucVu().then((res) => {
            setChucVu(res);
        })
        getPhongBan().then((res) => {
            setPhongbans(res)
        })
    }, [])
    useEffect(()=>{
        userActive ? 
        setUserNew(userActive)
        :
        setUserNew(
            {
                "anh": "",
                "cccd": "",
                "chucvu": "all",
                "cvid":"",
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
                "pbid":"",
                "sdt": ""
            }
        )
    },[userActive])

    useEffect(() => {
        setDistrict(districtByProvince(proviceCurrent.split("-")[0]));
        setCommune(communeByDistrict(districtCurrent.split("-")[0]))
    }, [proviceCurrent, districtCurrent])

    // Xử lý khi người dùng chọn tệp
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectFile(event.target.files[0]);
            setTestImg(URL.createObjectURL(event.target.files[0]));

            // uploadFiles(event.target.files[0]);
        }
    };


    const handleCreateNew = () => {
        console.log(userNew);
        
        if (
            userNew?.pbid != "all" &&
            userNew?.cvid != "all"
        ) {

            createNewNhanVien(userNew?.hoTen!,
                userNew?.cccd!,
                userNew?.email!,
                userNew?.gioiTinh!,
                userNew?.anh!,
                userNew?.sdt!,
                userNew?.diaChi!,
                userNew?.pbid!,
                userNew?.cvid!,
                dayjs(value + "").format('YYYY-MM-DD')
            ).then((res) => {
                setUsers([...users, res])
            })
        } else {
            alert("chua chon chuc vu hoac phong ban")
        }
    }
    const handleSaveUser = ()=>{
        console.log(userNew?.diaChi);
        
        if (
            userNew?.phongban != "all" &&
            userNew?.chucvu != "all" &&
            userNew != null
        ) {

            // updateNhanVien(
            //     userNew?.maNhanVien!,
            //     userNew?.hoTen!,
            //     userNew?.cccd!,
            //     userNew?.email!,
            //     userNew?.gioiTinh!,
            //     userNew?.anh!,
            //     userNew?.sdt!,
            //     userNew?.diaChi!,
            //     userNew?.pbid!,
            //     userNew?.cvid!,
            //     dayjs(value + "").format('YYYY-MM-DD')
            // ).then((res) => {
            //     const index = users.findIndex((item) => item.maNhanVien == res.maNhanVien);
            //     const newArr = [...users];
            //     newArr[index] = res;
            //     setUsers(newArr);
            // })
        } else {
            alert("chua chon chuc vu hoac phong ban")
        }
    }

    const onChangeNewUser = (event: any) => {
        if (event.target.id == "hoTen") {
            setUserNew({
                ...userNew,
                hoTen: event.target.value
            } as INhanVien)
        }
        if (event.target.id == "gioiTinh") {
            setUserNew({
                ...userNew,
                gioiTinh: event.target.value
            }as INhanVien)
        }
        if (event.target.id == "email") {
            setUserNew({
                ...userNew,
                email: event.target.value
            }as INhanVien)
        }
        if (event.target.id == "viTri") {
            setUserNew({
                ...userNew,
                cvid: event.target.value
            }as INhanVien)
        }
        if (event.target.id == "phongBan") {
            setUserNew({
                ...userNew,
                pbid: event.target.value
            }as INhanVien)
        }
        if (event.target.id == "sdt") {
            setUserNew({
                ...userNew,
                sdt: event.target.value
            }as INhanVien)
        }
        if (event.target.id == "cccd") {
            setUserNew({
                ...userNew,
                cccd: event.target.value
            }as INhanVien)
        }
        if (event.target.id == "provice") {
            setUserNew({
                ...userNew,
                diaChi: event.target.value
                // .split("-")[1]
            }as INhanVien)
        }
        if (event.target.id == "distric") {
            setUserNew({
                ...userNew,
                diaChi: event.target.value + ", " + userNew?.diaChi
            }as INhanVien)
        }
        if (event.target.id == "commune") {
            setUserNew({
                ...userNew,
                diaChi: event.target.value + ", " + userNew?.diaChi
            }as INhanVien)
        }

    }

    return (
        <div className='w-full'>
            <div className="h-screen w-[full] bg-[white] pt-4" >
                <div className="h-14 w-full  flex justify-between px-4 ">
                    <div>
                        <h3 className="font-bold text-xl">{userActive ? "Update an Employey" : "Create New Employey"}</h3>
                        <span className="text-xs">{userActive ? "Display update an account" : "Display create new account"}</span>
                    </div>
                    <div className="flex items-center">
                        {userActive ? <button className="bg-green-700 px-2 rounded-lg h-9 mx-2" onClick={() => { handleSaveUser() }}>Save</button>
                            : <button className="bg-green-700 px-2 rounded-lg h-9 mx-2" onClick={() => { handleCreateNew() }}>Create User</button>
                        }
                        <button className="bg-green-700 px-2 rounded-lg h-9  mx-2" onClick={() => {
                            if (userActive == null) {
                                setUserNew({
                                    "anh": "",
                                    "cccd": "",
                                    "chucvu": "all",
                                    "cvid":"",
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
                                    "pbid":"",
                                    "sdt": ""
                                })
                            }
                        }}>Clear</button>
                        <button onClick={()=>{console.log(
                            userNew?.diaChi.split(",").pop()?.split("-")[0]
                        );
                        }}>test</button>
                    </div>
                </div>
                <div className="w-full h-[calc(100%-56px)] bg-[white] flex flex-col items-center justify-center">
                    <div id="hoverCreateAnh" className="translate-y-5 hover:bg-[red] w-20 h-20 rounded-full border border-sky-500 border-solid relative">
                        <div className="absolute bg-[#ffffff] w-full h-full top-0 rounded-full z-10 flex justify-center items-center">
                            <Avatar size={80} url={`${testImg}`} />
                        </div>
                        <div id="createAnh" className="z-50 absolute w-full h-full bg-opacity-90 bg-[#ffffff] rounded-full hidden ">
                            <input type="file" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="w-[80%] h-[90%] rounded-lg border-solid border-2 border-sky-500 p-6 ">
                        <div className="w-full flex flex-col h-fit mb-4  items-center">
                            <input
                                id="hoTen"
                                type="text"
                                value={userNew?.hoTen}
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
                                        value={userNew?.cccd}
                                        maxLength={12}
                                        onChange={(e) => { onChangeNewUser(e) }}
                                        className="inline-block font-medium bg-[#bcbcbc] px-1" />
                                </div>
                                <div className="py-2 flex flex-col">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input
                                        id="sdt"
                                        type="text"
                                        value={userNew?.sdt}
                                        maxLength={10}
                                        onChange={(e) => { onChangeNewUser(e) }}
                                        className="inline-block font-medium bg-[#bcbcbc] px-1" />
                                </div>
                                <div className="py-2 flex flex-col">
                                    <label htmlFor="">Email</label>
                                    <input
                                        id="email"
                                        type="text"
                                        value={userNew?.email}
                                        onChange={(e) => { onChangeNewUser(e) }}
                                        className="inline-block font-medium bg-[#bcbcbc] px-1" />
                                </div>
                                <div className="py-2 flex flex-col">
                                    <label htmlFor="">Giới tính</label>
                                    <select
                                        id="gioiTinh"
                                        value={userNew?.gioiTinh}
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
                                            onClickDay={(v, event) => setShowDate(false)}

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
                                        value={userNew?.maNhanVien}
                                    />
                                </div>
                                <div className="py-2 flex flex-col">
                                    <label htmlFor="">Vị trí (chức vụ)</label>
                                    <select
                                        id="viTri"
                                        value={userNew?.cvid}
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
                                        value={userNew?.pbid}
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
                                    <select 
                                    id="provice" 
                                    // value={  userNew?.diaChi.split(",").pop()?.split("-")[0]}
                                    value={proviceCurrent}
                                    className="inline-block font-medium bg-[#bcbcbc] mb-2" 
                                    onChange={(e) => {
                                        setProvinceCurrent(e.target.value)
                                        onChangeNewUser(e)
                                    }}
                                    >
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
                                    <select id="commune" className="inline-block font-medium bg-[#bcbcbc] mb-2" onChange={(e) => {
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

export default CreateNewUser;
