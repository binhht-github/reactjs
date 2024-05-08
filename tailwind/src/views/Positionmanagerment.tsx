import React, { useEffect, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { createChucVu, getChucVu, updateChucVu } from '../api/ChucVuApi';

interface IChuVu {
  maChucVu: string,
  tenChucVu: string,
  moTa: string,
  mucluongCoBan: number,
  heSoLuong: number
}
function Positionmanagerment() {

  const [isActiveModel, setIsActiveModel] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<IChuVu | null>(null)
  const [current, setCurrent] = useState<IChuVu | null>(null)
  const [chucVu, setChucVu] = useState<IChuVu[]>([]);

  useEffect(() => {
    getChucVu().then((res) => {
      setChucVu(res);
    })
  }, [])


  const handleChange = (event: any) => {
    console.log(event.target.value);

    if (event.target.id == "maChucVu") {

      setCurrent({
        maChucVu: event.target.value.toUpperCase(),
        tenChucVu: current?.tenChucVu!,
        moTa: current?.moTa!,
        mucluongCoBan: current?.mucluongCoBan!,
        heSoLuong: current?.heSoLuong!
      })
    }
    if (event.target.id == "tenChucVu") {
      setCurrent({
        maChucVu: current?.maChucVu!,
        tenChucVu: event.target.value,
        moTa: current?.moTa!,
        mucluongCoBan: current?.mucluongCoBan!,
        heSoLuong: current?.heSoLuong!
      })
    }
    if (event.target.id == "mucluongCoBan") {
      setCurrent({
        maChucVu: current?.maChucVu!,
        tenChucVu: current?.tenChucVu!,
        moTa: current?.moTa!,
        mucluongCoBan: event.target.value,
        heSoLuong: current?.heSoLuong!
      })
    }
    if (event.target.id == "heSoLuong") {
      setCurrent({
        maChucVu: current?.maChucVu!,
        tenChucVu: current?.tenChucVu!,
        moTa: current?.moTa!,
        mucluongCoBan: current?.mucluongCoBan!,
        heSoLuong: event.target.value
      })
    }
    if (event.target.id == "moTa") {
      setCurrent({
        maChucVu: current?.maChucVu!,
        tenChucVu: current?.tenChucVu!,
        moTa: event.target.value,
        mucluongCoBan: current?.mucluongCoBan!,
        heSoLuong: current?.heSoLuong!
      })
    }
  }

  const handleDetail = (item: IChuVu) => {
    setIsActiveModel(true);
    setIsActive(item);
  }
  const handleCreBtn = () => {
    setIsActive(null)
    setIsActiveModel(true)
  }
  const onHandleCre = () => {
    createChucVu(current?.maChucVu!,
      current?.tenChucVu!,
      current?.moTa!,
      current?.mucluongCoBan!,
      current?.heSoLuong!).then((res) => {
        setChucVu([...chucVu, res])
        setCurrent(null)
        setIsActiveModel(false)
      })
  }
  const onHandleUpdate = () => {
    console.log(isActive);

    updateChucVu(
      isActive?.maChucVu!,
      current?.tenChucVu ? current.tenChucVu : isActive?.tenChucVu!,
      current?.moTa ? current.moTa : isActive?.moTa!,
      current?.mucluongCoBan ? current.mucluongCoBan : isActive?.mucluongCoBan!,
      current?.heSoLuong ? current?.heSoLuong! : isActive?.heSoLuong!
    ).then((res) => {
      const index = chucVu?.findIndex((item) => item.maChucVu == res.maChucVu);
      const newArr = [...chucVu];
      newArr[index] = res;
      setChucVu(newArr);
      setCurrent(null)
      setIsActiveModel(false)
    })
  }
  const onHandleDelete = () => {
    console.log(current);
    // createPhongBan(
    //   current?.maChucVu!,
    //   current?.tenChucVu!,
    //   current?.moTa!,
    //   current?.mucluongCoBan!,
    //   heSoLuong  current?.heSoLuong!).then((res) => {
    //     setChucVu([...chucVu, res])
    //     setCurrent(null)
    //     setIsActiveModel(false)
    //   })
  }


  return (
    <div className="h-screen w-[calc(100%-240px)] flex flex-col">
      <div className="bg-white w-full h-16 flex justify-between">
        <div className="h-14 p-2">
          <h2 className="font-bold text-xl">Quản Lý Chức vụ</h2>
          <span className="text-xs">lưu trữ thông tin chức vụ trong hệ thống</span>
        </div>
        <div className=" w-[35%] flex items-center">
          <div className="w-full relative rounded-lg ">
            <input type="text" className="w-full pr-7 pl-2 h-8 rounded-lg border-[#33333351] border-solid border-2" />
            <TuneIcon className="absolute right-0 cursor-pointer p-0.5" />
          </div>
        </div>
        <div className="h-full p-2 flex justify-center items-center">
          <button className="w-full bg-[#234EEC] rounded-lg p-1 text-white mb-2" onClick={() => { handleCreBtn() }}>Tạo Chức vụ mới</button>
        </div>
      </div>
      <div className=" w-full h-full">
        <table className="table-auto w-full bg-[#86868630]">
          <thead className="border-b h-4 border-black sticky h-24">
            <tr className="h-4">
              <th className="bg-[red] w-36 bg-opacity-0">Mã chức vụ</th>
              <th className="bg-[green] w-64 bg-opacity-0">Tên chức vụ</th>
              <th className="bg-[yellow] w-auto bg-opacity-0">Mô tả</th>
              <th className="bg-[cyan] w-44 bg-opacity-50">Mức lương cơ bản</th>
              <th className="bg-[orange] w-44 bg-opacity-50">Hệ số lương</th>
              <th className="bg-[blue] w-32  bg-opacity-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {chucVu.map((item) => {
              return (
                <tr key={item.maChucVu} className=" border-b h-4 border-black">
                  <td className="bg-opacity-0 bg-[red]  text-center" >{item.maChucVu}</td>
                  <td className="bg-opacity-0 bg-[green] h-auto ">{item.tenChucVu}</td>
                  <td className="bg-opacity-0 bg-[yellow] h-auto">{item.moTa}</td>
                  <td className="bg-opacity-0 bg-[cyan]  text-center">{item.mucluongCoBan}</td>
                  <td className="bg-opacity-0 bg-[cyan]  text-center">{item.heSoLuong}</td>
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
              <label htmlFor="">{isActive?.tenChucVu!}</label>
              <span className="cursor-pointer hover:bg-[red] px-2" onClick={() => { setIsActiveModel(false) }}>x</span>
            </div>
            <div className="p-11 flex flex-col h-[calc(100%-36px)]">
              <div className=" h-[150px] flex">
                <div>
                  <div className="flex justify-between pb-1">
                    <label htmlFor="">Mã chức vụ:</label>
                    <input onChange={(e) => { handleChange(e) }} type="text" className="bg-[#8f8d8d6f]" value={isActive?.maChucVu!} name="" id="maChucVu" readOnly={isActive == null ? false : true} />
                  </div>
                  <div className="flex justify-between pb-1">
                    <label htmlFor="">Tên chức vụ:</label>
                    <input onChange={(e) => { handleChange(e) }} type="text" className="bg-[#8f8d8d6f]" value={current?.tenChucVu ? current.tenChucVu : isActive?.tenChucVu!} id="tenChucVu" />
                  </div>
                  <div className="flex justify-between pb-1">
                    <label htmlFor="">Lương cơ bản:</label>
                    <input onChange={(e) => { handleChange(e) }} value={current?.mucluongCoBan ? current.mucluongCoBan : isActive?.mucluongCoBan!} className="bg-[#8f8d8d6f]" type="number" name="" id="mucluongCoBan" />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="">hệ số lương:</label>
                    <input onChange={(e) => { handleChange(e) }} value={current?.heSoLuong ? current.heSoLuong : isActive?.heSoLuong!} className="bg-[#8f8d8d6f]" type="number" name="" id="heSoLuong" />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col pb-2 h-[100%]">
                <label htmlFor="" className="py-2">Mô tả:</label>
                <textarea onChange={(e) => { handleChange(e) }} value={isActive?.moTa!} name="" id="moTa" className="h-full p-2 bg-[#8f8d8d6f]" />
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

export default Positionmanagerment;
