
import React, { useState } from 'react';
import { IExample, IQuestions, ITopic } from '../../../../Interface/Interfaces';
import { generateRandomId } from '../../../../utils/GenerateRandomId';
import mammoth from 'mammoth';
import { topicArray } from '../Topics';
import {
    ref,
    set,
} from "firebase/database";
import { database } from '../../../../firebase';
import ContenComponent from './ContenComponent';
import { postExample } from '../../../../api/ExampleApi';

function ImportExample() {

    const [example, setExample] = useState<IExample | null>({
        id: "ex" + generateRandomId(),
        createName: "BÀI THI THỬ MÔN TIẾNG ANH",
        maDeThi: "Auto",
        createDate: `${new Date()}`,
        index: 0
    });
    const [topics, setTopics] = useState<ITopic[]>([{
        id: generateRandomId(),
        type: "", // mã code 
        topic: "",
        note: [""],
        example: example?.id!,
        createDate: `${new Date()}`,
        index: 0
    }])
    const [questions, setQuestions] = useState<IQuestions[]>([{
        id: generateRandomId(),
        title: "",
        answer: ["", "", "", ""], // answer: ["Sof<u>t</u>en", "Fif<u>t</u>een", "En<u>t</u>er", "Par<u>t</u>y"],
        correctAnswer: "",
        type: "",
        topic: topics[0].id,
        createDate: `${new Date()}`,
        index: 0
    }])

    const [newTopic, setNewTopic] = useState<ITopic>({
        id: generateRandomId(),
        type: "", // mã code 
        topic: "",
        note: [""],
        example: example?.id!,
        createDate: `${new Date()}`,
        index: 0
    })
    const [newQuestions, setNewQuestions] = useState<IQuestions>({
        id: "",
        title: "",
        answer: ["", "", "", ""],
        correctAnswer: "",
        type: "",
        topic: newTopic.id,
        createDate: `${new Date()}`,
        index: 0
    })

    let indexQuestion = 0;


    const addNewTopic = () => {
        setTopics([...topics, newTopic!])
        setQuestions([...questions, {
            id: generateRandomId(),
            title: "",
            answer: ["", "", "", ""],
            correctAnswer: "",
            type: "",
            topic: newTopic.id,
            createDate: `${new Date()}`,
            index: 0
        }])
        setNewTopic({
            id: generateRandomId(),
            type: "", // mã code 
            topic: "topic",
            note: ["note"],
            example: example?.id!,
            createDate: `${new Date()}`,
            index: 0
        })

    }
    const addNewQuestions = (topicID: string) => {
        setQuestions([...questions, {
            id: generateRandomId(),
            title: newQuestions.title,
            answer: newQuestions.answer,
            correctAnswer: newQuestions.correctAnswer,
            type: newQuestions.type,
            topic: topicID,
            createDate: `${new Date()}`,
            index: 0
        }])
    }

    const deleteQuestions = (questionId: string) => {
        console.log("delete qustions");

        const newArray = questions.filter(item => { return item.id != questionId })

        setQuestions(newArray)
    }

    const handleUpdateTopic = (event: any, topicID: string, value: string) => {
        const newArray = topics.filter((item, index) => {
            if (item.id == topicID) {
                if (event.target.getAttribute("data-name") == "topic") {
                    item.topic = value
                }
                if (event.target.getAttribute("data-name") == "topic-note") {
                    item.note = [value]
                }
            }
            return item
        })
        setTopics(newArray)
    }

    const handleUpdateQuestions = (event: any, questionID: string, value: string) => {
        const newArray = questions.filter((item, index) => {
            if (item.id == questionID) {
                if (event.target.getAttribute("data-name") == "answer-1") {
                    item.answer[0] = value.slice(2, event.target.innerHTML.lenght)
                }
                if (event.target.getAttribute("data-name") == "answer-2") {
                    item.answer[1] = value.slice(2, event.target.innerHTML.lenght)
                }
                if (event.target.getAttribute("data-name") == "answer-3") {

                    item.answer[2] = value.slice(2, event.target.innerHTML.lenght)
                }
                if (event.target.getAttribute("data-name") == "answer-4") {
                    item.answer[3] = value.slice(2, event.target.innerHTML.lenght)
                }
                if (event.target.getAttribute("data-name") == "title") {

                    item.title = value
                }
            }
            return item
        })
        setQuestions(newArray)
    }

    const handleUpdateCorrentAnswer = (event: any, questionsID: string, correctAnswer: string) => {
        const newArray = questions.filter((item, index) => {
            if (item.id == questionsID) {
                item.correctAnswer = correctAnswer
            }
            return item
        })
        setQuestions(newArray)
    }

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            var options = {
                styleMap: ["b => strong", "u => u"],
            };
            mammoth
                .convertToHtml({ arrayBuffer: arrayBuffer }, options)
                .then((result) => {
                    const exampleID = generateRandomId();
                    const arraySplit = splitToBlocksRegex(result.value);
                    let arrayRemovePTag: string[] = [];
                    arraySplit.forEach((e) => {
                        arrayRemovePTag.push(removeMultipleSpaces(removePTags(e)));
                    });

                    // tìm index các topic vs questions
                    let indexArrayRemovePTag: {
                        type: string,
                        item: string,
                        index: number,
                    }[] = [];
                    const regexTopic =
                        /mark the letter A, B, C, or D on your answer sheet /i;
                    const regexQuestions = /question/i;
                    arrayRemovePTag.map((item, index) => {
                        if (
                            removeHTMLTags(item).search(regexTopic) >= 0 ||
                            removeHTMLTags(item).search(
                                /mark the letter A, B, C or D on your answer sheet /i
                            ) >= 0
                        ) {

                            indexArrayRemovePTag.push({
                                type: "Topic",
                                item: item,
                                index: index,
                            });
                        }
                        if (
                            item.search(regexQuestions) >= 0 &&
                            item.search(regexQuestions) < 10 // check xem có ở vị trí đầu k
                        ) {


                            indexArrayRemovePTag.push({
                                type: "Questions",
                                item: item,
                                index: index,
                            });
                        }
                    });

                    // lọc topic vs question  ra khỏi arrayRemovePTag
                    let arrayTopic: ITopic[] = [];
                    let arrayQuestion: IQuestions[] = [];
                    const findCode = (item: string) => {
                        let code = topicArray.find(
                            (topic) => item.indexOf(topic.topic) >= 0
                        );
                        if (code) {
                            return code.type;
                        }
                        return "";
                    };
                    let indexTopicTemp = 0;
                    let idTopicTemp = "";
                    indexArrayRemovePTag.map((item, index) => {
                        // tìm từ vị trí đàu tiên đến vị trí áp chót (lenght-1)
                        if (index < indexArrayRemovePTag.length - 1) {
                            // lọc topic
                            if (item.type == "Topic") {
                                idTopicTemp = generateRandomId();
                                indexTopicTemp = item.index;
                                if (indexArrayRemovePTag[index + 1].type != "Questions") {
                                    return;
                                }
                                arrayTopic.push({
                                    id: idTopicTemp,
                                    type: findCode(arrayRemovePTag[item.index]),
                                    topic: arrayRemovePTag[item.index],
                                    note: arrayRemovePTag.slice(
                                        item.index + 1,
                                        indexArrayRemovePTag[index + 1].index
                                    ),
                                    example: "ex" + exampleID,
                                    createDate: `${new Date()}`,
                                    index: 0
                                });
                            }
                            // lọc questions
                            if (item.type == "Questions") {
                                let questionsItem = arrayRemovePTag.slice(
                                    item.index,
                                    indexArrayRemovePTag[index + 1].index
                                );
                                arrayQuestion.push({
                                    id: generateRandomId(),
                                    title: validateTitle(
                                        questionsItem.filter((e) => {
                                            if (
                                                removeHTMLTags(e).indexOf("A.") == -1 &&
                                                removeHTMLTags(e).indexOf("B.") == -1 &&
                                                removeHTMLTags(e).indexOf("C.") == -1 &&
                                                removeHTMLTags(e).indexOf("D.") == -1 &&
                                                removeHTMLTags(e).search(
                                                    /mark the letter A, B, C, or D on your answer sheet /i
                                                ) == -1
                                            ) {
                                                return e;
                                            }
                                        })
                                    ),
                                    answer: validateAnswer(
                                        questionsItem.filter((e) => {
                                            if (
                                                (removeHTMLTags(e).indexOf("A.") >= 0 ||
                                                    removeHTMLTags(e).indexOf("B.") >= 0 ||
                                                    removeHTMLTags(e).indexOf("C.") >= 0 ||
                                                    removeHTMLTags(e).indexOf("D.") >= 0) &&
                                                removeHTMLTags(e).search(
                                                    /mark the letter A, B, C, or D on your answer sheet /i
                                                ) == -1
                                            ) {
                                                return e;
                                            }
                                        })
                                    ),
                                    correctAnswer: "0",
                                    type: findCode(arrayRemovePTag[indexTopicTemp]),
                                    topic: idTopicTemp,
                                    createDate: `${new Date()}`,
                                    index: 0
                                });
                            }
                        }
                        // tìm từ vị trí cuối (từ vị trí này k còn topic nữa)
                        if (index == indexArrayRemovePTag.length - 1) {
                            // lọc questions
                            if (item.type == "Questions") {
                                let lastQuestion = arrayRemovePTag.slice(
                                    item.index,
                                    arrayRemovePTag.length
                                );
                                arrayQuestion.push({
                                    id: generateRandomId(),
                                    title: validateTitle(
                                        lastQuestion.filter((e) => {
                                            if (
                                                removeHTMLTags(e).indexOf("A.") == -1 &&
                                                removeHTMLTags(e).indexOf("B.") == -1 &&
                                                removeHTMLTags(e).indexOf("C.") == -1 &&
                                                removeHTMLTags(e).indexOf("D.") == -1 &&
                                                removeHTMLTags(e).search(
                                                    /mark the letter A, B, C, or D on your answer sheet /i
                                                ) == -1
                                            ) {
                                                return e;
                                            }
                                        })
                                    ),
                                    answer: validateAnswer(
                                        lastQuestion.filter((e) => {
                                            if (
                                                (removeHTMLTags(e).indexOf("A.") >= 0 ||
                                                    removeHTMLTags(e).indexOf("B.") >= 0 ||
                                                    removeHTMLTags(e).indexOf("C.") >= 0 ||
                                                    removeHTMLTags(e).indexOf("D.") >= 0) &&
                                                removeHTMLTags(e).search(
                                                    /mark the letter A, B, C, or D on your answer sheet /i
                                                ) == -1
                                            ) {
                                                return e;
                                            }
                                        })
                                    ),
                                    correctAnswer: "0",
                                    topic: idTopicTemp,
                                    type: findCode(arrayRemovePTag[indexTopicTemp]),
                                    createDate: `${new Date()}`,
                                    index: 0
                                });
                            }
                        }
                    });
                    setExample({
                        id: "ex" + exampleID,
                        createName: "",
                        maDeThi: "",
                        createDate: `${new Date()}`,
                        index: 0
                    })
                    setTopics(arrayTopic);
                    setQuestions(arrayQuestion);
                })
                .catch((err) => {
                    console.error("Error reading .docx file", err);
                });
        }
    };

    const handleSaveExample = () => {
        // let check = true

        // if (example?.id == "" || example == null) {
        //     check = false
        //     console.log("k co example id");

        // }

        // topics.forEach(itemTopic => {
        //     if (itemTopic.topic == "" || itemTopic.topic == null || itemTopic == null) {
        //         check = false
        //         console.log("error topic ", itemTopic);

        //     }
        // })

        // questions.forEach(itemQuestions => {
        //     if (itemQuestions.correctAnswer == "" || itemQuestions.topic == "") {
        //         check = false
        //         console.log("error question ", itemQuestions);

        //     }
        //     itemQuestions.answer.forEach(itemAnswer => {
        //         if (itemAnswer == "" || itemAnswer == "0" || itemAnswer == "1" || itemAnswer == "2" || itemAnswer == "3") {
        //             check = false
        //             console.log("error answer ", itemAnswer);

        //         }
        //     })
        // })


        // if (check) {
        //     let idExample = generateRandomId()
        //     let idTopic = generateRandomId()
        //     setExample({
        //         id: "ex" + idExample,
        //         createName: "",
        //         maDeThi: "",
        //         createDate: `${new Date()}`,
        //         index: 0
        //     })
        //     setTopics([{
        //         id: idTopic,
        //         type: "", // mã code 
        //         topic: "topic",
        //         note: ["note"],
        //         example: "ex" + idExample,
        //         createDate: `${new Date()}`,
        //         index: 0
        //     }!])
        //     setQuestions([{
        //         id: generateRandomId(),
        //         title: "",
        //         answer: ["", "", "", ""],
        //         correctAnswer: "",
        //         type: "",
        //         topic: idTopic,
        //         createDate: `${new Date()}`,
        //         index: 0
        //     }])
        //     setNewTopic({
        //         id: generateRandomId(),
        //         type: "", // mã code 
        //         topic: "topic",
        //         note: ["note"],
        //         example: "ex" + idExample,
        //         createDate: `${new Date()}`,
        //         index: 0
        //     })
        // } else {
        //     console.log("cos sai");

        // }

        writeExample(example!)
        // writeTopic(topics)
        // wirteQuestions(questions)
    }
    const handleClear = () => {
        let idExample = generateRandomId()
        let idTopic = generateRandomId()
        setExample({
            id: "ex" + idExample,
            createName: "",
            maDeThi: "",
            createDate: `${new Date()}`,
            index: 0
        })
        setTopics([{
            id: idTopic,
            type: "", // mã code 
            topic: "topic",
            note: ["note"],
            example: "ex" + idExample,
            createDate: "string",
            index: 0
        }!])
        setQuestions([{
            id: generateRandomId(),
            title: "",
            answer: ["", "", "", ""],
            correctAnswer: "",
            type: "",
            topic: idTopic,
            createDate: `${new Date()}`,
            index: 0
        }])
    }

    return (
        <div className="container_custom h-full overflow-y-auto  no-scrollbar py-5">

            <div className="h-12 bg-[#8f8f8f]  container_custom flex justify-between items-center">
                <div className="flex justify-center flex-1 ">
                    <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => { handleSaveExample() }}>Save Example</button>
                    <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => { handleClear() }}>Clear</button>
                    <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => {
                        console.log(topics);
                        console.log(questions);


                    }}>test</button>
                    <input className="bg-white rounded-lg p-1 w-48" type="file" accept=".docx" onChange={handleFileChange} />
                </div>
                <div className="flex justify-center flex-1"><input type="text" /></div>
            </div>
            <div className="w-full h-fit min-h-[1000px]  p-20 mt-5 bg-white">

                <div className="flex w-full h-fit">
                    <div className="w-1/3  flex flex-col items-start " style={{}}>

                        <span className="w-full font-bold text-xl text-center">
                            HỆ THỐNG LUYỆN ĐỀ THI
                        </span>
                    </div>
                    <div className="w-2/3  flex flex-col items-center pl-6">
                        <ContenComponent
                            value="BÀI THI THỬ MÔN TIẾNG ANH"
                            onUpdate={(value: string) => {
                                console.log("update data ", value);
                            }}
                            dataName=""
                            className="min-w-44 border border-dashed border-gray-400 m-1  text-xl text-center  "
                        />
                        <ContenComponent
                            value="thời gian làm bài: 60p"
                            onUpdate={(value: string) => {
                                console.log("update data ", value);
                            }}
                            dataName=""
                            className="min-w-44 border border-dashed border-gray-400 m-1 text-center  "
                        />
                        <ContenComponent
                            value="Mã đề thi: Auto"
                            onUpdate={(value: string) => {
                                console.log("update data ", value);
                            }}
                            dataName=""
                            className="min-w-44 border border-dashed border-gray-400 m-1 text-center  "
                        />

                    </div>
                </div>

                <span className="w-[80%] mx-auto my-4 h-[1px] bg-black block"></span>

                <div className="w-full ">

                    {topics.map((itemTopic, indexTopic) => {
                        // const elementNote = "<span>html</span>"
                        const elementNote = itemTopic.note.length > 0 ? itemTopic.note.join("<br/>") : ""
                        return <div key={indexTopic} className="w-full h-fit mb-4" >
                            <div className="w-full ">
                                <div className="group/topic border border-dashed border-gray-400 p-1 relative">

                                    <ContenComponent
                                        value={itemTopic.topic}
                                        onUpdate={(event: any, value: string) => {
                                            handleUpdateTopic(event, itemTopic.id, value)
                                        }}
                                        dataName="topic"
                                        className="border border-dashed border-gray-400 m-1 "
                                        placeHoder='Topic'
                                    />

                                    <ContenComponent
                                        value={elementNote + ""}
                                        onUpdate={(event: any, value: string) => {
                                            handleUpdateTopic(event, itemTopic.id, value)
                                        }}
                                        dataName="topic-note"
                                        className="border border-dashed border-gray-400 m-1 "
                                        placeHoder='note'
                                    />



                                    {questions.map((itemQuestion, idxQuestions) => {
                                        if (itemQuestion != null) {
                                            if (itemQuestion.topic == itemTopic.id) {
                                                indexQuestion++;
                                                return <div key={idxQuestions} className="group/question w-full  p-1 relative  hover:border hover:border-dashed hover:border-red-500 hover:border-2" >
                                                    <div className='absolute -top-9 left-3 bg-gray-200 p-2  hidden group-hover/question:block'>
                                                        <button className='bg-white p-1 mx-1 rounded-lg' onClick={() => { addNewQuestions(itemTopic.id) }}>Thêm câu hỏi</button>
                                                        <button className='bg-white p-1 mx-1 rounded-lg' onClick={() => { deleteQuestions(itemQuestion.id) }}>Xóa câu hỏi</button>
                                                    </div>
                                                    <div className="w-full h-fit my-1 flex">
                                                        <span className="font-bold min-w-24 ">Question {indexQuestion}.</span>
                                                        <ContenComponent
                                                            dataName="title"
                                                            className="w-full cursor-pointer border border-dashed border-gray-400 mx-2 px-1 min-w-56 "
                                                            onUpdate={(event: any, value: string) => { handleUpdateQuestions(event, itemQuestion.id, value) }}
                                                            value={itemQuestion.title}
                                                        // placeHoder='Title of questions'

                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 w-full cursor-pointer border border-dashed border-gray-400 p-1 ">

                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
                                                            <ContenComponent
                                                                dataName="answer-1"
                                                                className='w-full'
                                                                value={"A. " + itemQuestion.answer[0]}
                                                                onUpdate={(event: any, value: string) => { handleUpdateQuestions(event, itemQuestion.id, value) }}

                                                            />
                                                            <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
                                                                handleUpdateCorrentAnswer(e, itemQuestion.id, "0")
                                                            }} />
                                                        </div>
                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
                                                            <ContenComponent
                                                                dataName="answer-2"
                                                                className='w-full'
                                                                value={"B. " + itemQuestion.answer[1]}
                                                                onUpdate={(event: any, value: string) => { handleUpdateQuestions(event, itemQuestion.id, value) }}

                                                            />

                                                            <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
                                                                handleUpdateCorrentAnswer(e, itemQuestion.id, "1")
                                                            }} />
                                                        </div>
                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1" >
                                                            <ContenComponent
                                                                dataName="answer-3"
                                                                className='w-full'
                                                                value={"C. " + itemQuestion.answer[2]}
                                                                onUpdate={(event: any, value: string) => { handleUpdateQuestions(event, itemQuestion.id, value) }}

                                                            />
                                                            <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
                                                                handleUpdateCorrentAnswer(e, itemQuestion.id, "2")
                                                            }} />
                                                        </div>
                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
                                                            <ContenComponent
                                                                dataName="answer-4"
                                                                className='w-full'
                                                                value={"D. " + itemQuestion.answer[3]}
                                                                onUpdate={(event: any, value: string) => { handleUpdateQuestions(event, itemQuestion.id, value) }}

                                                            />
                                                            <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
                                                                handleUpdateCorrentAnswer(e, itemQuestion.id, "3")
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    })}
                    <button className="bg-slate-300 rounded-lg  px-2" onClick={() => { addNewTopic() }}>Them topic</button>

                </div>

            </div>
        </div >
    );
}


