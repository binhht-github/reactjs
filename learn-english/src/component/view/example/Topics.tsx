import React, { memo, useEffect, useState } from 'react';
import Parser from 'html-react-parser';
import Questions from './Questions';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../../../firebase';
import { IQuestions, ISelectAnswer, ITopic } from '../../../Interface/Interfaces';
import { getQuestionByTopicID } from '../../../api/QuestionsApi';



function Topic(props: any) {
    // console.log("re-render Topic");
    const [questions, setQuestions] = useState<IQuestions[]>([])

    useEffect(() => {
        getQuestionByTopicID(props.topicItem.id)
            .then((res: any) => {
                props.countTotleQuestions(res.data.length)
                setQuestions(res.data)
            })
            .catch((e) => {
            })

    }, [props.topicItem])


    return (
        <>
            <div className='w-full h-fit pt-1'>
                <div className='w-full '>
                    <label htmlFor="" className=''><strong>{Parser(props.topicItem.topic)}</strong></label>
                    {!props.topicItem.note ? null : [...props.topicItem.note].map((itemNote, indexNote) => { return <span key={indexNote} className='block py-2 ' {...itemNote.indexOf("<em>(") == 0 ? { style: { textAlign: 'right' } } : null} {...(itemNote.indexOf("<b>") == 0 || itemNote.indexOf("<strong>") == 0) && itemNote.indexOf(" ") >= 1 ? { style: { textAlign: 'center' } } : null}>{Parser(itemNote)} </span> })}
                    {
                        questions.map((questionsItem, questionIndex) => {
                            return <Questions key={questionIndex} submit={props.submit} questionsItem={questionsItem} topicItem={props.topicItem} handleSelectAnswer={props.handleSelectAnswer} />
                        })
                    }
                </div>
            </div >

        </>
    );
}

export const topicArray = [
    {
        type: "NA-1", // phat am
        topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the word whose underlined part differs from the other three in pronunciation in each of the following questions.",
        note: "",
    },
    {
        type: "NA-2", // trong am chinh
        topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the word that differs from the other three in the position of primary stress in each of the following questions.",
        note: "",
    },
    {
        type: "TN", // trai nghia
        topic: "timf tu trai nghia voi cac tu con lai",
        note: "",
    },
    {
        type: "DN-1", // dong nghia ve tu
        topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s)or phrase(s)CLOSEST in meaning to the underlined part in each of the following questions.",
        note: "",
    },
    {
        type: "DN-2", // dong nghia ve cau
        topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that is closest in meaning to each of the following questions.",
        note: "",
    },
    {
        type: "NP-1", // ngu phap - hoan thanh cau hoi
        topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.",
        note: "",
    },
    {
        type: "NP-2", // ngu phap - sua cau hoi
        topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the underlined part that needs correction in each of the following questions.",
        note: "",
    },
    {
        type: "NP-3", // ngu phap - cau keet hop
        topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions.",
        note: "",
    },
    {
        type: "READ-1", //doc doan van va Hoan thanh doan van
        topic: "Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase that best fits each of the numbered blanks",
        note: `At 9 p.m  last night, my younger brther _____ game <b>online</b> in his room At 9 p.m  last night, my younger brther _____ **game** online in his room At 9 p.m  <b>last night</b>, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room`,
    },
    {
        type: "READ-2", // doc doan van va tra loi cau hoi
        topic: "Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the questions.",
        note: `At 9 p.m  last night, my younger brther _____ game <b>online</b> in his room At 9 p.m  last night, my younger brther _____ **game** online in his room At 9 p.m  <b>last night</b>, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room`,
    }
]

export default memo(Topic);

// import React, { memo, useEffect, useState } from 'react';
// import Parser from 'html-react-parser';
// import Questions from './Questions';
// import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
// import { database } from '../../../firebase';
// import { ISelectAnswer, ITopic } from '../../Interface/Interfaces';




