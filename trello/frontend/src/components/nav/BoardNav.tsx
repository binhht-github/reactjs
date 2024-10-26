import React, { useEffect, useState } from 'react';

function BoardNav(props: any) {
    const [title, setTitle] = useState<string>("")
    useEffect(() => {
        setTitle(props.item)
    }, [props.item])
    const handleOnchange = (event: any) => {
        setTitle(event.target.value)
    }
    return (
        <div className="h-12 p-3  z-50 flex justify-between bg-opacity-40 bg-gray-500 backdrop-blur-sm items-center">
            <div>
                {/* <h2 className='font-bold text-white'>Tên Bảng</h2> */}
                <input
                    value={title}
                    className=" cursor-pointer font-bold h-[32px] px-2 py-1 rounded-lg overflow-hidden bg-opacity-0 "
                    name=""
                    id=""
                    onChange={handleOnchange}
                    onFocus={(event) => {
                        console.log("focus");
                        event.target.style.background = "white"
                        event.target.style.cursor = "auto"
                    }}
                    onBlur={(event) => {
                        event.target.style.background = "transparent"
                        event.target.style.cursor = "pointer"
                    }}
                    style={{ background: "transparent", width: `${18 + title.length * 9}px`, maxWidth: "256px" }}
                ></input>
            </div>
            <div>
                <div className=' flex relative'>
                    <div className='relative -mr-1 border rounded-full border-black'>
                        <img className='size-8 rounded-full bg-cover' src="https://i.pinimg.com/564x/f7/a5/48/f7a5489830eef765b2ba8bc77f66e25d.jpg" alt="" />
                        <div className='absolute border-2 border-opacity-25 -bottom-[2px] right-0 size-3 rounded-full bg-[#2ff82f]' />
                    </div>
                    <div className='relative -mr-1 border rounded-full border-black'>
                        <img className='size-8 rounded-full bg-cover' src="https://i.pinimg.com/564x/f7/a5/48/f7a5489830eef765b2ba8bc77f66e25d.jpg" alt="" />
                        <div className='absolute border-2 border-opacity-25 -bottom-[2px] right-0 size-3 rounded-full bg-[#2ff82f]' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardNav;
