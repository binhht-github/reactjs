import React, { useEffect, memo, useState, Children } from 'react';
import Parser from 'html-react-parser';
import Answers from './Answers';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../../../firebase';
import { IQuestions } from '../../Interface/Interfaces';

let index = 0
function Questions(props: any) {
    // console.log("re-render Questions");

    if (index >= props.totalQuestions) {
        index = 0
    }
    index++

    const [questions, setQuestions] = useState<IQuestions>(props.questionsItem)


    const handleSelectAnswer = (answer: string, questionsID: string, correctAnswer: string) => {
        props.handleSelectAnswer({ answer: answer, question: questionsID, correctAnswer: correctAnswer })
    }


    return (
        <>
            {questions.title.length <= 0 && questions.type == props.topicItem.type ?
                <div className='grid grid-cols-result w-full '>

                    <span className='min-w-24 font-bold'>Questions {index}.</span>
                    <Answers submit={props.submit} list={questions.answer} questionID={questions.id} handleSelectAnswer={handleSelectAnswer} correctAnswer={questions.correctAnswer}></Answers>
                </div>
                : <div key={questions.id} className='py-1'>
                    <div className='flex min-w-[100px]'>
                        <div className=' min-w-[110px] h-fit'>
                            <span className='min-w-24 font-bold block'>Questions {index}.</span>
                        </div>
                        <div className='ml-1  h-fit'>
                            <div  >
                                {questions.title.split("-").length > 2
                                    ?
                                    questions.title.split("-").map((itemSplit, indexSplit) => { return <span key={indexSplit}>{indexSplit > 0 ? "-" : ""} {Parser(itemSplit)} <br /></span> })
                                    :
                                    Parser(questions.title)}
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 w-[calc(100%-20px)] ml-10'>

                        <Answers submit={props.submit} list={questions.answer} questionID={questions.id} handleSelectAnswer={handleSelectAnswer} correctAnswer={questions.correctAnswer}></Answers>
                    </div>
                </div>
            }
        </>
    );
}



// export default Questions;
export default memo(Questions);



// import React, { useEffect, memo, useState } from 'react';
// import Parser from 'html-react-parser';
// import Answers from './Answers';
// import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
// import { database } from '../../../firebase';
// import { IQuestions } from '../../Interface/Interfaces';

// let questionIndex = 0;
// function Questions(props: any) {

//     const [questions, setQuestions] = useState<IQuestions[]>([])
//     if (props.submit) {
//         questionIndex = 0;
//     }
//     useEffect(() => {

//         const dbRef2 = ref(database, `Questions`);
//         onValue(query(dbRef2, orderByChild('topic'), equalTo(`${props.topic.id}`)), (snapshot) => {
//             const result: IQuestions[] = []
//             snapshot.forEach((childSnapshot) => {
//                 const childData = childSnapshot.val();
//                 result.push({
//                     id: childData.id,
//                     title: childData.title,
//                     answer: childData.answer,
//                     correctAnswer: childData.correctAnswer,
//                     type: childData.type,
//                     topic: childData.topic
//                 })
//             });
//             setQuestions(result)
//             props.countTotleQuestions(result.length)
//         }, {
//             onlyOnce: true
//         });
//     }, [props.topic, props.submit])

//     const handleSelectAnswer = (answer: string, questionsID: string, correctAnswer: string) => {
//         props.handleSelectAnswer({ answer: answer, question: questionsID, correctAnswer: correctAnswer }, questionIndex)
//     }

//     return (
//         <>
//             <button onClick={() => {
//                 console.log(questionIndex);
//             }}>click me</button>
//             {questions.map((item, index) => {
//                 if (item.title.length == 0 && item.type == props.topic.type) {
//                     questionIndex++
//                     return <div key={item.id} className='grid grid-cols-result w-full '>

//                         <span className='min-w-24 font-bold'>Questions {questionIndex}.</span>
//                         <Answers submit={props.submit} list={item.answer} questionID={item.id} handleSelectAnswer={handleSelectAnswer} correctAnswer={item.correctAnswer}></Answers>
//                     </div>

//                 }
//                 if (item.title.length > 0 && item.type == props.topic.type) {
//                     questionIndex++
//                     return <div key={item.id} className='py-1'>
//                         <div className='flex min-w-[100px]'>
//                             <div className=' min-w-[110px] h-fit'>
//                                 <span className='min-w-24 font-bold block'>Questions {questionIndex}.</span>
//                             </div>
//                             <div className='ml-1  h-fit'>
//                                 <div  >
//                                     {item.title.split("-").length > 2
//                                         ?
//                                         item.title.split("-").map((itemSplit, indexSplit) => { return <span key={indexSplit}>{indexSplit > 0 ? "-" : ""} {Parser(itemSplit)} <br /></span> })
//                                         :
//                                         Parser(item.title)}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='grid grid-cols-4 w-[calc(100%-20px)] ml-10'>

