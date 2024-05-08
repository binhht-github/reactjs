import React, { useEffect, useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import { createPhongBan, getPhongBan, updatePhongBan } from "../api/PhongBanApi";


interface IPhongBan {
  maPhongBan: string,
  tenPhongBan: string,
  moTa: string,
  truongPhong: string,
  type: string
}
function DepartmentManagement() {

  const [isActiveModel, setIsActiveModel] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<IPhongBan | null>(null)
  const [current, setCurrent] = useState<IPhongBan | null>(null)
  const [phongBans, setPhongBans] = useState<IPhongBan[]>([]);

  useEffect(() => {
    getPhongBan().then((res) => {
      console.log(res);

      setPhongBans(res);
    })
  }, [])


  const handleChange = (event: any) => {
    if (event.target.id == "maPhongBan") {

      setCurrent({
        maPhongBan: event.target.value.toUpperCase(),
        tenPhongBan: current?.tenPhongBan!,
        moTa: current?.moTa!,
        truongPhong: current?.truongPhong!,
        type: current?.type!
      })
    }
    if (event.target.id == "tenPhongBan") {
      setCurrent({
        maPhongBan: current?.maPhongBan!,
        tenPhongBan: event.target.value,
        moTa: current?.moTa!,
        truongPhong: current?.truongPhong!,
        type: current?.type!
      })
    }
    if (event.target.id == "truongPhong") {
      setCurrent({
        maPhongBan: current?.maPhongBan!,
        tenPhongBan: current?.tenPhongBan!,
        moTa: current?.moTa!,
        truongPhong: event.target.value,
        type: current?.type!
      })
    }
    if (event.target.id == "moTa") {
      setCurrent({
        maPhongBan: current?.maPhongBan!,
        tenPhongBan: current?.tenPhongBan!,
        moTa: event.target.value,
        truongPhong: current?.truongPhong!,
        type: current?.type!
      })
    }
  }

  const handleDetail = (item: IPhongBan) => {
    setIsActiveModel(true);
    setIsActive(item);
  }
  const handleCreBtn = () => {
    setIsActive(null)
    setIsActiveModel(true)
  }
  const onHandleCre = () => {
    console.log(current);
    createPhongBan(
      current?.maPhongBan!,
      current?.tenPhongBan!,
      current?.moTa!,
      current?.truongPhong!,
      current?.type!).then((res) => {
        setPhongBans([...phongBans, res])
        setCurrent(null)
        setIsActiveModel(false)
      })
  }
  const onHandleUpdate = () => {
    updatePhongBan(
      isActive?.maPhongBan!,
      current?.tenPhongBan! ? current?.tenPhongBan! : isActive?.tenPhongBan!,
      current?.moTa! ? current?.moTa! : isActive?.moTa!,
      current?.truongPhong! ? current?.truongPhong! : isActive?.truongPhong!,
      isActive?.type!).then((res) => {
        const index = phongBans?.findIndex((item) => item.maPhongBan == res.maPhongBan);
        const newArr = [...phongBans];
        newArr[index] = res;
        setPhongBans(newArr);
        setCurrent(null)
        setIsActiveModel(false)
      })
  }
  const onHandleDelete = () => {
    console.log(current);
    createPhongBan(
      current?.maPhongBan!,
      current?.tenPhongBan!,
      current?.moTa!,
      current?.truongPhong!,
      current?.type!).then((res) => {
        setPhongBans([...phongBans, res])
        setCurrent(null)
        setIsActiveModel(false)
      })
  }


  return (
    <div className="h-screen w-[calc(100%-240px)] flex flex-col">
      <div className="bg-white w-full h-16 flex justify-between">
        <div className="h-14 p-2">
          <h2 className="font-bold text-xl">Quản Lý Bộ Phận</h2>
          <span className="text-xs">lưu trữ thông tin bộ phận trong hệ thống</span>
        </div>
        <div className=" w-[35%] flex items-center">
          <div className="w-full relative rounded-lg ">
            <input type="text" className="w-full pr-7 pl-2 h-8 rounded-lg border-[#33333351] border-solid border-2" />
            <TuneIcon className="absolute right-0 cursor-pointer p-0.5" />
          </div>
        </div>
        <div className="h-full p-2 flex justify-center items-center">
          <button className="w-full bg-[#234EEC] rounded-lg p-1 text-white mb-2" onClick={() => { handleCreBtn() }}>Tạo bộ phận mới</button>
        </div>
      </div>
      <div className=" w-full h-full">
        <table className="table-auto w-full bg-[#86868630]">
          <thead className="border-b h-4 border-black sticky h-24">
            <tr className="h-4">
              <th className="bg-[red] w-36 bg-opacity-0">Mã phòng ban</th>
              <th className="bg-[green] w-64 bg-opacity-0">Tên phòng ban</th>
              <th className="bg-[yellow] w-auto bg-opacity-0">Mô tả</th>
              <th className="bg-[cyan] w-32 bg-opacity-0">Trưởng phòng</th>
              <th className="bg-[orange] bg-opacity-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {phongBans.map((item) => {
              return (
                <tr key={item.maPhongBan} className=" border-b h-4 border-black">
                  <td className="bg-opacity-0 bg-[red]  text-center" >{item.maPhongBan}</td>
                  <td className="bg-opacity-0 bg-[green] h-auto ">{item.tenPhongBan}</td>
                  <td className="bg-opacity-0 bg-[yellow] h-auto">{item.moTa}</td>
                  <td className="bg-opacity-0 bg-[cyan]  text-center">{item.truongPhong}</td>
                  <td className="bg-opacity-0 bg-[orange] w-32 text-center"><button onClick={() => { handleDetail(item) }}>chi tiet</button></td>
                </tr>
              )
            })}



          </tbody>
        </table>
      </div>
      {isActiveModel ?
        <div className="fixed w-[calc(100%-256px)] h-full bg-[white] bg-opacity-40 flex items-center justify-center ">
          <div className="w-[50%] h-[80%] bg-[white] rounded-lg">
            <div className="flex justify-between  items-center px-3 h-9 w-full bg-[#5d5c5c7e] rounded-t-lg">
              <label htmlFor="">{isActive?.tenPhongBan!}</label>
              <span className="cursor-pointer hover:bg-[red] px-2" onClick={() => { setIsActiveModel(false) }}>x</span>
            </div>
            <div className="p-11 flex flex-col h-[calc(100%-36px)]">
              <div className=" h-[150px] flex">
                <div>
                  <div className="flex justify-between pb-1">
                    <label htmlFor="">Mã Phòng Ban:</label>
                    <input onChange={(e) => { handleChange(e) }} type="text" className="bg-[#8f8d8d6f]" value={isActive?.maPhongBan!} name="" id="maPhongBan" readOnly={isActive == null ? false : true} />
                  </div>
                  <div className="flex justify-between pb-1">
                    <label htmlFor="">Tên phòng ban:</label>
                    <input onChange={(e) => { handleChange(e) }} type="text" className="bg-[#8f8d8d6f]" value={current?.tenPhongBan ? current.tenPhongBan : isActive?.tenPhongBan!} id="tenPhongBan" />
                  </div>
                  <div className="flex justify-between pb-1">
                    <label htmlFor="">Trưởng phòng:</label>
                    <input onChange={(e) => { handleChange(e) }} value={current?.truongPhong ? current.truongPhong : isActive?.truongPhong!} className="bg-[#8f8d8d6f]" type="text" name="" id="truongPhong" />
                  </div>

                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="">type:</label>
                    <input onChange={(e) => { handleChange(e) }} value={current?.type ? current.type : isActive?.type!} className="bg-[#8f8d8d6f]" type="text" name="" id="type" />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col pb-2 h-[100%]">
                <label htmlFor="" className="py-2">Mô tả:</label>
                <textarea onChange={(e) => { handleChange(e) }} value={current?.moTa ? current.moTa : isActive?.moTa!} name="" id="moTa" className="h-full p-2 bg-[#8f8d8d6f]" />
              </div>
              <div className="w-full h-14 flex justify-center items-center">
                {isActive != null ?
                  <>
                    <button className="px-2 py-1 mx-2 bg-[#334fda] rounded-lg" onClick={onHandleUpdate}>Cập Nhật</button>
                    <button className="px-2 py-1 mx-2 bg-[#334fda] rounded-lg" >Xóa</button>
                  </>
                  :
                  <button className="px-2 py-1 bg-[#334fda] rounded-lg" onClick={() => { onHandleCre() }}>Tạo Mới</button>
                }
              </div>
            </div>
          </div>
        </div>
        : null}
    </div>
  );
}

export default DepartmentManagement;
