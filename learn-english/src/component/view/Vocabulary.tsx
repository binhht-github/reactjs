import React, { useEffect, useState } from 'react';


interface Ivocabulary {
    id: number,
    vocabylary: string,
    semantics: string,
    pronounce: string,
    describe: string,

}

function TrainingVocabulary() {

    const [vocabularys, setVocabularys] = useState<Ivocabulary[]>([])
    const [indexVocavulary, setIndexVocabulary] = useState<number>(0)
    useEffect(() => {
        var a = getRandomSubarray(arrVoca, 18);
        setVocabularys(a)
    }, [])

    function getRandomSubarray(arr: Ivocabulary[], size: number) {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            console.log(event);
            checkVocalary(event.target.value)
            event.target.value = ''
        }
    }
    const checkVocalary = (vovabulary: string) => {
        var element = document.getElementById("vocabulary")
        if (vovabulary.toLowerCase() == vocabularys[indexVocavulary].vocabylary.toLowerCase()) {
            if (element != null) {
                element.children[indexVocavulary].classList.add("success")
                element.children[indexVocavulary].classList.replace("fail", "success")
            }
        } else {
            if (element != null) {
                element.children[indexVocavulary].classList.add("fail")
                element.children[indexVocavulary].classList.replace("success", "fail")
            }
        }
        if (indexVocavulary < vocabularys.length - 1) {
            setIndexVocabulary(indexVocavulary + 1)
        }
    }

    return (
        <div className='w-full h-[90%] bg-gray-200 flex flex-col '>
            <div className='w-full flex flex-col items-center  flex-1 justify-center '>
                <span className='text-[80px]'>{vocabularys.length > 0 ? vocabularys[indexVocavulary].semantics : null}</span>
                <span className='text-[40px]'>  ( {vocabularys.length > 0 ? vocabularys[indexVocavulary].pronounce : null} )</span>
                {/* <div className='size-8 bg-iconSound bg-contain mt-2 cursor-pointer' ></div> */}
            </div>
            <div className='min-h-[50px] flex justify-center items-center'>
                <input type="text" className='w-2/5 h-full rounded-full text-center text-2xl' onKeyDown={handleKeyDown} />
            </div>
            <div className='w-full flex flex-1 mt-8 items-center justify-between flex-col'>
                <div className='w-2/5'>
                    <span> {vocabularys.length > 0 ? vocabularys[indexVocavulary].describe : null}  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, facere exercitationem aliquam repellendus vero voluptatum eaque cupiditate dolor non. Earum magnam fugiat debitis maxime ducimus totam laboriosam mollitia reiciendis voluptas!</span>
                </div>
                <div id='vocabulary' className='w-2/5 h-11 mb-4 mt-4 flex justify-center items-center '>
                    {vocabularys.map((item, index) => {
                        return <div key={index} className='size-6 rounded-full bg-gray-400 mx-1' onClick={() => { setIndexVocabulary(index) }}></div>
                    })}
                </div>
            </div>
        </div>





        // <div className='flex justify-center items-center size-full'>
        //     <div className='border border-2 border-black rounded-xl h-[90%] w-[90%] flex flex-col p-2 relative shadow-2xl bg-white'>
        //         <div className='border border-2  border-black rounded-xl  my-2  bg-[#f8c2b6] size-full relative'>
        //             <div className='w-full h-[33.33%] flex justify-center items-center'>
        //                 <span className='font-bold font-mono text-2xl '>Có  một chút  mây</span>
        //             </div>
        //             <div className='bg-[#ffffff] rounded-t-3xl h-[66.67%] pt-4 flex flex-col items-center rounded-b-xl'>
        //                 <span className='font-bold py-2'>( pɑːʃᵊli ˈklaʊdi )</span>
        //                 <input className='my-2 bg-[#A6BAC1] w-[50%] h-12 rounded-l-full px-4 rounded-r-full text-center' type="text" />
        //                 <span className=' py-4 px-2 text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
        //             </div>
        //             {/* <div className="bg-flowerTest bg-contain size-[50%] bg-size absolute bg-no-repeat -top-[15%] -left-[10%] "></div> */}
        //         </div>
        //         <div className='bg-slate-900 w-10 h-12 rounded-b-full flex justify-center items-center absolute left-[calc(50%-20px)] -top-3'>
        //             <div className='bg-white rounded-full size-4'></div>
        //         </div>
        //         <div className=' bg-[#e6b4a9] rounded-full size-[25px] flex justify-center items-center absolute right-5  top-10 cursor-pointer shadow-2xl shadow-black border'>
        //             <svg width="15px" height="15px" viewBox="0 0 100 100" version="1.1" >
        //                 <g id="27.-Sound-level-100%" stroke="none" stroke-width="20" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        //                     <g transform="translate(2.000000, 13.000000)" stroke="#222F3E" stroke-width="4">
        //                         <path d="M14.6938776,22.5306122 L40.3148433,0.922459264 C42.3951836,-0.811009183 44.0816327,-0.0311544031 44.0816327,2.6727448 L44.0816327,71.5256583 C44.0816327,74.2257828 42.3960675,75.0101488 40.3148433,73.2759438 L14.6938776,51.9183673 L2.93820977,51.9183673 C1.31548132,51.9183673 0,50.5985451 0,48.9795731 L0,25.4694065 C0,23.8463553 1.31691501,22.5306122 2.93820977,22.5306122 L14.6938776,22.5306122 Z" id="Layer-1"></path>
        //                         <path d="M69.5510204,73.6035649 C84.8232661,68.6015772 95.854109,54.2337581 95.854109,37.2895475 C95.854109,20.3499209 84.8292338,5.98529194 69.5634144,0.979591837" id="Layer-2"></path>
        //                         <path d="M63.6734694,60.2090411 C73.7987081,57.5889793 81.2768183,48.3913297 81.2768183,37.4470738 C81.2768183,26.5149964 73.8153416,17.3256402 63.7072606,14.6938776" id="Layer-3"></path>
        //                         <path d="M56.8163265,47.0204082 L56.8163265,47.0204082 C57.5110906,47.0204082 58.1889616,46.9480804 58.8428206,46.8105436 C63.2805701,45.87708 66.6122449,41.9398621 66.6122449,37.2244898 C66.6122449,32.4395808 63.1815825,28.455946 58.6457782,27.599106 C58.0531005,27.4871457 57.4415539,27.4285714 56.8163265,27.4285714" id="Layer-4"></path>
        //                     </g>
        //                 </g>
        //             </svg>
        //         </div>

        //     </div>
        // </div>
        // <div className='flex justify-center items-center flex-col h-1/3'>
        //     <div className='w-[50%] flex-col justify-center items-center flex p-4 bg-slate-200 rounded-lg'>
        //         <span className='block p-1 text-2xl font-bold '>Có một chút mây</span>
        //         <span className='block p-1'>pɑːʃᵊli ˈklaʊdi</span>
        //         <input className='m-3  w-auto text-center text-xl leading-10 ' type="text" />
        //     </div>
        // </div>
    );
}

