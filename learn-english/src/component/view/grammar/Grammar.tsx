import React from 'react';

function Grammar() {
    return (
        <div className='w-full h-full bg-[#ecf0ef] relative flex'>

            <div className=' absolute w-1/5 h-20 mt-2 bg-[#1285c3] flex items-center justify-center' style={{ borderTopRightRadius: "80px", borderBottomRightRadius: "30px" }}>
                <h2 className=' font-fontCursive text-4xl text-white'>Grammar</h2>
            </div>
            <div className='w-1/4 h-full flex justify-end items-end '>
                <div className='w-full h-2/3 bg-gray-400 flex ' style={{ borderTopLeftRadius: "80px", borderTopRightRadius: "80%" }}>
                    <img src="/img/imgStudy2.png" alt="" className='w-[100vh]' />
                </div>
            </div>
            <div className='w-1/2 h-full m-auto '>

            </div>
            <div className=' w-1/4 h-full  pt-5 flex flex-col items-center justify-end'>
                <div className=' relative w-full h-[5vw] bg-orange-500  flex  items-end' style={{ borderTopLeftRadius: "5vw", borderTopRightRadius: "5vw" }}>
                    <img src="/img/imgStudy.png" alt="" className='absolute w-[100vw] ' />
                </div>
            </div>
        </div>
    );
}

export default Grammar;
<h1>Grammar</h1>