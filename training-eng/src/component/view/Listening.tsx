import React from 'react';
import { useAudio } from '../hook/useAudio ';

function Listening() {

    return (
        <div className='w-full h-[85%] bg-gray-200 flex flex-col  justify-center items-center'>
            <div>
                {/* <audio src="K:\Loacal Disk H\reactjs\training-eng\public\audio\I Need Your Love.mp3"></audio> */}
                =======================================
            </div>
            <div className='grid min-w-[33.33%] w-fit grid-cols-2 grid-rows-2 p-4 gap-4'>
                <div className='font-bold cursor-pointer text-xl'>A đáp án A asdasd asda asd asd asd</div>
                <div className='font-bold cursor-pointer text-xl'>B đáp án B</div>
                <div className='font-bold cursor-pointer text-xl'>C đáp án C</div>
                <div className='font-bold cursor-pointer text-xl'>D đáp án D asd asd asd asd asda sda asd</div>
            </div>
        </div>
    );
}

export default Listening;
