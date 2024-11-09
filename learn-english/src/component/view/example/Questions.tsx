import React, { useEffect, memo, useState } from 'react';

import Parser from 'html-react-parser';
import Answers from './Answers';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../../../firebase';
import { where } from 'firebase/firestore';

interface IQuestions {
    id: number,
    lable: string,
    answer: string[],
    correctAnswer: number,
    type: string,
    topic: string
}
interface ISelectAnswer {
    answer: number,
    question: number
}

let questionIndex = 0;
function Questions(props: any) {


    const [questions, setQuestions] = useState<IQuestions[]>([])

    useEffect(() => {
        const dbRef2 = ref(database, `Questions`);

        onValue(query(dbRef2, orderByChild('topic'), equalTo(`${props.topic.id}`)), (snapshot) => {
            const result: IQuestions[] = []

            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                result.push({
                    id: childData.id,
                    lable: childData.lable,
                    answer: childData.answer,
                    correctAnswer: 0,
                    type: childData.type,
                    topic: childData.topic
                })



            });


            setQuestions(result)
        }, {
            onlyOnce: true
        });


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
                if (item.lable.length == 0 && item.type == props.topic.type) {
                    questionIndex++
                    return <div key={item.id} className='grid grid-cols-result w-full '>

                        <span className=''>{questionIndex}.</span>
                        <Answers list={item.answer} questionID={item.id} onSelectAnswer={handleSelectAnswer}></Answers>
                    </div>

                }
                if (item.lable.length > 0 && item.type == props.topic.type) {
                    questionIndex++
                    return <div key={item.id} className='py-1'>
                        <div className='flex'>
                            <div>
                                <span className=''>{questionIndex}. </span>
                            </div>
                            <div className='ml-3'>
                                {/* {Parser(item.lable)} */}
                                <div  >
                                    {item.lable.split("-").length > 2
                                        ?
                                        item.lable.split("-").map((itemSplit, indexSplit) => { return <span key={indexSplit}>{indexSplit > 0 ? "-" : ""} {Parser(itemSplit)} <br /></span> })
                                        :
                                        Parser(item.lable)}
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 w-[calc(100%-20px)] ml-5'>

                            <Answers list={item.answer} questionID={item.id} onSelectAnswer={handleSelectAnswer}></Answers>
                        </div>
                    </div>
                }
            })}
        </>
    );
}



// export default Questions;
export default memo(Questions);

const questionsArray = [
    {
        id: 1,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "march<u><b>ed</b></u>"
            },
            {
                id: 2,
                answer: "book<u><b>ed</b></u>"
            },
            {
                id: 3,
                answer: "act<u><b>ed</b></u>"
            },
            {
                id: 4,
                answer: "leap<u><b>ed</b></u>"
            }
        ],
        correctAnswer: 1,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 2,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "<u><b>e</b></u>vent"
            },
            {
                id: 2,
                answer: "b<u><b>e</b></u>tween"
            },
            {
                id: 3,
                answer: "pret<u><b>e</b></u>nd"
            },
            {
                id: 4,
                answer: "d<u><b>e</b></u>sptie"
            }
        ],
        correctAnswer: 2,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 3,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "stay<u><b>ed</b></u>"
            },
            {
                id: 2,
                answer: "shar<u><b>ed</b></u>"
            },
            {
                id: 3,
                answer: "shout<u><b>ed</b></u>"
            },
            {
                id: 4,
                answer: "sig<u><b>ed</b></u>"
            }
        ],
        correctAnswer: 1,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 4,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "h<u><b>ea</b></u>t"
            },
            {
                id: 2,
                answer: "f<u><b>ea</b></u>st"
            },
            {
                id: 3,
                answer: "<u><b>ea</b></u>rth"
            },
            {
                id: 4,
                answer: "p<u><b>ea</b></u>ce"
            }
        ],
        correctAnswer: 1,
        code: "NA-1",
        type: "NoLable"

    },
    {
        id: 5,
        lable: 'Tim is talkiung to peter, his new classmate, in the class room - Tim: how far is it from your house to school, - Peter? Peter: "____________" - Tim: how are you. - Peter: fine thanks you',
        answer: [
            {
                id: 1,
                answer: "About five kilometres"
            },
            {
                id: 2,
                answer: "A bit too old"
            },
            {
                id: 3,
                answer: "Not too expensive"
            },
            {
                id: 4,
                answer: " Five hourrs ago"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    },
    {
        id: 6,
        lable: 'Marry often goes out with her friends at 8.30 P.M _________ ?',
        answer: [
            {
                id: 1,
                answer: "does she"
            },
            {
                id: 2,
                answer: " doesn't she"
            },
            {
                id: 3,
                answer: "didn't she"
            },
            {
                id: 4,
                answer: "is she"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    },
    {
        id: 7,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    },
    {
        id: 8,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 9,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 10,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 11,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 12,
        lable: '',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "HTDV",
        type: "NoLable"

    }, {
        id: 13,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 14,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 15,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 16,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 17,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 18,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 19,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 20,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    }, {
        id: 21,
        lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
        answer: [
            {
                id: 1,
                answer: "Had been playing"
            },
            {
                id: 2,
                answer: "is playing"
            },
            {
                id: 3,
                answer: "was playing"
            },
            {
                id: 4,
                answer: "have been playing"
            }
        ],
        correctAnswer: 1,
        code: "NP-1",
        type: "Lable"

    },
]
