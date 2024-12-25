import React from 'react';

function Customer() {
    return (
        <div className='w-screen h-screen'>
            <div className="fixed w-full h-full bg-gradient-to-b from-[#193957] to-white">

            </div>
            <div className='w-full h-full relative '>
                <div className='fixed w-full h-full  flex justify-center items-center bg-test bg-contain opacity-10' style={{
                    backgroundSize: "100% 100%"
                }}> </div>
                <div className='w-full h-full flex flex-col items-center'>
                    <div className='text-center '>
                        <h1 className='text-4xl'>english <br /> listening practice</h1>
                    </div>
                    <div>
                        <h1>asdasd</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer;