//                             <Answers submit={props.submit} list={item.answer} questionID={item.id} handleSelectAnswer={handleSelectAnswer} correctAnswer={item.correctAnswer}></Answers>
//                         </div>
//                     </div>
//                 }
//             })}
//         </>
//     );
// }



// // export default Questions;
// export default memo(Questions);

// const questionsArray = [
//     {
//         id: 1,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "march<u><b>ed</b></u>"
//             },
//             {
//                 id: 2,
//                 answer: "book<u><b>ed</b></u>"
//             },
//             {
//                 id: 3,
//                 answer: "act<u><b>ed</b></u>"
//             },
//             {
//                 id: 4,
//                 answer: "leap<u><b>ed</b></u>"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NA-1",
//         type: "NoLable"

//     },
//     {
//         id: 2,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "<u><b>e</b></u>vent"
//             },
//             {
//                 id: 2,
//                 answer: "b<u><b>e</b></u>tween"
//             },
//             {
//                 id: 3,
//                 answer: "pret<u><b>e</b></u>nd"
//             },
//             {
//                 id: 4,
//                 answer: "d<u><b>e</b></u>sptie"
//             }
//         ],
//         correctAnswer: 2,
//         code: "NA-1",
//         type: "NoLable"

//     },
//     {
//         id: 3,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "stay<u><b>ed</b></u>"
//             },
//             {
//                 id: 2,
//                 answer: "shar<u><b>ed</b></u>"
//             },
//             {
//                 id: 3,
//                 answer: "shout<u><b>ed</b></u>"
//             },
//             {
//                 id: 4,
//                 answer: "sig<u><b>ed</b></u>"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NA-1",
//         type: "NoLable"

//     },
//     {
//         id: 4,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "h<u><b>ea</b></u>t"
//             },
//             {
//                 id: 2,
//                 answer: "f<u><b>ea</b></u>st"
//             },
//             {
//                 id: 3,
//                 answer: "<u><b>ea</b></u>rth"
//             },
//             {
//                 id: 4,
//                 answer: "p<u><b>ea</b></u>ce"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NA-1",
//         type: "NoLable"

//     },
//     {
//         id: 5,
//         lable: 'Tim is talkiung to peter, his new classmate, in the class room - Tim: how far is it from your house to school, - Peter? Peter: "____________" - Tim: how are you. - Peter: fine thanks you',
//         answer: [
//             {
//                 id: 1,
//                 answer: "About five kilometres"
//             },
//             {
//                 id: 2,
//                 answer: "A bit too old"
//             },
//             {
//                 id: 3,
//                 answer: "Not too expensive"
//             },
//             {
//                 id: 4,
//                 answer: " Five hourrs ago"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     },
//     {
//         id: 6,
//         lable: 'Marry often goes out with her friends at 8.30 P.M _________ ?',
//         answer: [
//             {
//                 id: 1,
//                 answer: "does she"
//             },
//             {
//                 id: 2,
//                 answer: " doesn't she"
//             },
//             {
//                 id: 3,
//                 answer: "didn't she"
//             },
//             {
//                 id: 4,
//                 answer: "is she"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     },
//     {
//         id: 7,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     },
//     {
//         id: 8,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "HTDV",
//         type: "NoLable"

//     }, {
//         id: 9,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "HTDV",
//         type: "NoLable"

//     }, {
//         id: 10,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "HTDV",
//         type: "NoLable"

//     }, {
//         id: 11,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "HTDV",
//         type: "NoLable"

//     }, {
//         id: 12,
//         lable: '',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "HTDV",
//         type: "NoLable"

//     }, {
//         id: 13,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 14,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 15,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 16,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 17,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 18,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 19,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 20,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     }, {
//         id: 21,
//         lable: 'At 9 p.m  last night, my younger brther _____ game online in his room',
//         answer: [
//             {
//                 id: 1,
//                 answer: "Had been playing"
//             },
//             {
//                 id: 2,
//                 answer: "is playing"
//             },
//             {
//                 id: 3,
//                 answer: "was playing"
//             },
//             {
//                 id: 4,
//                 answer: "have been playing"
//             }
//         ],
//         correctAnswer: 1,
//         code: "NP-1",
//         type: "Lable"

//     },
// ]
