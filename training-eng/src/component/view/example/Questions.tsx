import React, { useEffect, memo, useState } from 'react';

import Answers from './Answers';

interface IQuestions {
    id: number,
    cauhoi: string,
    dapan: IResult[],
    dapandung: number,
    code: string,
    type: string
}
interface IResult {
    id: number,
    dapan: string
}
interface ISelectAnswer {
    answer: number,
    question: number
}

let questionIndex = 0;
function Questions(props: any) {
    console.log("re-render Question");

    const [questions, setQuestions] = useState<IQuestions[]>([])

    useEffect(() => {
        setTimeout(() => {
            setQuestions([...questions, ...questionsArray.filter(item => item.code == props.topic.type)])
        }, 1000);


    }, [props.topic])

    // const selectAnswer = useCallback((answer: number, questionsID: number) => {
    //     props.setAnswer([...props.answers, { answer: answer, question: questionsID }])

    // }, [])
    const handleSelectAnswer = (answer: number, questionsID: number) => {
        props.onSelectAnswer({ answer: answer, question: questionsID })
    }

    return (
        <>

            {questions.map((item, index) => {
                if (item.cauhoi.length == 0 && item.code == props.topic.type) {
                    questionIndex++
                    return <div key={item.id} className='grid grid-cols-result w-full '>

                        <span className=''>{questionIndex}.</span>
                        <Answers list={item.dapan} questionID={item.id} onSelectAnswer={handleSelectAnswer}></Answers>
                    </div>

                }
                if (item.cauhoi.length > 0 && item.code == props.topic.type) {
                    questionIndex++
                    return <div key={item.id} className='py-1'>
                        <div className='flex'>
                            <div>
                                <span className=''>{questionIndex}. </span>
                            </div>
                            <div className='ml-3'>
                                <div  >
                                    {item.cauhoi.split("-").length > 1
                                        ?
                                        item.cauhoi.split("-").map((itemSplit, indexSplit) => { return <span key={indexSplit}>{indexSplit > 0 ? "-" : ""} {itemSplit} <br /></span> })
                                        :
                                        item.cauhoi}
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 w-[calc(100%-20px)] ml-5'>

                            <Answers list={item.dapan} questionID={item.id} onSelectAnswer={handleSelectAnswer} />
                        </div>
                    </div>
                }
            })}
        </>
    );
}

const SomeComponent = memo((props: any) => {
    return <span className=''>{props.item}.</span>
});


// export default Questions;
export default memo(Questions);

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
        dapandung: 1,
        code: "NP-1",
        type: "Lable"

    },
]
