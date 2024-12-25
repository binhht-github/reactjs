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
    let countFaill = 0;
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
            if (checkVocalary(event.target.value)) {
                event.target.value = ''
                event.target.classList.remove("faill");
                event.target.classList.remove("faill-animation");
            } else {
                countFaill++;
                if (countFaill == 5) {
                    console.log("mist");
                }
                event.target.classList.add("faill");
                event.target.classList.add("faill-animation");
                event.target.addEventListener('animationend', function () {
                    event.target.classList.remove('faill-animation');
                });
            }

        }
    }
    const checkVocalary = (vovabulary: string) => {
        // var element = document.getElementById("vocabulary")
        console.log(indexVocavulary, " ", vocabularys.length - 5);

        if (indexVocavulary == (vocabularys.length / 1.5)) {
            var a = getRandomSubarray(arrVoca, 18);
            setVocabularys([...vocabularys, ...a])
        }
        if (vovabulary.toLowerCase() == vocabularys[indexVocavulary].vocabylary.toLowerCase()) {
            console.log(true);
            setIndexVocabulary(indexVocavulary + 1)
            return true;
        } else {
            console.log(false);
            return false;
        }

    }

    return (
        <div className='w-full h-full bg-[#ecf0ef] relative flex'>
            <div className='absolute w-1/5 h-20 mt-2 bg-[#1285c3] flex items-center justify-center' style={{ borderTopRightRadius: "80px", borderBottomRightRadius: "30px" }}>
                <h2 className=' font-fontFamily text-4xl text-white'>Vocabulary</h2>
            </div>
            <div className='w-1/3 h-full pt-24 flex flex-col items-center'>
                <h3 className='font-fontFamily py-2'>New Vocabulary</h3>
                <div className='h-[90%] w-[70%] overflow-y-auto no-scrollbar'>
                    <ul className="space-y-1">
                        {arrVoca.map((item, index) => (
                            <li
                                key={item.vocabylary}
                                className="bg-white rounded-sm text-center py-1 cursor-pointer transform transition duration-300 hover:bg-yellow-400 hover:scale-105"
                            >
                                <span className="font-fontFamily" >
                                    {item.vocabylary}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className='w-1/3 h-full '>
                <div className=" flex flex-col items-center mt-20">
                    <h2 className=" font-fontFamily text-5xl">{vocabularys.length > 0 && vocabularys[indexVocavulary].semantics}</h2>
                    <p className="my-4">
                        <strong>Phát âm:</strong> {vocabularys.length > 0 && vocabularys[indexVocavulary].pronounce}
                    </p>
                    <input
                        type="text"
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập từ cần tra cứu..."
                        className="flex-1 px-4 py-2 w-[95%] border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                </div>
                <div className='p-5 bg-white w-[95%] m-auto mt-5 rounded-lg '>
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, facere exercitationem aliquam repellendus vero voluptatem eaque cupiditate dolor non.
                    </p>
                    <div>
                        <p> Ví dụ sử dụng từ trong câu:</p>
                        <p className="mb-4">
                            He updated his CV before applying for the new job.
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-1/3 h-full'>
            </div>
        </div>

        // <div className="w-full flex-1 p-10 bg-white border-l-4 border-teal-500 rounded-lg m-5 shadow-xl border">
        //     <h2 className="text-4xl text-blue-600 mb-4">{vocabularys.length > 0 && vocabularys[indexVocavulary].semantics}</h2>
        //     <p className="mb-4">
        //         <strong>Phát âm:</strong> {vocabularys.length > 0 && vocabularys[indexVocavulary].pronounce}
        //     </p>

        //     {/* Search Box */}
        //     <div className="flex mb-4">
        //         <input
        //             type="text"
        //             onKeyDown={handleKeyDown}
        //             placeholder="Nhập từ cần tra cứu..."
        //             className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
        //         />

        //     </div>

        //     <p className="mb-4">
        //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, facere exercitationem aliquam repellendus vero voluptatem eaque cupiditate dolor non.
        //     </p>

        //     <p className="mb-4">
        //         Ví dụ sử dụng từ trong câu: "He updated his CV before applying for the new job."
        //     </p>


        // </div>
    );
}

export default TrainingVocabulary;
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
