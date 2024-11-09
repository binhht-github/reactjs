import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavigationBar() {
    const [navigationIndex, setNavigationIndex] = useState<Number>(1);
    const navigatiorCount = 5;
    const navigate = useNavigate();
    return (
        <div className='h-[10%] w-full flex relative'>
            <div className='flex-1 z-50 flex flex-col h-full min-w-32 ' onClick={() => { navigate('/vocabulary'); setNavigationIndex(1) }}>
                <div className=' h-1/2  bg-iconVocabulary bg-contain bg-no-repeat bg-center mt-2'></div>
                <div className='text-center m-auto font-bold'>
                    Vocabulary
                </div>
            </div>
            <div className='flex-1  z-50 flex flex-col h-full min-w-32' onClick={() => { navigate('/reading'); setNavigationIndex(2) }}>
                <div className=' h-1/2  bg-iconReading bg-contain bg-no-repeat bg-center mt-2'></div>
                <div className='text-center m-auto font-bold'>
                    Reading
                </div>
            </div>
            <div className='flex-1  z-50 flex flex-col h-full min-w-32' onClick={() => { navigate('/listening'); setNavigationIndex(3) }}>
                <div className=' h-1/2  bg-iconHeadphone bg-contain bg-no-repeat bg-center mt-2'></div>
                <div className='text-center m-auto font-bold'>
                    Listening
                </div>
            </div>
            <div className='flex-1  z-50 flex flex-col h-full min-w-32' onClick={() => { navigate('/grammar'); setNavigationIndex(4) }}>
                <div className=' h-1/2  bg-iconReading bg-contain bg-no-repeat bg-center mt-2'></div>
                <div className='text-center m-auto font-bold'>
                    Grammar
                </div>
            </div>
            <div className='flex-1  z-50 flex flex-col h-full min-w-32' onClick={() => { navigate('/example'); setNavigationIndex(5) }}>
                <div className=' h-1/2  bg-iconExample bg-contain bg-no-repeat bg-center mt-2'></div>
                <div className='text-center m-auto font-bold'>
                    Example
                </div>
            </div>
            <div className='flex-1 flex flex-col h-full min-w-32 max-w-full absolute bg-[#24bdfab6] rounded-lg' style={{ left: `calc(((100%/${navigatiorCount})*${navigationIndex})  -  ((100%/${navigatiorCount})/2) - 64px )` }}></div>  {/*  left: `calc(25% * ${navigationIndex} - (25% /2) - 64px)` */}

        </div >
    );
}

export default NavigationBar;
