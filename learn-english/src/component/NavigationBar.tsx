import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import { NavigationRouter } from '../router';

function NavigationBar() {
    const [navigationIndex, setNavigationIndex] = useState<Number>(0);
    const navigatiorCount = 5;
    const navigate = useNavigate();
    return (
        <div className='h-full w-1/6 flex flex-col relative overflow-y-auto  no-scrollbar  bg-gray-700'>
            <header className="bg-blue-600 text-white py-4 text-center text-xl font-bold uppercase shadow-md">
                English Learning Platform
            </header>

            <aside className="w-full h-full text-white flex flex-col p-5 shadow-md">

                <ul className="space-y-3">
                    {NavigationRouter.map((item, index) => (
                        <li
                            key={item.title}
                            onClick={() => { navigate(`${item.router}`); setNavigationIndex(index) }}
                            className="bg-teal-500 rounded-lg text-center py-3 cursor-pointer transform transition duration-300 hover:bg-yellow-400 hover:scale-105"
                        >
                            <span className="text-white font-bold" >
                                {item.title}
                            </span>
                        </li>
                    ))}
                </ul>
                {/* Footer */}

            </aside>
            <footer className="text-center text-sm text-gray-200 p-2">
                &copy; 2024 English Learning Platform
            </footer>

            <div className='w-full h-[90%] flex flex-col items-center relative hidden'>
                <div className='flex-1 cursor-pointer w-[90%]  z-50 flex  items-center min-h-11 bg-gray-50  mt-2 my-2' onClick={() => { navigate('/vocabulary'); setNavigationIndex(0) }}>
                    <div className=' size-9 bg-iconVocabulary bg-contain bg-no-repeat ml-2  '></div>
                    <div className='text-center ml-2 font-bold'>
                        Vocabulary
                    </div>
                </div>
                <div className='flex-1 cursor-pointer w-[90%] z-50 flex  items-center min-h-11 bg-gray-50  mt-2 my-2' onClick={() => { navigate('/reading'); setNavigationIndex(1) }}>
                    <div className='size-10  bg-iconReading bg-contain bg-no-repeat  ml-2'></div>
                    <div className='text-center ml-2 font-bold'>
                        Reading
                    </div>
                </div>
                <div className='flex-1 cursor-pointer w-[90%] z-50 flex  items-center min-h-11 bg-gray-50  mt-2 my-2' onClick={() => { navigate('/listening'); setNavigationIndex(2) }}>
                    <div className='size-10  bg-iconHeadphone bg-contain bg-no-repeat  ml-2'></div>
                    <div className='text-center ml-2 font-bold'>
                        Listening
                    </div>
                </div>
                <div className='flex-1 cursor-pointer w-[90%] z-50 flex  items-center min-h-11 bg-gray-50  mt-2 my-2' onClick={() => { navigate('/grammar'); setNavigationIndex(3) }}>
                    <div className='size-10  bg-iconReading bg-contain bg-no-repeat  ml-2'></div>
                    <div className='text-center ml-2 font-bold'>
                        Grammar
                    </div>
                </div>
                <div className='flex-1 cursor-pointer w-[90%] z-50 flex  items-center min-h-11 bg-gray-50  mt-2 my-2' onClick={() => { navigate('/example'); setNavigationIndex(4) }}>
                    <div className='size-10 bg-iconExample bg-contain bg-no-repeat  ml-2'></div>
                    <div className='text-center ml-2 font-bold'>
                        Example
                    </div>
                </div>
                <div className='flex-1 cursor-pointer w-full  flex flex-col h-[calc(((100%)-80px)/5)] mt-2 absolute bg-green-500 ' style={{ top: `calc((100%/${navigatiorCount})*${navigationIndex}) ` }} ></div>  {/*  style={{ left: `calc(((100%/${navigatiorCount})*${navigationIndex})  -  ((100%/${navigatiorCount})/2) - 64px )` }} */}
            </div>
        </div >
    );
}

export default NavigationBar;
