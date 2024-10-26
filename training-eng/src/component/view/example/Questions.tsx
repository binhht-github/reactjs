import React, { useRef, useState } from 'react';
import Parser from 'html-react-parser';
import * as ReactDOMServer from 'react-dom/server';


interface IQuestions {
    id: number,
    cauhoi: string,
    dapan: IResult[],
    daChon: number,
    dapandung: number,
    code: string,
    type: string
}
interface IResult {
    id: number,
    dapan: string
}
{/* <span className='rounded-full border-2 border-black absolute size-full -left-[20%] top-[1%] px-2' /> */ }
const convertID = ["A", "B", "C", "D", "E", "F"];
let questionIndex = 0;
function Questions(props: any) {
    const [questions, setQuestions] = useState<IQuestions[]>(questionsArray)
    const selectQuestions = (event: any, selectQuestions: number, questionNumber: number) => {
        console.log("Cay hoi id: ", questionNumber, " Dap an da chon: ", convertID[selectQuestions - 1]);
        console.log(event);

    }

    // const targetRef = useRef<HTMLDivElement>(null);
    // const [isClicked, setIsClicked] = useState(false);

    // const handleClick = (e: any) => {
    //     setIsClicked(true);
    //     console.log(targetRef);

    //     if (targetRef.current) {
    //         // targetRef.current.innerHTML = "<span className='rounded-full border-2 border-black absolute size-full -left-[20%] top-[1%] px-2' >123qwe</span> ";
    //     }
    // };

    return (
        <>
            {questions.map((item, index) => {
                if (item.type == "NoLable" && item.code == props.topic.type) {
                    questionIndex++;
                    return <div key={item.id} className='grid grid-cols-result w-full '>
                        <span className=''>{questionIndex}.</span>
                        {item.dapan.map((i, idx) => {
                            return <>
                                <div><span className='cursor-pointer' onClick={(e) => { selectQuestions(e, i.id, item.id) }} ><strong className='relative'>{convertID[idx]} </strong>. {Parser(i.dapan)}</span></div>
                            </>
                        })}

                    </div>

                }
                if (item.type == "Lable" && item.code == props.topic.type) {
                    questionIndex++;
                    return <div key={item.id} className='py-1'>
                        <div className='flex'>
                            <div>
                                <span className=''>{questionIndex}. </span>
                            </div>
                            <div className='ml-3'>
                                <span  >
                                    {item.cauhoi.split("-").length > 1
                                        ?
                                        item.cauhoi.split("-").map((itemSplit, indexSplit) => { return <>{indexSplit > 0 ? "-" : ""} {itemSplit} <br /></> })
                                        :
                                        item.cauhoi}
                                </span>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 w-[calc(100%-20px)] ml-5'>
                            {item.dapan.map((i, idx) => {
                                return <>
                                    <div><span className='cursor-pointer' onClick={(e) => { selectQuestions(e, i.id, item.id) }} ><strong>{convertID[idx]}</strong>. {i.dapan}</span></div>

                                </>
                            })}

                        </div>
                    </div>
                }
            })}
        </>
    );
}

const questionsArray = [
    {
        id: 1,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "march<u><b>ed</b></u>"
            },
            {
                id: 2,
                dapan: "book<u><b>ed</b></u>"
            },
            {
                id: 3,
                dapan: "act<u><b>ed</b></u>"
            },
            {
                id: 4,
                dapan: "leap<u><b>ed</b></u>"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 2,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "<u><b>e</b></u>vent"
            },
            {
                id: 2,
                dapan: "b<u><b>e</b></u>tween"
            },
            {
                id: 3,
                dapan: "pret<u><b>e</b></u>nd"
            },
            {
                id: 4,
                dapan: "d<u><b>e</b></u>sptie"
            }
        ],
        daChon: 1,
        dapandung: 2,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 3,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "stay<u><b>ed</b></u>"
            },
            {
                id: 2,
                dapan: "shar<u><b>ed</b></u>"
            },
            {
                id: 3,
                dapan: "shout<u><b>ed</b></u>"
            },
            {
                id: 4,
                dapan: "sig<u><b>ed</b></u>"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 4,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "h<u><b>ea</b></u>t"
            },
            {
                id: 2,
                dapan: "f<u><b>ea</b></u>st"
            },
            {
                id: 3,
                dapan: "<u><b>ea</b></u>rth"
            },
            {
                id: 4,
                dapan: "p<u><b>ea</b></u>ce"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 5,
        cauhoi: 'Tim is talkiung to peter, his new classmate, in the class room - Tim: how far is it from your house to school, - Peter? Peter: "____________" - Tim: how are you. - Peter: fine thanks you',
        dapan: [
            {
                id: 1,
                dapan: "About five kilometres"
            },
            {
                id: 2,
                dapan: "A bit too old"
            },
            {
                id: 3,
                dapan: "Not too expensive"
            },
            {
                id: 4,
                dapan: " Five hourrs ago"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    },
    {
        id: 6,
        cauhoi: 'Marry often goes out with her friends at 8.30 P.M _________ ?',
        dapan: [
            {
                id: 1,
                dapan: "does she"
            },
            {
                id: 2,
                dapan: " doesn't she"
            },
            {
                id: 3,
                dapan: "didn't she"
            },
            {
                id: 4,
                dapan: "is she"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    },
    {
        id: 7,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    },
    {
        id: 8,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 9,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 10,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 11,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 12,
        cauhoi: '',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 13,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 14,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 15,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 16,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 17,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 18,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 19,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 20,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 21,
        cauhoi: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        dapan: [
            {
                id: 1,
                dapan: "Had been playing"
            },
            {
                id: 2,
                dapan: "is playing"
            },
            {
                id: 3,
                dapan: "was playing"
            },
            {
                id: 4,
                dapan: "have been playing"
            }
        ],
        daChon: 1,
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    },
]
export default Questions;