// function Topic(props: any) {
//     console.log("re-render Topic");
//     const [topics, setTopics] = useState<ITopic[]>([])

//     useEffect(() => {
//         // setTimeout(() => { setTopics([topicArray[0], topicArray[4], topicArray[5],]) }, 1000)
//         if (props.example != null) {
//             const dbRef2 = ref(database, 'Topic');
//             onValue(query(dbRef2, orderByChild('example'), equalTo(`${props.example.id}`)), (snapshot) => {
//                 if (snapshot.exists()) {
//                     const result: ITopic[] = []
//                     snapshot.forEach((childSnapshot) => {
//                         const childKey = childSnapshot.key;
//                         const childData = childSnapshot.val();
//                         result.push(childData)
//                     });
//                     setTopics(result)
//                 }
//             }, {
//                 onlyOnce: true
//             });
//         }
//     }, [props.example])

//     return (
//         <>
//             {topics.map((item, index) => {
//                 return <div key={index} className='w-full h-fit pt-1'>
//                     <div className='w-full '>
//                         <label htmlFor="" className=''><strong>{Parser(item.topic)}</strong></label>
//                         {!item.note ? null : [...item.note].map((itemNote, indexNote) => { return <span key={indexNote} className='block py-2 ' {...itemNote.indexOf("<em>(") == 0 ? { style: { textAlign: 'right' } } : null} {...(itemNote.indexOf("<b>") == 0 || itemNote.indexOf("<strong>") == 0) && itemNote.indexOf(" ") >= 1 ? { style: { textAlign: 'center' } } : null}>{Parser(itemNote)} </span> })}
//                         <Questions topic={item} submit={props.submit} countTotleQuestions={props.countTotleQuestions} handleSelectAnswer={props.handleSelectAnswer} />
//                     </div>
//                 </div >

//             })}
//         </>
//     );
// }

// export const topicArray = [
//     {
//         type: "NA-1", // phat am
//         topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the word whose underlined part differs from the other three in pronunciation in each of the following questions.",
//         note: "",
//     },
//     {
//         type: "NA-2", // trong am chinh
//         topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the word that differs from the other three in the position of primary stress in each of the following questions.",
//         note: "",
//     },
//     {
//         type: "TN", // trai nghia
//         topic: "timf tu trai nghia voi cac tu con lai",
//         note: "",
//     },
//     {
//         type: "DN-1", // dong nghia ve tu
//         topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s)or phrase(s)CLOSEST in meaning to the underlined part in each of the following questions.",
//         note: "",
//     },
//     {
//         type: "DN-2", // dong nghia ve cau
//         topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that is closest in meaning to each of the following questions.",
//         note: "",
//     },
//     {
//         type: "NP-1", // ngu phap - hoan thanh cau hoi
//         topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.",
//         note: "",
//     },
//     {
//         type: "NP-2", // ngu phap - sua cau hoi
//         topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the underlined part that needs correction in each of the following questions.",
//         note: "",
//     },
//     {
//         type: "NP-3", // ngu phap - cau keet hop
//         topic: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions.",
//         note: "",
//     },
//     {
//         type: "READ-1", //doc doan van va Hoan thanh doan van
//         topic: "Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase that best fits each of the numbered blanks",
//         note: `At 9 p.m  last night, my younger brther _____ game <b>online</b> in his room At 9 p.m  last night, my younger brther _____ **game** online in his room At 9 p.m  <b>last night</b>, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room`,
//     },
//     {
//         type: "READ-2", // doc doan van va tra loi cau hoi
//         topic: "Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the questions.",
//         note: `At 9 p.m  last night, my younger brther _____ game <b>online</b> in his room At 9 p.m  last night, my younger brther _____ **game** online in his room At 9 p.m  <b>last night</b>, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room At 9 p.m  last night, my younger brther _____ game online in his room`,
//     }
// ]

// export default memo(Topic);
