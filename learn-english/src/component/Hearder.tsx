import React, { useState } from 'react';
import { NavigationRouter } from '../router';
import { useNavigate } from 'react-router-dom';

function Hearder() {
    const [navigationIndex, setNavigationIndex] = useState<Number>(0);
    const navigate = useNavigate();
    return (
        <div className='w-full h-12 bg-[#2ea4c9] flex justify-between items-center'>
            <div className='w-1/6 text-center font-fontFamily text-white font-bold text-4xl cursor-pointer'
                onClick={() => { navigate(`/`); setNavigationIndex(0) }}
            >English</div>
            <div className='w-4/6 font-fontFamily flex justify-center'>
                <ul className=" flex justify-center relative w-fit ">
                    {NavigationRouter.map((item, index) => (
                        <li
                            key={item.title}
                            onClick={() => { navigate(`${item.router}`); setNavigationIndex(index) }}
                            className="min-w-24 text-center mx-1 px-2 cursor-pointer transform transition duration-300 hover:bg-yellow-400 hover:scale-105"
                        >
                            <span className="text-white  text-center" >
                                {item.title}
                            </span>
                        </li>
                    ))}
                    <span className='bg-white h-[1px] w-10 pb-1 absolute -bottom-1 left' style={{ left: `calc((35px + (96px * ${navigationIndex})) + (${navigationIndex} * 8px)) ` }}  ></span>
                </ul>
            </div>
            <div className='w-1/6 text-center'>
                <div className=' flex w-fit float-right px-5 justify-center items-center'>
                    <span className='font-fontFamily text-white'>bình hoàng</span>
                    <div className='size-10  bg-red-600 rounded-full ml-3'>
                        <img className='size-full rounded-full' src="https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hearder;
