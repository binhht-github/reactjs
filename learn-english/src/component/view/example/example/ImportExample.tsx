
import React, { useRef, useState } from 'react';
import { IExample, IQuestions, ITopic } from '../../../Interface/Interfaces';
import { generateRandomId } from '../../../../utils/GenerateRandomId';
import mammoth from 'mammoth';
import { topicArray } from '../Topics';
import ContentEditable from 'react-contenteditable';
import {
    ref,
    set,
} from "firebase/database";
import { database } from '../../../../firebase';

function ImportExample() {
    const [bold, setBold] = useState<boolean>(false)
    const [italic, setItalic] = useState<boolean>(false)
    const [underline, setUnderline] = useState<boolean>(false)
    const [example, setExample] = useState<IExample | null>({
        id: "ex" + generateRandomId(),
        createName: "",
        maDeThi: ""
    });
    const [topics, setTopics] = useState<ITopic[]>([{
        id: generateRandomId(),
        type: "", // mã code 
        topic: "Topic",
        note: ["note"],
        example: example?.id!
    }])
    const [questions, setQuestions] = useState<IQuestions[]>([{
        id: generateRandomId(),
        title: "",
        answer: ["", "", "", ""], // answer: ["Sof<u>t</u>en", "Fif<u>t</u>een", "En<u>t</u>er", "Par<u>t</u>y"],
        correctAnswer: "",
        type: "",
        topic: topics[0].id
    }])

    const [newTopic, setNewTopic] = useState<ITopic>({
        id: generateRandomId(),
        type: "", // mã code 
        topic: "Topic",
        note: ["note"],
        example: example?.id!
    })
    const [newQuestions, setNewQuestions] = useState<IQuestions>({
        id: "",
        title: "",
        answer: ["", "", "", ""],
        correctAnswer: "",
        type: "",
        topic: newTopic.id
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
            topic: newTopic.id
        }])
        setNewTopic({
            id: generateRandomId(),
            type: "", // mã code 
            topic: "topic",
            note: ["note"],
            example: example?.id!
        })

    }
    const addNewQuestions = (topicID: string) => {
        setQuestions([...questions, {
            id: generateRandomId(),
            title: newQuestions.title,
            answer: newQuestions.answer,
            correctAnswer: newQuestions.correctAnswer,
            type: newQuestions.type,
            topic: topicID
        }])
    }
    let timeOutTepm: NodeJS.Timeout | null

    const handleUpdateTopic = (event: any, topicID: string) => {
        clearTimeout(timeOutTepm!)
        timeOutTepm = setTimeout(() => {
            const newArray = topics.filter((item, index) => {
                if (item.id == topicID) {
                    if (event.currentTarget.getAttribute("data-name") == "topic") {
                        item.topic = event.target.value
                    }
                    if (event.currentTarget.getAttribute("data-name") == "topic-note") {
                        item.note = [event.target.value]
                    }
                }
                return item
            })
            setTopics(newArray)
            clearTimeout(timeOutTepm!);
            timeOutTepm = null
        }, 500); // Delay of 500 milliseconds
    }

    const handleUpdateQuestions = (event: any, questionID: string) => {
        const newArray = questions.filter((item, index) => {
            if (item.id == questionID) {
                if (event.currentTarget.getAttribute("data-name") == "answer-1") {
                    item.answer[0] = event.target.innerHTML.slice(2, event.target.innerHTML.lenght)
                }
                if (event.currentTarget.getAttribute("data-name") == "answer-2") {
                    item.answer[1] = event.target.innerHTML.slice(2, event.target.innerHTML.lenght)
                }
                if (event.currentTarget.getAttribute("data-name") == "answer-3") {

                    item.answer[2] = event.target.innerHTML.slice(2, event.target.innerHTML.lenght)
                }
                if (event.currentTarget.getAttribute("data-name") == "answer-4") {
                    item.answer[3] = event.target.innerHTML.slice(2, event.target.innerHTML.lenght)
                }
                if (event.currentTarget.getAttribute("data-name") == "title") {
                    item.title = event.target.innerHTML
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

    const editorRef = useRef<HTMLDivElement>(null);

    const handleFormat = (format: string) => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        if (range) {
            document.execCommand(format, false, "");
            // if (format == "bold") {
            //     setBold(!bold)
            // }
            // if (format == "italic") {
            //     setItalic(!italic)
            // }
            // if (format == "underline") {
            //     setUnderline(!underline)
            // }
        }
    };
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
                                    topic: idTopicTemp
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
                                });
                            }
                        }
                    });
                    setExample({
                        id: "ex" + exampleID,
                        createName: "",
                        maDeThi: ""
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
        let check = true

        if (example?.id == "" || example == null) {
            check = false
            console.log("k co example id");

        }

        topics.forEach(itemTopic => {
            if (itemTopic.topic == "" || itemTopic.topic == null || itemTopic == null) {
                check = false
                console.log("error topic ", itemTopic);

            }
        })

        questions.forEach(itemQuestions => {
            if (itemQuestions.correctAnswer == "" || itemQuestions.topic == "") {
                check = false
                console.log("error question ", itemQuestions);

            }
            itemQuestions.answer.forEach(itemAnswer => {
                if (itemAnswer == "" || itemAnswer == "0" || itemAnswer == "1" || itemAnswer == "2" || itemAnswer == "3") {
                    check = false
                    console.log("error answer ", itemAnswer);

                }
            })
        })


        if (check) {
            let idExample = generateRandomId()
            let idTopic = generateRandomId()
            setExample({
                id: "ex" + idExample,
                createName: "",
                maDeThi: ""
            })
            setTopics([{
                id: idTopic,
                type: "", // mã code 
                topic: "topic",
                note: ["note"],
                example: "ex" + idExample,
            }!])
            setQuestions([{
                id: generateRandomId(),
                title: "",
                answer: ["", "", "", ""],
                correctAnswer: "",
                type: "",
                topic: idTopic
            }])
            setNewTopic({
                id: generateRandomId(),
                type: "", // mã code 
                topic: "topic",
                note: ["note"],
                example: "ex" + idExample,
            })
        } else {
            console.log("cos sai");

        }

        writeExample(example!)
        writeTopic(topics)
        wirteQuestions(questions)
    }
    const handleClear = () => {
        let idExample = generateRandomId()
        let idTopic = generateRandomId()
        setExample({
            id: "ex" + idExample,
            createName: "",
            maDeThi: ""
        })
        setTopics([{
            id: idTopic,
            type: "", // mã code 
            topic: "topic",
            note: ["note"],
            example: "ex" + idExample,
        }!])
        setQuestions([{
            id: generateRandomId(),
            title: "",
            answer: ["", "", "", ""],
            correctAnswer: "",
            type: "",
            topic: idTopic
        }])
        setNewTopic({
            id: generateRandomId(),
            type: "", // mã code 
            topic: "topic",
            note: ["note"],
            example: "ex" + idExample,
        })
    }
    return (
        <div className="container_custom h-full overflow-y-auto  no-scrollbar py-5">

            <div className="h-12 bg-[#8f8f8f]  container_custom flex justify-between items-center">
                <div className="flex justify-center flex-1 ">
                    <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => { handleSaveExample() }}>Save Example</button>
                    <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => { handleClear() }}>Clear</button>
                    <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => {
                        const chuoi = "A. verbalB. signalC. Common<u>D</u>. attract";
                        const pattern = /[A-D]\.|<[^>]*>[A-D]<[^>]*>\./g;
                        // const pattern = /<u>[A-D]<\/u>/g;
                        // const pattern = /[A-D]\.|<strong[^>]*>|<\/strong>\./g;
                        const ketQua = chuoi.matchAll(pattern)
                        let match;

                        while ((match = pattern.exec(chuoi)) !== null) {
                            console.log(`Tìm thấy "${match[0]}" bắt đầu tại ${match.index}`);
                            console.log(match[0].slice(match.index, match.index + 1));

                        }

                        // return str.replace(/<[^>]*>/g, "");

                    }}>test</button>
                    <input className="bg-white rounded-lg p-1 w-48" type="file" accept=".docx" onChange={handleFileChange} />
                </div>
                <div className="flex justify-center flex-1"><input type="text" /></div>
            </div>
            <div className="w-full h-fit min-h-[1000px]  p-20 mt-5 bg-white">

                <div className="flex w-full h-fit">
                    <div className="w-1/3  flex flex-col items-start " style={{}}>

                        <span className="font-bold text-xl text-center">
                            SỞ GIÁO DỤC VÀO ĐÀO TẠO <br /> VĨNH PHÚC
                        </span>
                    </div>
                    <div className="w-2/3  flex flex-col items-center pl-6">
                        <span className="font-bold text-xl text-center ">
                            KỲ THI TUYỂN SINH VÀO LỚP 10 THPT NĂM HỌC 2023-2024{" "}
                            <span className="font-bold text-xl">tỉnh VĨNH PHÚC</span>
                        </span>
                        <span>Thời gian còn lại : 60 phút</span>
                        <span className="font-bold">Mã đề thi: 468</span>
                    </div>
                </div>

                <span className="w-[80%] mx-auto my-4 h-[1px] bg-black block"></span>

                <div className="w-full ">

                    {topics.map((itemTopic, indexTopic) => {
                        // const elementNote = "<span>html</span>"
                        const elementNote = itemTopic.note.length > 0 ? itemTopic.note.join("<br/>") : ""
                        return <div key={indexTopic} className="w-full h-fit mb-4" >
                            <div className="w-full ">
                                <div className="group border border-dashed border-gray-400 p-1 relative">
                                    <ContentEditable
                                        data-name="topic"
                                        innerRef={React.createRef()}
                                        html={itemTopic.topic} // innerHTML of the editable div
                                        disabled={false}       // use true to disable editing
                                        onChange={(e) => { handleUpdateTopic(e, itemTopic.id) }} // handle innerHTML change
                                        onFocus={(e) => {
                                            if (e.target.innerText == "Topic") {
                                                e.target.innerText = ""
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (e.target.innerText == "") {
                                                e.target.innerText = "Topic"
                                            }
                                        }}
                                        tagName='p'
                                        className="border border-dashed border-gray-400 m-1 " />
                                    <ContentEditable
                                        innerRef={React.createRef()}
                                        html={elementNote + ""} // innerHTML of the editable div {itemTopic.note.length > 0 ? itemTopic.note.map((itemNote, indexNote) => { return <p key={indexNote}>{Parser(itemNote)}</p> }) : null}
                                        disabled={false}       // use true to disable editing
                                        onChange={(e) => { handleUpdateTopic(e, itemTopic.id) }} // handle innerHTML change
                                        onFocus={(e) => {
                                            if (e.target.innerText == "note") {
                                                e.target.innerText = ""
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (e.target.innerText == "") {
                                                e.target.innerText = "note"
                                            }
                                        }}
                                        tagName='p'
                                        data-name="topic-note" className="border border-dashed border-gray-400 m-1" />
                                    <div className="absolute -top-9 left-3 bg-gray-400 p-2  hidden group-hover:block">
                                        <button className="px-2" onClick={() => handleFormat('bold')} {...bold ? { style: { border: "1px solid black", backgroundColor: '#fff' } } : null} >Bold</button>
                                        <button className="px-2" onClick={() => handleFormat('italic')} {...italic ? { style: { border: "1px solid black", backgroundColor: '#fff' } } : null}>Italic</button>
                                        <button className="px-2" onClick={() => handleFormat('underline')}{...underline ? { style: { border: "1px solid black", backgroundColor: '#fff' } } : null} >Underline</button>
                                        <button onClick={() => { addNewQuestions(itemTopic.id) }}>Thêm câu hỏi</button>
                                        <button onClick={() => { addNewQuestions(itemTopic.id) }}>Xóa câu hỏi</button>
                                    </div>
                                    {questions.map((itemQuestion, idxQuestions) => {
                                        if (itemQuestion != null) {
                                            if (itemQuestion.topic == itemTopic.id) {
                                                indexQuestion++;
                                                return <div key={idxQuestions} className=" w-full  p-1">

                                                    <div className="w-full h-fit my-1 flex">
                                                        <span className="font-bold min-w-24 ">Question {indexQuestion}.</span>
                                                        <ContentEditable
                                                            data-name="title"
                                                            className="cursor-pointer border border-dashed border-gray-400 mx-2 px-1 inline-block min-w-56 "
                                                            innerRef={React.createRef()}
                                                            html={itemQuestion.title} // innerHTML of the editable div
                                                            disabled={false}       // use true to disable editing
                                                            onBlur={(e) => { handleUpdateQuestions(e, itemQuestion.id) }}
                                                            onChange={(e) => { }} // handle innerHTML change
                                                            tagName='span' // Use a custom HTML tag (uses a div by default)
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 w-full cursor-pointer border border-dashed border-gray-400 p-1 ">

                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
                                                            <ContentEditable
                                                                data-name="answer-1"
                                                                className='w-full'
                                                                innerRef={React.createRef()}
                                                                html={"A. " + itemQuestion.answer[0]} // innerHTML of the editable div
                                                                disabled={false}       // use true to disable editing
                                                                onBlur={(e) => { handleUpdateQuestions(e, itemQuestion.id) }}
                                                                onChange={(e) => { }} // handle innerHTML change
                                                                tagName='p' // Use a custom HTML tag (uses a div by default)
                                                            />
                                                            <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
                                                                handleUpdateCorrentAnswer(e, itemQuestion.id, "0")
                                                            }} />
                                                        </div>
                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
                                                            <ContentEditable
                                                                data-name="answer-2"
                                                                className='w-full'
                                                                innerRef={React.createRef()}
                                                                html={"B. " + itemQuestion.answer[1]} // innerHTML of the editable div
                                                                disabled={false}       // use true to disable editing
                                                                onBlur={(e) => { handleUpdateQuestions(e, itemQuestion.id) }}
                                                                onChange={(e) => { }} // handle innerHTML change
                                                                tagName='p' // Use a custom HTML tag (uses a div by default)
                                                            />

                                                            <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
                                                                handleUpdateCorrentAnswer(e, itemQuestion.id, "1")
                                                            }} />
                                                        </div>
                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1" >
                                                            <ContentEditable
                                                                data-name="answer-3"
                                                                className='w-full'
                                                                innerRef={React.createRef()}
                                                                html={"C. " + itemQuestion.answer[2]} // innerHTML of the editable div
                                                                disabled={false}       // use true to disable editing
                                                                onBlur={(e) => { handleUpdateQuestions(e, itemQuestion.id) }}
                                                                onChange={(e) => { }} // handle innerHTML change
                                                                tagName='p' // Use a custom HTML tag (uses a div by default)
                                                            />
                                                            <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
                                                                handleUpdateCorrentAnswer(e, itemQuestion.id, "2")
                                                            }} />
                                                        </div>
                                                        <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
                                                            <ContentEditable
                                                                data-name="answer-4"
                                                                className='w-full'
                                                                innerRef={React.createRef()}
                                                                html={"D. " + itemQuestion.answer[3]} // innerHTML of the editable div
                                                                disabled={false}       // use true to disable editing
                                                                onBlur={(e) => { handleUpdateQuestions(e, itemQuestion.id) }}
                                                                onChange={(e) => { }} // handle innerHTML change
                                                                tagName='p' // Use a custom HTML tag (uses a div by default)
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
                    <button className="bg-red-300 px-2" onClick={() => { addNewTopic() }}>Them topic</button>

                </div>

            </div>
        </div >
    );
}


function writeExample(example: IExample) {
    set(ref(database, "Example/" + example.id), {
        id: example.id,
        createName: example.createName,
        maDeThi: example.maDeThi,
    });
}
function writeTopic(topicArray: ITopic[]) {
    topicArray.map((item) =>
        set(ref(database, "Topic/" + item.id), {
            id: item.id,
            type: item.type,
            topic: item.topic,
            note: item.note,
            example: item.example,
        })
    );
}
function wirteQuestions(questionArray: IQuestions[]) {
    questionArray.map((item) =>
        set(ref(database, "Questions/" + item.id), {
            id: item.id,
            title: item.title,
            answer: item.answer,
            correctAnswer: item.correctAnswer,
            topic: item.topic,
            type: item.type,
        })
    );
}

const validateTitle = (title: any) => {
    let titleTemp = title.join("");
    titleTemp = removeFirstTag(titleTemp);

    return titleTemp.slice(titleTemp.indexOf(":") + 1, titleTemp.length - 1);
};
const validateAnswer = (answer: any) => {
    // console.log("answer ", answer);

    let answerIndex: number[] = [];
    let answerResult: string[] = [];
    let convertToText = removeMultipleSpaces(answer.join("")).replace(/<strong[^>]*>|<\/strong>/g, "");

    // [...convertToText].map((item, index) => {
    //     if (
    //         item + [...convertToText][index + 1] == "A." ||
    //         item + [...convertToText][index + 1] == "B." ||
    //         item + [...convertToText][index + 1] == "C." ||
    //         item + [...convertToText][index + 1] == "D."
    //     ) {
    //         answerIndex.push(index);
    //     }
    // });

    const pattern = /[A-D]\.|<[^>]*>[A-D]<[^>]*>\./g;
    let match;
    while ((match = pattern.exec(convertToText)) !== null) {
        answerIndex.push(match.index);
        // console.log(`Tìm thấy "${match[0]}" bắt đầu tại ${match.index}`);
        // console.log(match[0].slice(match.index, match.index + 1));

    }
    let convertToResult = convertToText.replace(pattern, "@@")

    console.log(convertToResult.split("@@"));

    [...convertToResult.split("@@")].map((item, index) => {
        if (index > 0) {
            answerResult.push(item)
        }
    })
    // answerResult = convertToResult.split("$$")
    // answerIndex.map((item, index) => {
    //     if (index < answerIndex.length - 1) {
    //         answerResult.push(
    //             // text.slice(0, 1)
    //             convertToText.slice(answerIndex[index] + 2, answerIndex[index + 1])
    //         );
    //     }
    //     if (index == answerIndex.length - 1) {
    //         answerResult.push(
    //             convertToText.slice(answerIndex[index] + 2, convertToText.length)
    //         );
    //     }
    // });


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


// import React, { useRef, useState } from 'react';
// import { IExample, IQuestions, ITopic } from '../../../Interface/Interfaces';
// import { generateRandomId } from '../../../../utils/GenerateRandomId';
// import mammoth from 'mammoth';
// import { topicArray } from '../Topics';
// import ContentEditable from 'react-contenteditable';
// import {
//     ref,
//     set,
// } from "firebase/database";
// import { database } from '../../../../firebase';

// function ImportExample() {
//     let conrrectAnswer = []
//     const [bold, setBold] = useState<boolean>(false)
//     const [italic, setItalic] = useState<boolean>(false)
//     const [underline, setUnderline] = useState<boolean>(false)
//     const [example, setExample] = useState<IExample | null>({
//         id: "ex" + generateRandomId(),
//         createName: "",
//         maDeThi: ""
//     });
//     const [topics, setTopics] = useState<ITopic[]>([{
//         id: generateRandomId(),
//         type: "", // mã code
//         topic: "Topic",
//         note: ["note"],
//         example: example?.id!
//     }])
//     const [questions, setQuestions] = useState<IQuestions[]>([{
//         id: generateRandomId(),
//         title: "",
//         answer: ["", "", "", ""], // answer: ["Sof<u>t</u>en", "Fif<u>t</u>een", "En<u>t</u>er", "Par<u>t</u>y"],
//         correctAnswer: "",
//         type: "",
//         topic: topics[0].id
//     }])

//     const [newTopic, setNewTopic] = useState<ITopic>({
//         id: generateRandomId(),
//         type: "", // mã code
//         topic: "Topic",
//         note: ["note"],
//         example: example?.id!
//     })
//     const [newQuestions, setNewQuestions] = useState<IQuestions>({
//         id: "",
//         title: "",
//         answer: ["", "", "", ""],
//         correctAnswer: "",
//         type: "",
//         topic: newTopic.id
//     })

//     let indexQuestion = 0;


//     const addNewTopic = () => {
//         setTopics([...topics, newTopic!])
//         setQuestions([...questions, {
//             id: generateRandomId(),
//             title: "",
//             answer: ["", "", "", ""],
//             correctAnswer: "",
//             type: "",
//             topic: newTopic.id
//         }])
//         setNewTopic({
//             id: generateRandomId(),
//             type: "", // mã code
//             topic: "topic",
//             note: ["note"],
//             example: example?.id!
//         })

//     }
//     const addNewQuestions = (topicID: string) => {
//         setQuestions([...questions, {
//             id: generateRandomId(),
//             title: newQuestions.title,
//             answer: newQuestions.answer,
//             correctAnswer: newQuestions.correctAnswer,
//             type: newQuestions.type,
//             topic: topicID
//         }])
//     }
//     let timeOutTepm: NodeJS.Timeout | null

//     const handleUpdateTopic = (event: any, topicID: string) => {
//         clearTimeout(timeOutTepm!)
//         timeOutTepm = setTimeout(() => {
//             const newArray = topics.filter((item, index) => {
//                 if (item.id == topicID) {
//                     if (event.currentTarget.getAttribute("data-name") == "topic") {
//                         item.topic = event.target.value
//                     }
//                     if (event.currentTarget.getAttribute("data-name") == "topic-note") {
//                         item.note = [event.target.value]
//                     }
//                 }
//                 return item
//             })
//             setTopics(newArray)
//             clearTimeout(timeOutTepm!);
//             timeOutTepm = null
//         }, 500); // Delay of 500 milliseconds
//     }

//     const handleUpdateQuestions = (event: any, questionID: string, topicID: string) => {
//         clearTimeout(timeOutTepm!)
//         timeOutTepm = setTimeout(() => {
//             const newArray = questions.filter((item, index) => {
//                 if (item.id == questionID) {
//                     if (event.currentTarget.getAttribute("data-name") == "answer-1") {
//                         item.answer[0] = event.target.value.slice(2, event.target.value.lenght)
//                     }
//                     if (event.currentTarget.getAttribute("data-name") == "answer-2") {
//                         item.answer[1] = event.target.value.slice(2, event.target.value.lenght)
//                     }
//                     if (event.currentTarget.getAttribute("data-name") == "answer-3") {

//                         item.answer[2] = event.target.value.slice(2, event.target.value.lenght)
//                     }
//                     if (event.currentTarget.getAttribute("data-name") == "answer-4") {
//                         item.answer[3] = event.target.value.slice(2, event.target.value.lenght)
//                     }
//                     if (event.currentTarget.getAttribute("data-name") == "title") {
//                         item.title = event.target.value
//                     }

//                 }
//                 return item
//             })
//             setQuestions(newArray)

//             clearTimeout(timeOutTepm!);
//             timeOutTepm = null
//         }, 500); // Delay of 500 milliseconds

//     }

//     const handleUpdateCorrentAnswer = (event: any, questionsID: string, correctAnswer: string) => {
//         const newArray = questions.filter((item, index) => {
//             if (item.id == questionsID) {
//                 item.correctAnswer = correctAnswer
//             }
//             return item
//         })
//         setQuestions(newArray)
//     }

//     const editorRef = useRef<HTMLDivElement>(null);

//     const handleFormat = (format: string) => {
//         const selection = window.getSelection();
//         const range = selection?.getRangeAt(0);
//         if (range) {
//             document.execCommand(format, false, "");
//             // if (format == "bold") {
//             //     setBold(!bold)
//             // }
//             // if (format == "italic") {
//             //     setItalic(!italic)
//             // }
//             // if (format == "underline") {
//             //     setUnderline(!underline)
//             // }
//         }
//     };
//     const handleFileChange = async (event: any) => {
//         const file = event.target.files[0];
//         if (file) {
//             const arrayBuffer = await file.arrayBuffer();
//             var options = {
//                 styleMap: ["b => strong", "u => u"],
//             };
//             mammoth
//                 .convertToHtml({ arrayBuffer: arrayBuffer }, options)
//                 .then((result) => {
//                     const exampleID = generateRandomId();
//                     const arraySplit = splitToBlocksRegex(result.value);
//                     let arrayRemovePTag: string[] = [];
//                     arraySplit.forEach((e) => {
//                         arrayRemovePTag.push(removeMultipleSpaces(removePTags(e)));
//                     });

//                     // tìm index các topic vs questions
//                     let indexArrayRemovePTag: {
//                         type: string,
//                         item: string,
//                         index: number,
//                     }[] = [];
//                     const regexTopic =
//                         /mark the letter A, B, C, or D on your answer sheet /i;
//                     const regexQuestions = /question/i;
//                     arrayRemovePTag.map((item, index) => {
//                         if (
//                             removeHTMLTags(item).search(regexTopic) >= 0 ||
//                             removeHTMLTags(item).search(
//                                 /mark the letter A, B, C or D on your answer sheet /i
//                             ) >= 0
//                         ) {

//                             indexArrayRemovePTag.push({
//                                 type: "Topic",
//                                 item: item,
//                                 index: index,
//                             });
//                         }
//                         if (
//                             item.search(regexQuestions) >= 0 &&
//                             item.search(regexQuestions) < 10 // check xem có ở vị trí đầu k
//                         ) {


//                             indexArrayRemovePTag.push({
//                                 type: "Questions",
//                                 item: item,
//                                 index: index,
//                             });
//                         }
//                     });

//                     // lọc topic vs question  ra khỏi arrayRemovePTag
//                     let arrayTopic: ITopic[] = [];
//                     let arrayQuestion: IQuestions[] = [];
//                     const findCode = (item: string) => {
//                         let code = topicArray.find(
//                             (topic) => item.indexOf(topic.topic) >= 0
//                         );
//                         if (code) {
//                             return code.type;
//                         }
//                         return "";
//                     };
//                     let indexTopicTemp = 0;
//                     let idTopicTemp = "";
//                     indexArrayRemovePTag.map((item, index) => {
//                         // tìm từ vị trí đàu tiên đến vị trí áp chót (lenght-1)
//                         if (index < indexArrayRemovePTag.length - 1) {
//                             // lọc topic
//                             if (item.type == "Topic") {
//                                 idTopicTemp = generateRandomId();
//                                 indexTopicTemp = item.index;
//                                 if (indexArrayRemovePTag[index + 1].type != "Questions") {
//                                     return;
//                                 }
//                                 arrayTopic.push({
//                                     id: idTopicTemp,
//                                     type: findCode(arrayRemovePTag[item.index]),
//                                     topic: arrayRemovePTag[item.index],
//                                     note: arrayRemovePTag.slice(
//                                         item.index + 1,
//                                         indexArrayRemovePTag[index + 1].index
//                                     ),
//                                     example: "ex" + exampleID,
//                                 });
//                             }
//                             // lọc questions
//                             if (item.type == "Questions") {
//                                 let questionsItem = arrayRemovePTag.slice(
//                                     item.index,
//                                     indexArrayRemovePTag[index + 1].index
//                                 );



//                                 arrayQuestion.push({
//                                     id: generateRandomId(),
//                                     title: validateTitle(
//                                         questionsItem.filter((e) => {
//                                             if (
//                                                 e.indexOf("A.") == -1 &&
//                                                 e.indexOf("B.") == -1 &&
//                                                 e.indexOf("C.") == -1 &&
//                                                 e.indexOf("D.") == -1 &&
//                                                 removeHTMLTags(e).search(
//                                                     /mark the letter A, B, C, or D on your answer sheet /i
//                                                 ) == -1
//                                             ) {
//                                                 return e;
//                                             }
//                                         })
//                                     ),
//                                     answer: validateAnswer(
//                                         questionsItem.filter((e) => {
//                                             if (
//                                                 (e.indexOf("A.") >= 0 ||
//                                                     e.indexOf("B.") >= 0 ||
//                                                     e.indexOf("C.") >= 0 ||
//                                                     e.indexOf("D.") >= 0) &&
//                                                 e.search(
//                                                     /mark the letter A, B, C, or D on your answer sheet /i
//                                                 ) == -1
//                                             ) {
//                                                 return e;
//                                             }
//                                         })
//                                     ),
//                                     correctAnswer: "0",
//                                     type: findCode(arrayRemovePTag[indexTopicTemp]),
//                                     topic: idTopicTemp
//                                 });
//                             }
//                         }
//                         // tìm từ vị trí cuối (từ vị trí này k còn topic nữa)
//                         if (index == indexArrayRemovePTag.length - 1) {
//                             // lọc questions
//                             if (item.type == "Questions") {
//                                 let lastQuestion = arrayRemovePTag.slice(
//                                     item.index,
//                                     arrayRemovePTag.length
//                                 );
//                                 arrayQuestion.push({
//                                     id: generateRandomId(),
//                                     title: validateTitle(
//                                         lastQuestion.filter((e) => {
//                                             if (
//                                                 e.indexOf("A.") == -1 &&
//                                                 e.indexOf("B.") == -1 &&
//                                                 e.indexOf("C.") == -1 &&
//                                                 e.indexOf("D.") == -1 &&
//                                                 e.search(
//                                                     /mark the letter A, B, C, or D on your answer sheet /i
//                                                 ) == -1
//                                             ) {
//                                                 return e;
//                                             }
//                                         })
//                                     ),
//                                     answer: validateAnswer(
//                                         lastQuestion.filter((e) => {
//                                             if (
//                                                 (e.indexOf("A.") >= 0 ||
//                                                     e.indexOf("B.") >= 0 ||
//                                                     e.indexOf("C.") >= 0 ||
//                                                     e.indexOf("D.") >= 0) &&
//                                                 e.search(
//                                                     /mark the letter A, B, C, or D on your answer sheet /i
//                                                 ) == -1
//                                             ) {
//                                                 return e;
//                                             }
//                                         })
//                                     ),
//                                     correctAnswer: "0",
//                                     topic: idTopicTemp,
//                                     type: findCode(arrayRemovePTag[indexTopicTemp]),
//                                 });
//                             }
//                         }
//                     });
//                     setExample({
//                         id: "ex" + exampleID,
//                         createName: "",
//                         maDeThi: ""
//                     })
//                     setTopics(arrayTopic);
//                     setQuestions(arrayQuestion);

//                 })
//                 .catch((err) => {
//                     console.error("Error reading .docx file", err);
//                 });
//         }
//     };

//     const handleSaveExample = () => {
//         let check = true

//         if (example?.id == "" || example == null) {
//             check = false
//             console.log("k co example id");

//         }

//         topics.forEach(itemTopic => {
//             if (itemTopic.topic == "" || itemTopic.topic == null || itemTopic == null) {
//                 check = false
//                 console.log("error topic ", itemTopic);

//             }
//         })

//         questions.forEach(itemQuestions => {
//             if (itemQuestions.correctAnswer == "" || itemQuestions.topic == "") {
//                 check = false
//                 console.log("error question ", itemQuestions);

//             }
//             itemQuestions.answer.forEach(itemAnswer => {
//                 if (itemAnswer == "" || itemAnswer == "0" || itemAnswer == "1" || itemAnswer == "2" || itemAnswer == "3") {
//                     check = false
//                     console.log("error answer ", itemAnswer);

//                 }
//             })
//         })


//         if (check) {
//             let idExample = generateRandomId()
//             let idTopic = generateRandomId()
//             setExample({
//                 id: "ex" + idExample,
//                 createName: "",
//                 maDeThi: ""
//             })
//             setTopics([{
//                 id: idTopic,
//                 type: "", // mã code
//                 topic: "topic",
//                 note: ["note"],
//                 example: "ex" + idExample,
//             }!])
//             setQuestions([{
//                 id: generateRandomId(),
//                 title: "",
//                 answer: ["", "", "", ""],
//                 correctAnswer: "",
//                 type: "",
//                 topic: idTopic
//             }])
//             setNewTopic({
//                 id: generateRandomId(),
//                 type: "", // mã code
//                 topic: "topic",
//                 note: ["note"],
//                 example: "ex" + idExample,
//             })
//         } else {
//             console.log("cos sai");

//         }

//         writeExample(example!)
//         writeTopic(topics)
//         wirteQuestions(questions)
//     }
//     const handleClear = () => {
//         let idExample = generateRandomId()
//         let idTopic = generateRandomId()
//         setExample({
//             id: "ex" + idExample,
//             createName: "",
//             maDeThi: ""
//         })
//         setTopics([{
//             id: idTopic,
//             type: "", // mã code
//             topic: "topic",
//             note: ["note"],
//             example: "ex" + idExample,
//         }!])
//         setQuestions([{
//             id: generateRandomId(),
//             title: "",
//             answer: ["", "", "", ""],
//             correctAnswer: "",
//             type: "",
//             topic: idTopic
//         }])
//         setNewTopic({
//             id: generateRandomId(),
//             type: "", // mã code
//             topic: "topic",
//             note: ["note"],
//             example: "ex" + idExample,
//         })
//     }
//     return (
//         <div className="container_custom h-full overflow-y-auto  no-scrollbar py-5">

//             <div className="h-12 bg-[#8f8f8f]  container_custom flex justify-between items-center">
//                 <div className="flex justify-center flex-1 ">
//                     <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => { handleSaveExample() }}>Save Example</button>
//                     <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => { handleClear() }}>Clear</button>
//                     <button className=" bg-white p-1 mx-2 rounded-lg" onClick={() => {
//                         console.log(topics);
//                         console.log(questions);
//                     }}>test</button>
//                     <input className="bg-white rounded-lg p-1 w-48" type="file" accept=".docx" onChange={handleFileChange} />
//                 </div>
//                 <div className="flex justify-center flex-1"><input type="text" /></div>
//             </div>
//             <div className="w-full h-fit min-h-[1000px]  p-20 mt-5 bg-white">

//                 <div className="flex w-full h-fit">
//                     <div className="w-1/3  flex flex-col items-start " style={{}}>

//                         <span className="font-bold text-xl text-center">
//                             SỞ GIÁO DỤC VÀO ĐÀO TẠO <br /> VĨNH PHÚC
//                         </span>
//                     </div>
//                     <div className="w-2/3  flex flex-col items-center pl-6">
//                         <span className="font-bold text-xl text-center ">
//                             KỲ THI TUYỂN SINH VÀO LỚP 10 THPT NĂM HỌC 2023-2024{" "}
//                             <span className="font-bold text-xl">tỉnh VĨNH PHÚC</span>
//                         </span>
//                         <span>Thời gian còn lại : 60 phút</span>
//                         <span className="font-bold">Mã đề thi: 468</span>
//                     </div>
//                 </div>

//                 <span className="w-[80%] mx-auto my-4 h-[1px] bg-black block"></span>

//                 <div className="w-full ">

//                     {topics.map((itemTopic, indexTopic) => {
//                         // const elementNote = "<span>html</span>"
//                         const elementNote = itemTopic.note.length > 0 ? itemTopic.note.join("<br/>") : ""
//                         return <div key={indexTopic} className="w-full h-fit mb-4" >
//                             <div className="w-full ">
//                                 <div className="group border border-dashed border-gray-400 p-1 relative">
//                                     <ContentEditable
//                                         data-name="topic"
//                                         innerRef={React.createRef()}
//                                         html={itemTopic.topic} // innerHTML of the editable div
//                                         disabled={false}       // use true to disable editing
//                                         onChange={(e) => { handleUpdateTopic(e, itemTopic.id) }} // handle innerHTML change
//                                         onFocus={(e) => {
//                                             if (e.target.innerText == "Topic") {
//                                                 e.target.innerText = ""
//                                             }
//                                         }}
//                                         onBlur={(e) => {
//                                             if (e.target.innerText == "") {
//                                                 e.target.innerText = "Topic"
//                                             }
//                                         }}
//                                         tagName='p'
//                                         className="border border-dashed border-gray-400 m-1 " />
//                                     <ContentEditable
//                                         innerRef={React.createRef()}
//                                         html={elementNote + ""} // innerHTML of the editable div {itemTopic.note.length > 0 ? itemTopic.note.map((itemNote, indexNote) => { return <p key={indexNote}>{Parser(itemNote)}</p> }) : null}
//                                         disabled={false}       // use true to disable editing
//                                         onChange={(e) => { handleUpdateTopic(e, itemTopic.id) }} // handle innerHTML change
//                                         onFocus={(e) => {
//                                             if (e.target.innerText == "note") {
//                                                 e.target.innerText = ""
//                                             }
//                                         }}
//                                         onBlur={(e) => {
//                                             if (e.target.innerText == "") {
//                                                 e.target.innerText = "note"
//                                             }
//                                         }}
//                                         tagName='p'
//                                         data-name="topic-note" className="border border-dashed border-gray-400 m-1" />
//                                     <div className="absolute -top-9 left-3 bg-gray-400 p-2  hidden group-hover:block">
//                                         <button className="px-2" onClick={() => handleFormat('bold')} {...bold ? { style: { border: "1px solid black", backgroundColor: '#fff' } } : null} >Bold</button>
//                                         <button className="px-2" onClick={() => handleFormat('italic')} {...italic ? { style: { border: "1px solid black", backgroundColor: '#fff' } } : null}>Italic</button>
//                                         <button className="px-2" onClick={() => handleFormat('underline')}{...underline ? { style: { border: "1px solid black", backgroundColor: '#fff' } } : null} >Underline</button>
//                                         <button onClick={() => { addNewQuestions(itemTopic.id) }}>Thêm câu hỏi</button>
//                                         <button onClick={() => { addNewQuestions(itemTopic.id) }}>Xóa câu hỏi</button>
//                                     </div>
//                                     {questions.map((itemQuestion, idxQuestions) => {
//                                         if (itemQuestion != null) {
//                                             if (itemQuestion.topic == itemTopic.id) {
//                                                 indexQuestion++;
//                                                 return <div key={idxQuestions} className=" w-full  p-1">

//                                                     <div className="w-full h-fit my-1 flex">
//                                                         <span className="font-bold min-w-24 ">Question {indexQuestion}.</span>
//                                                         <ContentEditable
//                                                             data-name="title"
//                                                             className="cursor-pointer border border-dashed border-gray-400 mx-2 px-1 inline-block min-w-56 "
//                                                             innerRef={React.createRef()}
//                                                             html={itemQuestion.title} // innerHTML of the editable div
//                                                             disabled={false}       // use true to disable editing
//                                                             onChange={(e) => { handleUpdateQuestions(e, itemQuestion.id, itemTopic.id) }} // handle innerHTML change
//                                                             tagName='span' // Use a custom HTML tag (uses a div by default)
//                                                         />
//                                                     </div>
//                                                     <div className="grid grid-cols-4 w-full cursor-pointer border border-dashed border-gray-400 p-1 ">

//                                                         <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
//                                                             <ContentEditable
//                                                                 data-name="answer-1"
//                                                                 className='w-full'
//                                                                 innerRef={React.createRef()}
//                                                                 html={"A. " + itemQuestion.answer[0]} // innerHTML of the editable div
//                                                                 disabled={false}       // use true to disable editing
//                                                                 onChange={(e) => { handleUpdateQuestions(e, itemQuestion.id, itemTopic.id) }} // handle innerHTML change
//                                                                 tagName='p' // Use a custom HTML tag (uses a div by default)
//                                                             />
//                                                             <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
//                                                                 handleUpdateCorrentAnswer(e, itemQuestion.id, "0")
//                                                             }} />
//                                                         </div>
//                                                         <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
//                                                             <ContentEditable
//                                                                 data-name="answer-2"
//                                                                 className='w-full'
//                                                                 innerRef={React.createRef()}
//                                                                 html={"B. " + itemQuestion.answer[1]} // innerHTML of the editable div
//                                                                 disabled={false}       // use true to disable editing
//                                                                 onChange={(e) => { handleUpdateQuestions(e, itemQuestion.id, itemTopic.id) }} // handle innerHTML change
//                                                                 tagName='p' // Use a custom HTML tag (uses a div by default)
//                                                             />

//                                                             <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
//                                                                 handleUpdateCorrentAnswer(e, itemQuestion.id, "1")
//                                                             }} />
//                                                         </div>
//                                                         <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1" >
//                                                             <ContentEditable
//                                                                 data-name="answer-3"
//                                                                 className='w-full'
//                                                                 innerRef={React.createRef()}
//                                                                 html={"C. " + itemQuestion.answer[2]} // innerHTML of the editable div
//                                                                 disabled={false}       // use true to disable editing
//                                                                 onChange={(e) => { handleUpdateQuestions(e, itemQuestion.id, itemTopic.id) }} // handle innerHTML change
//                                                                 tagName='p' // Use a custom HTML tag (uses a div by default)
//                                                             />
//                                                             <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
//                                                                 handleUpdateCorrentAnswer(e, itemQuestion.id, "2")
//                                                             }} />
//                                                         </div>
//                                                         <div className="flex  cursor-pointer border border-dashed border-gray-400 p-1">
//                                                             <ContentEditable
//                                                                 data-name="answer-4"
//                                                                 className='w-full'
//                                                                 innerRef={React.createRef()}
//                                                                 html={"D. " + itemQuestion.answer[3]} // innerHTML of the editable div
//                                                                 disabled={false}       // use true to disable editing
//                                                                 onChange={(e) => { handleUpdateQuestions(e, itemQuestion.id, itemTopic.id) }} // handle innerHTML change
//                                                                 tagName='p' // Use a custom HTML tag (uses a div by default)
//                                                             />
//                                                             <input type="radio" name={`answer-list-${itemQuestion.id}`} onChange={(e) => {
//                                                                 handleUpdateCorrentAnswer(e, itemQuestion.id, "3")
//                                                             }} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             }
//                                         }
//                                     })}
//                                 </div>
//                             </div>
//                         </div>
//                     })}
//                     <button className="bg-red-300 px-2" onClick={() => { addNewTopic() }}>Them topic</button>

//                 </div>

//             </div>
//         </div >
//     );
// }


// function writeExample(example: IExample) {
//     set(ref(database, "Example/" + example.id), {
//         id: example.id,
//         createName: example.createName,
//         maDeThi: example.maDeThi,
//     });
// }
// function writeTopic(topicArray: ITopic[]) {
//     topicArray.map((item) =>
//         set(ref(database, "Topic/" + item.id), {
//             id: item.id,
//             type: item.type,
//             topic: item.topic,
//             note: item.note,
//             example: item.example,
//         })
//     );
// }
// function wirteQuestions(questionArray: IQuestions[]) {
//     questionArray.map((item) =>
//         set(ref(database, "Questions/" + item.id), {
//             id: item.id,
//             title: item.title,
//             answer: item.answer,
//             correctAnswer: item.correctAnswer,
//             topic: item.topic,
//             type: item.type,
//         })
//     );
// }

// const validateTitle = (title: any) => {
//     let titleTemp = title.join("");
//     titleTemp = removeFirstTag(titleTemp);

//     return titleTemp.slice(titleTemp.indexOf(":") + 1, titleTemp.length - 1);
// };
// const validateAnswer = (answer: any) => {
//     let answerIndex: number[] = [];
//     let answerResult: string[] = [];
//     let convertToText = removeMultipleSpaces(answer.join("")).replace(/<strong[^>]*>|<\/strong>/g, "");

//     [...convertToText].map((item, index) => {
//         if (
//             item + [...convertToText][index + 1] == "A." ||
//             item + [...convertToText][index + 1] == "B." ||
//             item + [...convertToText][index + 1] == "C." ||
//             item + [...convertToText][index + 1] == "D."
//         ) {
//             answerIndex.push(index);
//         }
//     });
//     answerIndex.map((item, index) => {
//         if (index < answerIndex.length - 1) {
//             answerResult.push(
//                 // text.slice(0, 1)
//                 convertToText.slice(answerIndex[index] + 2, answerIndex[index + 1])
//             );
//         }
//         if (index == answerIndex.length - 1) {
//             answerResult.push(
//                 convertToText.slice(answerIndex[index] + 2, convertToText.length)
//             );
//         }
//     });


//     return answerResult;
// };

// function removeMultipleSpaces(str: any) {
//     return str.replace(/\s+/g, " ");
// }
// function removeHTMLTags(str: any) {
//     // Sử dụng RegEx để tìm và thay thế tất cả các thẻ HTML
//     return str.replace(/<[^>]*>/g, "");
// }
// function removePTags(htmlString: any) {
//     return htmlString.replace(/<p[^>]*>|<\/p>/g, "");
// }

// function splitToBlocksRegex(html: any) {
//     // Biểu thức chính quy đơn giản để tìm các thẻ block
//     // const regex = /<(\w+)[^>]*>(.*?)<\/\1>/g;
//     const regex = /<(\w+)>(.*?)<\/\1>/g;
//     const matches = [];
//     let match;

//     while ((match = regex.exec(html)) !== null) {
//         matches.push(match[0]);
//     }

//     return matches;
// }
// function removeFirstTag(str: any) {
//     const regex = /<(\w+)[^>]*>(.*?)<\/\1>/;
//     return str.replace(regex, "$2");
// }

// export default ImportExample;
