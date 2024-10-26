import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { isAction } from 'redux';
import { getAllNhanVienByProject, getAllNhanVienNotProject } from '../../api/NhanVienApi';
import { addNhanVien } from '../../api/ProjectApi';

interface props {
    tenProject: string,
    id: number
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
interface INew {
    maNhanVien: string
}

function Member({ id, tenProject }: props) {
    const [isAction, setIsAction] = useState<boolean>(false)
    const [nhanviens, setNhanviens] = useState<INhanVien[]>([])
    const [list, setList] = useState<INhanVien[]>([])
    const [listNew, setListNew] = useState<INew[]>([])
    useEffect(() => {
        getAllNhanVienNotProject(id).then((res: any) => {
            setNhanviens(res.data)
        })
        getAllNhanVienByProject(id + "").then((res: any) => {
            setList(res)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const onHandleAdd = (nhanVienID: string) => {
        const checked = listNew.filter((item) => item.maNhanVien == nhanVienID);

        if (checked.length > 0) {
            const newItems = listNew.filter((item) => item.maNhanVien !== nhanVienID);
            setListNew(newItems);
            console.log("delete ");
        } else {
            console.log("add ");
            setListNew([...listNew, { maNhanVien: nhanVienID }])
            // const temp = nhanviens.filter((item) => item.maNhanVien != nhanVienID)
            // setNhanviens(temp);
        }

        console.log("add nhan vien ", listNew);

    }
    const onAddNew = () => {
        console.log(listNew);
        addNhanVien(id, listNew)
            .then((res: any) => {
                if (res.status == 201) {
                    setList([...list, res.data])
                    setListNew([])
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }
    return (
        <div className='w-full  h-full'>
            <div className="flex h-12 w-full items-center justify-between bg-[black] bg-opacity-50">
                <div className="flex h-full items-center  ">
                    <div className="pl-4">
                        {isAction ?
                            <div className='flex'>
                                <span className='text-white cursor-pointer' onClick={() => { setIsAction(false) }}>{`< back`}</span>
                                <h1 className="w-auto font-bold text-[#ffffff] pl-4">
                                    Thêm nhân viên vào dự án: {tenProject}
                                </h1>
                            </div>
                            :
                            <h1 className="w-auto font-bold text-[#ffffff]">
                                Danh sách nhân viên dự án: {tenProject}
                            </h1>
                        }
                    </div>
                </div>
            </div>

            {/* them vao du an */}
            {isAction ?
                <div className=' flex w-full max-h-[calc(100%-48px)]   p-4 flex-wrap resize-y scroll-m-0 overflow-y-scroll scroll-smooth'>
                    {nhanviens.map((item, index) => {
                        // const checked = listNew.filter((obj) => obj.id == item.maNhanVien);
                        const checked = listNew.some((obj) => {
                            if (obj.maNhanVien == item.maNhanVien) {
                                return true
                            } else {
                                return false
                            }
                        });

                        return (
                            <div key={id + item.maNhanVien + tenProject} className='w-56 p-2 border border-spacing-6 mx-4 my-2 cursor-pointer' onClick={() => { onHandleAdd(item.maNhanVien) }} style={{ boxShadow: `${checked ? "0px 0px 15px cyan" : ""}` }}>
                                <div className='w-full h-[336px] '>
                                    <img src="https://top10tphcm.com/wp-content/uploads/2023/02/gai-dep-nhat-viet-nam-6.jpg" alt="" className='h-full w-full object-cover' />
                                </div>
                                <div className='w-full h-auto text-center'>
                                    <span className='block'>{item.hoTen}</span>
                                    <span className='block'>{item.email}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                :

                <div className=' flex w-full max-h-[calc(100%-48px)]   p-4 flex-wrap resize-y scroll-m-0 overflow-y-scroll scroll-smooth'>
                    <div className='w-56 p-2 border border-spacing-6 mx-4 my-2 justify-center items-center flex'>
                        <button className='border-2 rounded-lg p-4 border-solid border-cyan-50 ' onClick={() => { setIsAction(true) }}>Tim</button>
                        {
                            listNew.length <= 0 ?
                                <></>
                                :
                                <button className='border-2 ml-2 rounded-lg p-4 border-solid border-cyan-50 ' onClick={() => {
                                    onAddNew()
                                }}>Thêm {listNew.length}</button>
                        }

                    </div>
                    {
                        list.length > 0 ?
                            list.map((item) => {
                                return (
                                    <div key={item.maNhanVien} className='w-56 p-2 border border-spacing-6 mx-4 my-2 '>
                                        <div className='w-full h-[336px] '>
                                            <img src="https://top10tphcm.com/wp-content/uploads/2023/02/gai-dep-nhat-viet-nam-6.jpg" alt="" className='h-full w-full object-cover' />
                                        </div>
                                        <div className='w-full h-auto text-center'>
                                            <span className='block'>{item.hoTen}</span>
                                            <span className='block'>{item.email}</span>
                                        </div>
                                    </div>

                                )
                            })
                            : null
                    }

                </div>
            }
        </div>
    );
}

export default Member;
