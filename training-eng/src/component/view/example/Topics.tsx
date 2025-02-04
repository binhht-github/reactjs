import React, { useCallback, useEffect, useState } from 'react';
import Parser from 'html-react-parser';
import Questions from './Questions';


interface ITopic {
    type: string, // mã code 
    topic: string,
    note: string
}
interface ITypeTopic {
    type: string,
    name: string
}
interface ISelectAnswer {
    answer: number,
    question: number
}

function Topic(props: any) {
    console.log("re-render Topic");

    const [topics, setTopics] = useState<ITopic[]>([])

    useEffect(() => {
        setTimeout(() => { setTopics([topicArray[0], topicArray[4], topicArray[5],]) }, 1000)
    }, [])
    let answers: ISelectAnswer[] = []
    const handleSelectAnswer = (item: ISelectAnswer) => {

        const index = answers.findIndex(x => x.question == item.question)
        console.log(index);
        if (index < 0) {
            answers.push(item)
            return
        }
        if (index >= 0) {
            answers[index] = item
            return
        }
    }

    return (
        <>
            <button onClick={() => {
                console.log(answers);

            }}>click me!</button>

            {topics.map((item, index) => {
                return <div key={index}>
                    <div className='w-full h-fit'>
                        <div className='w-full '>
                            <label htmlFor="" className='font-bold decoration-'>{item.topic}</label>
                            {item.note.length < 1 ? null : <span className='block py-5'>{Parser(item.note)}</span>}
                            <Questions onSelectAnswer={handleSelectAnswer} topic={item} />
                        </div>
                    </div>
                </div>
            })}
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

export default Topic;
