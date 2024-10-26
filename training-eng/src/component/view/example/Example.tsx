import React, { useState } from 'react';
import Parser from 'html-react-parser';
import Topic from './Topic';


{/*
    Ngữ âm   pronuncaiton  =  NA   4q
    từ đồng nghĩa/trái nghĩa = DNTN  4q
    hoàn thành câu = HTCH  20q
    hoàn thành đoạn văn = HTDV 5q
    tìm lỗi sai = TLS   3q
    hoàn thành câu giao tiếp = GT  4q
   */}
function Example() {
    return (
        <div className='w-full h-[85%] bg-gray-200 flex flex-col justify-center items-center ' >
            <div className='container_custom h-full overflow-y-auto  no-scrollbar py-5'>
                <div className='w-full h-fit min-h-[1000px]  p-20 bg-white' >
                    <div className='flex w-full h-fit'>
                        <div className='w-1/3  flex flex-col items-start'>
                            <span className='font-bold text-xl'>Trườn: THPT TAM DƯƠNG II</span>
                            <span className='font-bold text-xl'>Họ tên: Hoàng Thanh Bình</span>
                        </div>
                        <div className='w-2/3  flex flex-col items-center pl-6'>
                            <span className='font-bold text-xl text-center '>KỲ THI TUYỂN SINH VÀO LỚP 10 THPT  NĂM HỌC 2023-2024  <span className='font-bold text-xl'>tỉnh VĨNH PHÚC</span></span>
                            <span>Thời gian còn lại : 60 phút</span>
                            <span className='font-bold'>Mã đề thi: 468</span>
                        </div>
                    </div>
                    <span className='w-[80%] mx-auto my-4 h-[1px] bg-black block'></span>

                    <Topic></Topic>
                    <div className='w-full hidden'>
                        {/* phat am questions */}
                        <div className='w-full h-fit'>
                            <div className='w-full '>
                                <label htmlFor="" className='font-bold decoration-'>Mark the letter A, B, C, or D on your answer sheet to indicate ther word whose inderlined part differs from ther other three in pronuncaiton in each of ther floowing question</label>
                                <div className='grid grid-cols-result w-full '>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>D. lfghfgheap<b><u>ed</u></b></span>
                                </div>
                                <div className='grid grid-cols-result w-full '>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>D. lfghfgheap<b><u>ed</u></b></span>
                                </div>
                                <div className='grid grid-cols-result w-full '>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>D. lfghfgheap<b><u>ed</u></b></span>
                                </div>
                                <div className='grid grid-cols-result w-full '>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>D. lfghfgheap<b><u>ed</u></b></span>
                                </div>

                            </div>
                        </div>
                        {/* tru trai nghia questions */}
                        <div className='w-full h-fit'>
                            <div className='w-full bg-blue-200'>
                                <label htmlFor="" className='font-bold decoration-'>Mark the letter A, B, C, or D on your answer sheet to indicate ther word whose inderlined part differs from ther other three in pronuncaiton in each of ther floowing question</label>
                                <div className='grid grid-cols-result w-full bg-green-200'>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>D. lfghfgheap<b><u>ed</u></b></span>
                                </div>
                                <div className='grid grid-cols-result w-full bg-green-200'>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>D. lfghfgheap<b><u>ed</u></b></span>
                                </div>
                                <div className='grid grid-cols-result w-full bg-green-200'>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>D. lfghfgheap<b><u>ed</u></b></span>
                                </div>
                                <div className='grid grid-cols-result w-full bg-green-200'>
                                    <span className=''>1.</span>
                                    <span className='cursor-pointer'>A. march<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>B. book<b><u>ed</u></b></span>
                                    <span className='cursor-pointer'>C. act<b><u>ed</u></b></span>
                                    {/* <span className='cursor-pointer'>D. {text3.substring(0, text3.indexOf("."))}<u><b>{text3.substring(text3.indexOf(".") + 1, text3.lastIndexOf("."))}</b></u>{text3.substring(text3.lastIndexOf(".") + 1, text3.length)}</span> */}
                                </div>

                            </div>
                        </div>
                        {/* ngu phap questions */}
                        <div className='w-full '>
                            <div className='w-full bg-yellow-200 mt-4'>
                                <label htmlFor="" className='font-bold pt-9'>Mark the letter A, B, C, or D on your answer sheet to indicate the correct anser to ech of the following qustions.</label>
                                <div >
                                    <div className='flex'>
                                        <div>
                                            <span className=''> 5.</span>
                                        </div>
                                        <div className='ml-3'>
                                            <span  >
                                                Tim is talkiung to peter, his new classmate, in the class room <br />
                                                - Tim: how far is it from your house to school, Peter?<br />
                                                - Peter: "____________"
                                            </span>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-4 w-[calc(100%-20px)] ml-5'>
                                        <span >A. About five kilometres</span>
                                        <span >B. A bit too old</span>
                                        <span >C. Not too expensive</span>
                                        <span >D. Five hourrs ago</span>
                                    </div>
                                </div>
                                <div >
                                    <div className='flex'>
                                        <div>
                                            <span className=''> 5.</span>
                                        </div>
                                        <div className='ml-3'>
                                            <span  >
                                                Tim is talkiung to peter, his new classmate, in the class room <br />
                                                - Tim: how far is it from your house to school, Peter?<br />
                                                - Peter: "____________"
                                            </span>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-4 w-[calc(100%-20px)]  ml-5'>
                                        <span >A. About five kilometres</span>
                                        <span >B. A bit too old</span>
                                        <span >C. Not too expensive</span>
                                        <span >D. Five hourrs ago</span>
                                    </div>
                                </div>
                                <div >
                                    <div className='flex'>
                                        <div>
                                            <span className=''> 5.</span>
                                        </div>
                                        <div className='ml-3'>
                                            {/* <span  >
                                                {text.split("-").map((textItem, index) => {
                                                    return <span key={index} className='block'>{index > 0 ? "-" : ""}{textItem}</span>
                                                })}
                                            </span> */}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-4 w-[calc(100%-20px)]  ml-5'>
                                        <span >A. About five kilometres</span>
                                        <span >B. A bit too old</span>
                                        <span >C. Not too expensive</span>
                                        <span >D. Five hourrs ago</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Example;
