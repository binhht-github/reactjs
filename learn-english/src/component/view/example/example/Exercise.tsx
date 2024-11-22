import React, { useCallback, useEffect, useState } from 'react';
import {
    equalTo,
    onValue,
    orderByChild,
    query,
    ref,
} from "firebase/database";
import { IExample, ISelectAnswer, ITopic } from '../../../Interface/Interfaces';
import { database } from '../../../../firebase';
import Topics from '../Topics';
function Exercise(props: any) {

    const [example, setExample] = useState<IExample | null>(null);
    const [topics, setTopics] = useState<ITopic[]>([])
    const [diemSo, setDiemSo] = useState<string>("-")
    const [submit, setSubmit] = useState<boolean>(false)
    const [test, setTest] = useState<boolean>(false)
    let answers: ISelectAnswer[] = []
    let totleQuestions: number = 0;

    useEffect(() => {
        if (!submit) {
            const dbRef = ref(database, "Example");
            onValue(
                query(dbRef),
                (snapshot) => {
                    if (snapshot.exists()) {
                        const randomIndex = Math.floor(Math.random() * snapshot.size);
                        const exampleObj = Object.values(snapshot.val())[randomIndex] as IExample
                        setExample(exampleObj)
                    }
                },
                {
                    onlyOnce: true,
                }
            );
        }
    }, [submit]);

    const handleSubmit = () => {
        let selectCorrectAnser: number = 0;
        answers.forEach((item) => {
            if (item.correctAnswer == item.answer) {
                selectCorrectAnser += 1
            }
        })
        setSubmit(true)
        setDiemSo((selectCorrectAnser / totleQuestions * 10).toFixed(1))
        answers = []
        totleQuestions = 0;
    }

    const handleTest = () => {
        setTest(true)
        const dbRef2 = ref(database, 'Topic');
        onValue(query(dbRef2, orderByChild('example'), equalTo(`${example!.id}`)), (snapshot) => {
            if (snapshot.exists()) {
                const result: ITopic[] = []
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    result.push(childData)
                });
                setTopics(result)
                console.log("here ", result);

            }
        }, {
            onlyOnce: true
        });
    }

    const countTotleQuestions = (totle: number) => {
        return totleQuestions += totle
    }

    const handleSelectAnswer = (item: ISelectAnswer) => {
        const index = answers.findIndex(x => x.question == item.question)
        if (index < 0) {
            answers.push(item)
            return
        }
        if (index >= 0) {
            answers[index] = item
            return
        }
    }
    const [indexTest, setIndexTest] = useState<number>(1)

    return (
        <div className="container_custom h-full overflow-y-auto  no-scrollbar py-5">

            <div className="w-full h-fit min-h-[1000px]  p-20 bg-white">
                <div className="flex w-full h-fit">
                    <div className="w-1/3  flex flex-col items-center ">
                        <div className='border flex items-center justify-center flex-col border-black h-full w-28'>
                            <p><u>Điểm</u></p>
                            <p className='text-6xl'><strong>{diemSo}</strong></p>
                        </div>
                    </div>
                    {
                        example ? <div className="w-2/3  flex flex-col items-center pl-6">
                            <span className="font-bold text-xl text-center ">
                                {example?.createName}

                            </span>
                            <span>Thời gian còn lại : 60 phút</span>
                            <span className="font-bold">Mã đề: {example?.maDeThi}</span>
                        </div> : null
                    }
                </div>
                <div className='w-full flex justify-center mt-4'>
                    {
                        test ? !submit ? <button className='bg-slate-300 p-2 rounded-lg' onClick={() => { if (!props.submit && totleQuestions > 0) { handleSubmit() } }}>Submit</button> : <button className='bg-slate-300 p-2 rounded-lg' onClick={() => { if (submit) { setSubmit(false); setTest(false); setDiemSo("-"); setTopics([]) } }}>Test New</button>
                            : null
                    }
                    {!test ? <button className='bg-slate-300 p-2 rounded-lg' onClick={() => { if (example != null) { handleTest() } }}>Test</button> : null}
                </div>
                <span className="w-[80%] mx-auto my-4 h-[1px] bg-black block"></span>
                {
                    topics.map((topicItem, topicIndex) => {

                        return < Topics key={topicIndex} indexTest={indexTest} setIndexTest={setIndexTest} submit={submit} topicItem={topicItem} countTotleQuestions={countTotleQuestions} handleSelectAnswer={handleSelectAnswer} />
                    })
                }

            </div>
        </div >
    );
}

export default Exercise;



// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     onValue,
//     query,
//     ref,
// } from "firebase/database";
// import { IExample, ISelectAnswer } from '../../../Interface/Interfaces';
// import { database } from '../../../../firebase';
// import { generateRandomId } from '../../../../utils/GenerateRandomId';
// import Topics from '../Topics';
// function Exercise(props: any) {
//     // const [selectAnswer2, setSelectAnswer2] = useState<ISelectAnswer[]>([])
//     const [diemSo, setDiemSo] = useState<string>("-")
//     const [submit, setSubmit] = useState<boolean>(false)
//     const [test, setTest] = useState<boolean>(false)
//     let answers: ISelectAnswer[] = []
//     let totleQuestions: number = 0;

//     const [example, setExample] = useState<IExample | null>({
//         id: "ex" + generateRandomId(),
//         createName: "",
//         maDeThi: ""
//     });
//     useEffect(() => {
//         if (!submit) {
//             const dbRef = ref(database, "Example");
//             onValue(
//                 query(dbRef),
//                 (snapshot) => {
//                     if (snapshot.exists()) {
//                         const randomIndex = Math.floor(Math.random() * snapshot.size);
//                         const exampleObj = Object.values(snapshot.val())[randomIndex] as IExample
//                         setExample(exampleObj)
//                     }
//                 },
//                 {
//                     onlyOnce: true,
//                 }
//             );
//         }
//     }, [submit]);

//     const handleSubmit = () => {
//         let selectCorrectAnser: number = 0;
//         answers.forEach((item) => {
//             if (item.correctAnswer == item.answer) {
//                 selectCorrectAnser += 1
//                 console.log(item);
//             }
//         })
//         setSubmit(true)
//         setDiemSo((selectCorrectAnser / totleQuestions * 10).toFixed(1))
//         answers = []
//         totleQuestions = 0;

//     }

//     const handleTest = () => {
//         setTest(true)
//         // if (submit) {
//         //     setSubmit(false)
//         // }
//     }

//     const countTotleQuestions = (totle: number) => {
//         totleQuestions += totle
//     }

//     const handleSelectAnswer = (item: ISelectAnswer, totle: number) => {
//         const index = answers.findIndex(x => x.question == item.question)
//         if (index < 0) {
//             answers.push(item)
//             return
//         }
//         if (index >= 0) {
//             answers[index] = item
//             return
//         }
//     }


//     return (
//         <div className="container_custom h-full overflow-y-auto  no-scrollbar py-5">
//             <div className='w-full h-fit bg-white pt-4 hidden'>

//                 <div className='w-[80%] mx-auto flex'>

//                     <div className='min-w-24 min-h-24 border border-black flex justify-center items-center'>
//                         <span className='text-6xl '>10</span>
//                     </div>
//                     <div className='min-h-24 ml-2 w-full border border-black'>
//                         <div className='border border-black inline-block min-w-7 text-center'>
//                             <p className='m-auto border-b border-black text-base bg-red-400'>1</p>
//                             <p className='m-auto text-base'> A</p>
//                         </div>

//                     </div>
//                 </div>
//                 <button onClick={() => {
//                     console.log("totle question ", totleQuestions);

//                 }}>click me</button>
//             </div>
//             <div className="w-full h-fit min-h-[1000px]  p-20 bg-white">
//                 <div className="flex w-full h-fit">
//                     <div className="w-1/3  flex flex-col items-center ">
//                         <div className='border flex items-center justify-center flex-col border-black h-full w-28'>
//                             <p><u>Điểm</u></p>
//                             <p className='text-6xl'><strong>{diemSo}</strong></p>
//                         </div>
//                     </div>
//                     <div className="w-2/3  flex flex-col items-center pl-6">
//                         <span className="font-bold text-xl text-center ">
//                             {example?.createName}

//                         </span>
//                         <span>Thời gian còn lại : 60 phút</span>
//                         <span className="font-bold">Mã đề: {example?.maDeThi}</span>
//                     </div>
//                 </div>
//                 <div className='w-full flex justify-center mt-4'>
//                     {
//                         test ? !submit ? <button className='bg-slate-300 p-2 rounded-lg' onClick={() => { if (!props.submit) { handleSubmit() } }}>Submit</button> : <button className='bg-slate-300 p-2 rounded-lg' onClick={() => { setSubmit(false); setTest(false); setDiemSo("-") }}>Test New</button>
//                             : null
//                     }
//                     {!test ? <button className='bg-slate-300 p-2 rounded-lg' onClick={() => { handleTest() }}>Test</button> : null}
//                 </div>
//                 <span className="w-[80%] mx-auto my-4 h-[1px] bg-black block"></span>
//                 {test || submit ? <Topics example={example} submit={submit} handleSelectAnswer={handleSelectAnswer} countTotleQuestions={countTotleQuestions}></Topics> : null}

//             </div>
//         </div>
//     );
// }

// export default Exercise;
