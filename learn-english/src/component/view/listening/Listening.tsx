import React from 'react';
import AudioPlayer from '../../AudioPlayer';

function Listening() {

    return (

        <div className='w-full h-full bg-[#ecf0ef] relative flex'>
            <div className='absolute w-1/5 h-20 mt-2 bg-[#1285c3] flex items-center justify-center' style={{ borderTopRightRadius: "80px", borderBottomRightRadius: "30px" }}>
                <h2 className=' font-fontCursive text-4xl text-white'>Listening</h2>
            </div>
            <div className='w-3/12 h-full pt-24 flex flex-col items-center'>
                <div className='h-[90%] w-[70%] overflow-y-auto no-scrollbar hidden'>
                    <ul className="space-y-1">
                        {arrVoca.map((item, index) => (
                            <li
                                key={item.vocabylary}
                                className="bg-white rounded-sm text-center py-1 cursor-pointer transform transition duration-300 hover:bg-yellow-400 hover:scale-105"
                            >
                                <span className="font-fontCursive" >
                                    {item.vocabylary}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className='w-6/12 h-full relative '>
                <div className=" flex flex-col items-center mt-20">
                    <h2 className=' font-fontCursive text-5xl font-bold '>Listen and answer questions</h2>
                </div>
                <div className=" flex flex-col items-center mt-10">
                    <AudioPlayer></AudioPlayer>
                </div>
                <div className='p-5 bg-white w-full h-1/2 m-auto mt-6 rounded-tl-2xl rounded-tr-2xl absolute bottom-0'>
                    <p className=' font-fontCursive text-2xl '>
                        What time does the meeting start?
                    </p>
                    <div className='grid grid-cols-2 gap-x-2 pt-5'>
                        <div className='w-full h-20 m-1 rounded-lg bg-red-500'>
                            <div className='w-full h-full flex justify-center items-center font-fontCursive cursor-pointer'>
                                <span>9:30 AM</span>
                            </div>
                        </div>
                        <div className=' w-full h-20 m-1 rounded-lg bg-green-500'>
                            <div className='w-full h-full flex justify-center items-center font-fontCursive cursor-pointer'>
                                <span>10:00 AM</span>
                            </div>
                        </div>
                        <div className='w-full h-20 m-1 rounded-lg bg-blue-500'>
                            <div className='w-full h-full flex justify-center items-center font-fontCursive cursor-pointer'>
                                <span>10:30 AM</span>
                            </div>
                        </div>
                        <div className='w-full h-20 m-1 rounded-lg bg-yellow-500'>
                            <div className='w-full h-full flex justify-center items-center font-fontCursive cursor-pointer'>
                                <span>11:00 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-3/12 h-full pt-10 pr-10 pl-10'>
                <div className='w-full h-1/2 flex justify-center items-center'>
                    <div className='w-[90%] h-[90%] bg-slate-500 rounded-tl-[45%] rounded-tr-[45%] rounded-br-[45%] rounded-bl-[45%] bg-treeBook bg-cover bg-center '></div>

                </div>
                <div className='bg-white w-full m-auto rounded-[50px] '>
                    <img src="/img/imgListen.png" alt="" className='w-[98%]' />
                </div>
            </div>
        </div>
        // <div className='w-full h-full flex-1 bg-gray-50 flex flex-col  justify-center items-center'>
        //     <div>
        //         <AudioPlayer></AudioPlayer>
        //         {/* <audio src="K:\Loacal Disk H\reactjs\training-eng\public\audio\I Need Your Love.mp3"></audio> */}
        //         =======================================
        //     </div>
        //     <div className='grid min-w-[33.33%] w-fit grid-cols-2 grid-rows-2 p-4 gap-4'>
        //         <div className='font-bold cursor-pointer text-xl'>A đáp án A asdasd asda asd asd asd</div>
        //         <div className='font-bold cursor-pointer text-xl'>B đáp án B</div>
        //         <div className='font-bold cursor-pointer text-xl'>C đáp án C</div>
        //         <div className='font-bold cursor-pointer text-xl'>D đáp án D asd asd asd asd asda sda asd</div>
        //     </div>
        // </div>
    );
}

export default Listening;
const arrVoca = [
    {
        "id": 1,
        "vocabylary": "Father",
        "semantics": "Bố (Bố\/Bố)",
        "pronounce": "fɑːðə (dæd\/ ˈdædi)",
        "describe": "mo ta"
    },
    {
        "id": 2,
        "vocabylary": "Mother",
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
        "vocabylary": "Children",
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
        "vocabylary": "Grandmother",
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
        "vocabylary": "Grandfather",
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
        "vocabylary": "CV",
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
        "vocabylary": "advert",
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