function writeExample(example: IExample) {
    postExample([{
        id: example.id,
        createName: example.createName,
        maDeThi: example.maDeThi,
        createDate: `${new Date()}`,
        index: 0
    }])
    // set(ref(database, "Example/" + example.id), {
    //     id: example.id,
    //     createName: example.createName,
    //     maDeThi: example.maDeThi,
    // });
}

function writeTopic(topicArray: ITopic[]) {
    // topicArray.map((item, index) =>
    //     set(ref(database, "Topic/" + item.id), {
    //         id: item.id,
    //         type: item.type,
    //         topic: item.topic,
    //         note: item.note,
    //         example: item.example,
    //         index: index,
    //         createDate: item.createDate
    //     })
    // );
}
function wirteQuestions(questionArray: IQuestions[]) {
    // questionArray.map((item, index) =>
    //     set(ref(database, "Questions/" + item.id), {
    //         id: item.id,
    //         title: item.title,
    //         answer: item.answer,
    //         correctAnswer: item.correctAnswer,
    //         topic: item.topic,
    //         type: item.type,
    //         index: index,
    //         createDate: item.createDate
    //     })
    // );
}

const validateTitle = (title: any) => {
    let titleTemp = title.join("");
    titleTemp = removeFirstTag(titleTemp);

    return titleTemp.slice(titleTemp.indexOf(":") + 1, titleTemp.length - 1);
};
const validateAnswer = (answer: any) => {
    let answerIndex: number[] = [];
    let answerResult: string[] = [];
    let convertToText = removeMultipleSpaces(answer.join("")).replace(/<strong[^>]*>|<\/strong>/g, "");

    const pattern = /[A-D]\.|<[^>]*>[A-D]<[^>]*>\./g;
    let match;
    while ((match = pattern.exec(convertToText)) !== null) {
        answerIndex.push(match.index);

    }
    let convertToResult = convertToText.replace(pattern, "@@")

    console.log(convertToResult.split("@@"));

    [...convertToResult.split("@@")].map((item, index) => {
        if (index > 0) {
            answerResult.push(item)
        }
    })
    return answerResult;
};

function removeMultipleSpaces(str: any) {
    return str.replace(/\s+/g, " ");
}
function removeHTMLTags(str: any) {
    // Sử dụng RegEx để tìm và thay thế tất cả các thẻ HTML
    return str.replace(/<[^>]*>/g, "");
}
function removePTags(htmlString: any) {
    return htmlString.replace(/<p[^>]*>|<\/p>/g, "");
}

function splitToBlocksRegex(html: any) {
    // Biểu thức chính quy đơn giản để tìm các thẻ block
    // const regex = /<(\w+)[^>]*>(.*?)<\/\1>/g;
    const regex = /<(\w+)>(.*?)<\/\1>/g;
    const matches = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
        matches.push(match[0]);
    }

    return matches;
}
function removeFirstTag(str: any) {
    const regex = /<(\w+)[^>]*>(.*?)<\/\1>/;
    return str.replace(regex, "$2");
}

export default ImportExample;