export default TrainingVocabulary;
const arrVoca = [
    {
        "id": 1,
        "vocabylary": "Father (Dad\/ Daddy)",
        "semantics": "Bố (Bố\/Bố)",
        "pronounce": "fɑːðə (dæd\/ ˈdædi)",
        "describe": "mo ta"
    },
    {
        "id": 2,
        "vocabylary": "Mother (Mom\/Mum)",
        "semantics": "Mẹ (Mẹ\/Mẹ)",
        "pronounce": "ˈmʌðə (mɒm\/mʌm)",
        "describe": "mo ta"
    },
    {
        "id": 3,
        "vocabylary": "Son",
        "semantics": "Con trai",
        "pronounce": "sʌn",
        "describe": "mo ta"
    },
    {
        "id": 4,
        "vocabylary": "Daughter",
        "semantics": "Con gái",
        "pronounce": "ˈdɔːtə",
        "describe": "mo ta"
    },
    {
        "id": 5,
        "vocabylary": "Parent",
        "semantics": "cha mẹ",
        "pronounce": "ˈpeərᵊnt",
        "describe": "mo ta"
    },
    {
        "id": 6,
        "vocabylary": "Child (Số nhiều là Children)",
        "semantics": "Child - Children",
        "pronounce": "ʧaɪld  ˈʧɪldrən",
        "describe": "mo ta"
    },
    {
        "id": 7,
        "vocabylary": "Husband",
        "semantics": "Chồng",
        "pronounce": "ˈhʌzbənd",
        "describe": "mo ta"
    },
    {
        "id": 8,
        "vocabylary": "Wife",
        "semantics": "Vợ",
        "pronounce": "waɪf",
        "describe": "mo ta"
    },
    {
        "id": 9,
        "vocabylary": "Brother",
        "semantics": "Anh trai",
        "pronounce": "ˈbrʌðə",
        "describe": "mo ta"
    },
    {
        "id": 10,
        "vocabylary": "Sister",
        "semantics": "Em gái",
        "pronounce": "ˈsɪstə",
        "describe": "mo ta"
    },
    {
        "id": 11,
        "vocabylary": "Uncle",
        "semantics": "Chú",
        "pronounce": "ˈʌŋkᵊl",
        "describe": "mo ta"
    },
    {
        "id": 12,
        "vocabylary": "Aunt",
        "semantics": "Dì",
        "pronounce": "ɑːnt",
        "describe": "mo ta"
    },
    {
        "id": 13,
        "vocabylary": "Nephew",
        "semantics": "Cháu trai",
        "pronounce": "ˈnɛfjuː",
        "describe": "mo ta"
    },
    {
        "id": 14,
        "vocabylary": "Niece",
        "semantics": "cháu gái",
        "pronounce": "niːs",
        "describe": "mo ta"
    },
    {
        "id": 15,
        "vocabylary": "Cousin",
        "semantics": "Anh em họ",
        "pronounce": "ˈkʌzᵊn",
        "describe": "mo ta"
    },
    {
        "id": 16,
        "vocabylary": "Grandmother (Thường gọi là: Granny, grandma)",
        "semantics": "Bà (Thường gọi là: Bà, bà)",
        "pronounce": "ˈɡrænmʌðə (Thuong goi lɑː: ˈɡræni, ˈɡrænmɑː)",
        "describe": "mo ta"
    },
    {
        "id": 17,
        "vocabylary": "Granny",
        "semantics": "bà ngoại",
        "pronounce": "ˈɡræni",
        "describe": "mo ta"
    },
    {
        "id": 18,
        "vocabylary": "grandma",
        "semantics": "bà",
        "pronounce": "ˈɡrænmɑː",
        "describe": "mo ta"
    },
    {
        "id": 19,
        "vocabylary": "Grandfather (Thường gọi là: grandpa)",
        "semantics": "Ông nội (Thường gọi là: ông nội)",
        "pronounce": "ˈɡrænfɑːðə (Thuong goi lɑː: ˈɡrænpɑː)",
        "describe": "mo ta"
    },
    {
        "id": 20,
        "vocabylary": "Grandparents",
        "semantics": "ông bà",
        "pronounce": "ˈɡrænpeərᵊnt",
        "describe": "mo ta"
    },
    {
        "id": 21,
        "vocabylary": "Boyfriend",
        "semantics": "bạn trai",
        "pronounce": "ˈbɔɪfrɛnd",
        "describe": "mo ta"
    },
    {
        "id": 22,
        "vocabylary": "Girlfriend",
        "semantics": "bạn gái",
        "pronounce": "ˈɡɜːlfrɛnd",
        "describe": "mo ta"
    },
    {
        "id": 23,
        "vocabylary": "Partner",
        "semantics": "Cộng sự",
        "pronounce": "ˈpɑːtnə",
        "describe": "mo ta"
    },
    {
        "id": 24,
        "vocabylary": "Godfather",
        "semantics": "Cha đỡ đầu",
        "pronounce": "ˈɡɒdˌfɑːðə",
        "describe": "mo ta"
    },
    {
        "id": 34,
        "vocabylary": "Bright",
        "semantics": "Sáng lạng, tươi tắn",
        "pronounce": "braɪt",
        "describe": "mo ta"
    },
    {
        "id": 35,
        "vocabylary": "Breeze",
        "semantics": "Gió Nhẹ",
        "pronounce": "briːz",
        "describe": "mo ta"
    },
    {
        "id": 36,
        "vocabylary": "Clear",
        "semantics": "Thông thoáng, sặc sẽ",
        "pronounce": "klɪə",
        "describe": "mo ta"
    },
    {
        "id": 37,
        "vocabylary": "Cloudy",
        "semantics": "Nhiều mây",
        "pronounce": "ˈklaʊdi",
        "describe": "mo ta"
    },
    {
        "id": 38,
        "vocabylary": "Dry",
        "semantics": "Khô",
        "pronounce": "draɪ",
        "describe": "mo ta"
    },
    {
        "id": 39,
        "vocabylary": "Fine",
        "semantics": "Khỏe",
        "pronounce": "faɪn",
        "describe": "mo ta"
    },
    {
        "id": 40,
        "vocabylary": "Foggy",
        "semantics": "có sương mù",
        "pronounce": "ˈfɒɡi",
        "describe": "mo ta"
    },
    {
        "id": 41,
        "vocabylary": "Haze",
        "semantics": "Sương mù",
        "pronounce": "heɪz",
        "describe": "mo ta"
    },
    {
        "id": 42,
        "vocabylary": "Humid",
        "semantics": "Ẩm ướt",
        "pronounce": "ˈhjuːmɪd",
        "describe": "mo ta"
    },
    {
        "id": 43,
        "vocabylary": "Gloomy",
        "semantics": "ảm đạm",
        "pronounce": "ˈɡluːmi",
        "describe": "mo ta"
    },
    {
        "id": 44,
        "vocabylary": "Mild",
        "semantics": "Nhẹ",
        "pronounce": "maɪld",
        "describe": "mo ta"
    },
    {
        "id": 45,
        "vocabylary": "Partially cloudy",
        "semantics": "Có mây một phần:",
        "pronounce": "ˈpɑːʃᵊli ˈklaʊdi:",
        "describe": "mo ta"
    },
    {
        "id": 46,
        "vocabylary": "Overcast",
        "semantics": "U ám",
        "pronounce": "ˈəʊvəkɑːst",
        "describe": "mo ta"
    },
    {
        "id": 47,
        "vocabylary": "Sunny",
        "semantics": "Nhiều nắng",
        "pronounce": "ˈsʌni",
        "describe": "mo ta"
    },
    {
        "id": 48,
        "vocabylary": "Wet",
        "semantics": "Ướt",
        "pronounce": "wɛt",
        "describe": "mo ta"
    },
    {
        "id": 49,
        "vocabylary": "Windy",
        "semantics": "Có gió",
        "pronounce": "ˈwɪndi",
        "describe": "mo ta"
    },
    {
        "id": 50,
        "vocabylary": "blizzard",
        "semantics": "bão tuyết",
        "pronounce": "ˈblɪzəd",
        "describe": "mo ta"
    },
    {
        "id": 51,
        "vocabylary": "blustery",
        "semantics": "ồn ào",
        "pronounce": "ˈblʌstᵊri",
        "describe": "mo ta"
    },
    {
        "id": 52,
        "vocabylary": "damp",
        "semantics": "ẩm ướt",
        "pronounce": "dæmp",
        "describe": "mo ta"
    },
    {
        "id": 53,
        "vocabylary": "drizzle",
        "semantics": "mưa phùn ",
        "pronounce": "ˈdrɪzᵊl",
        "describe": "mo ta"
    },
    {
        "id": 54,
        "vocabylary": "flood",
        "semantics": "lụt",
        "pronounce": "flʌd",
        "describe": "mo ta"
    },
    {
        "id": 55,
        "vocabylary": "hail",
        "semantics": "mưa đá, gọi ..., đến từ, xuất xứ ",
        "pronounce": "heɪl",
        "describe": "mo ta"
    },
    {
        "id": 56,
        "vocabylary": "hurricane",
        "semantics": "cơn bão",
        "pronounce": "ˈhʌrɪkən",
        "describe": "mo ta"
    },
    {
        "id": 57,
        "vocabylary": "gale",
        "semantics": "cơn gió mạnh",
        "pronounce": "ɡeɪl",
        "describe": "mo ta"
    },
    {
        "id": 58,
        "vocabylary": "rain",
        "semantics": "cơn mưa",
        "pronounce": "reɪn",
        "describe": "mo ta"
    },
    {
        "id": 59,
        "vocabylary": "rainbow",
        "semantics": "cầu vồng",
        "pronounce": "ˈreɪnbəʊ",
        "describe": "mo ta"
    },
    {
        "id": 60,
        "vocabylary": "rainstorm",
        "semantics": "mưa bão",
        "pronounce": "ˈreɪnstɔːm",
        "describe": "mo ta"
    },
    {
        "id": 61,
        "vocabylary": "mist",
        "semantics": "sương mù",
        "pronounce": "mɪst",
        "describe": "mo ta"
    },
    {
        "id": 62,
        "vocabylary": "lightning",
        "semantics": "tia sét",
        "pronounce": "ˈlaɪtnɪŋ",
        "describe": "mo ta"
    },
    {
        "id": 63,
        "vocabylary": "thunder",
        "semantics": "sấm sét",
        "pronounce": "ˈθʌndə",
        "describe": "mo ta"
    },
    {
        "id": 64,
        "vocabylary": "thunderstorm",
        "semantics": "dông",
        "pronounce": "THəndərˌstôrm",
        "describe": "mo ta"
    },
    {
        "id": 65,
        "vocabylary": "shower",
        "semantics": "vòi sen",
        "pronounce": "ˈʃaʊə",
        "describe": "mo ta"
    },
    {
        "id": 66,
        "vocabylary": "snow",
        "semantics": "tuyết",
        "pronounce": "snəʊ",
        "describe": "mo ta"
    },
    {
        "id": 67,
        "vocabylary": "snowflake",
        "semantics": "bông tuyết",
        "pronounce": "ˈsnəʊfleɪk",
        "describe": "mo ta"
    },
    {
        "id": 68,
        "vocabylary": "snowstorm",
        "semantics": "bão tuyết",
        "pronounce": "ˈsnəʊstɔːm",
        "describe": "mo ta"
    },
    {
        "id": 69,
        "vocabylary": "storm",
        "semantics": "bão",
        "pronounce": "stɔːm",
        "describe": "mo ta"
    },
    {
        "id": 70,
        "vocabylary": "typhoon",
        "semantics": "cơn bão",
        "pronounce": "taɪˈfuːn",
        "describe": "mo ta"
    },
    {
        "id": 71,
        "vocabylary": "tornado",
        "semantics": "cơn lốc xoáy",
        "pronounce": "tɔːˈneɪdəʊ",
        "describe": "mo ta"
    },
    {
        "id": 72,
        "vocabylary": "weather forecast",
        "semantics": "dự báo thời tiết:",
        "pronounce": "ˈwɛðə ˈfɔːkɑːst:",
        "describe": "mo ta"
    },
    {
        "id": 73,
        "vocabylary": "downpour",
        "semantics": "trận mưa như trút nước",
        "pronounce": "ˈdaʊnpɔː",
        "describe": "mo ta"
    },
    {
        "id": 74,
        "vocabylary": "rainfall",
        "semantics": "lượng mưa",
        "pronounce": "ˈreɪnfɔːl",
        "describe": "mo ta"
    },
    {
        "id": 75,
        "vocabylary": "torrential rain",
        "semantics": "mưa xối xả",
        "pronounce": "tôˈren(t) reɪn",
        "describe": "mo ta"
    },
    {
        "id": 76,
        "vocabylary": "CV (viết tắt của curriculum vitae)",
        "semantics": "CV (viết tắt của sơ yếu lý lịch)",
        "pronounce": "siː-viː   ( kəˌrik(y)ələm ˈvēˌtī )",
        "describe": "mo ta"
    },
    {
        "id": 77,
        "vocabylary": "Application form",
        "semantics": "Đơn đăng ký",
        "pronounce": "ˌæplɪˈkeɪʃᵊn fɔːm",
        "describe": "mo ta"
    },
    {
        "id": 78,
        "vocabylary": "Interview",
        "semantics": "Phỏng vấn",
        "pronounce": "ˈɪntəvjuː",
        "describe": "mo ta"
    },
    {
        "id": 79,
        "vocabylary": "Job",
        "semantics": "Công việc",
        "pronounce": "ʤɒb",
        "describe": "mo ta"
    },
    {
        "id": 80,
        "vocabylary": "Career",
        "semantics": "Sự nghiệp",
        "pronounce": "kəˈrɪə",
        "describe": "mo ta"
    },
    {
        "id": 81,
        "vocabylary": "Part time",
        "semantics": "Bán thời gian",
        "pronounce": "pɑːt taɪm",
        "describe": "mo ta"
    },
    {
        "id": 82,
        "vocabylary": "Full time",
        "semantics": "Toàn thời gian",
        "pronounce": "fʊl taɪm",
        "describe": "mo ta"
    },
    {
        "id": 83,
        "vocabylary": "Permanent",
        "semantics": "Vĩnh viễn",
        "pronounce": "ˈpɜːmənənt",
        "describe": "mo ta"
    },
    {
        "id": 84,
        "vocabylary": "Temporary",
        "semantics": "Tạm thời",
        "pronounce": "ˈtɛmpᵊrᵊri",
        "describe": "mo ta"
    },
    {
        "id": 85,
        "vocabylary": "Appointment",
        "semantics": "Cuộc hẹn",
        "pronounce": "əˈpɔɪntmənt",
        "describe": "mo ta"
    },
    {
        "id": 86,
        "vocabylary": "Ad or advert",
        "semantics": "Quảng cáo hoặc quảng cáo",
        "pronounce": "æd ɔːr ˈædvɜːt",
        "describe": "mo ta"
    },
    {
        "id": 87,
        "vocabylary": "Contract",
        "semantics": "Hợp đồng",
        "pronounce": "ˈkɒntrækt",
        "describe": "mo ta"
    },
    {
        "id": 88,
        "vocabylary": "Notice period",
        "semantics": "Thời gian thông báo",
        "pronounce": "ˈnəʊtɪs ˈpɪəriəd",
        "describe": "mo ta"
    },
    {
        "id": 89,
        "vocabylary": "Holiday entitlement",
        "semantics": "Quyền nghỉ lễ",
        "pronounce": "ˈhɒlədeɪ ɪnˈtaɪtᵊlmənt",
        "describe": "mo ta"
    },
    {
        "id": 90,
        "vocabylary": "Sick pay",
        "semantics": "Lương ốm đau",
        "pronounce": "sɪk peɪ",
        "describe": "mo ta"
    },
    {
        "id": 91,
        "vocabylary": "Holiday pay",
        "semantics": "Lương nghỉ lễ",
        "pronounce": "ˈhɒlədeɪ peɪ",
        "describe": "mo ta"
    },
    {
        "id": 92,
        "vocabylary": "Overtime",
        "semantics": "Làm thêm giờ",
        "pronounce": "ˈəʊvətaɪm",
        "describe": "mo ta"
    }
];
