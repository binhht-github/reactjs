import React, { useEffect, useState } from 'react';
import Parser from 'html-react-parser';
const convertID = ["A", "B", "C", "D", "E", "F"];

function Answer(props: any) {
    // console.log("re-render Answer");

    const [list, setList] = useState<string[]>(props.list)

    const [selectAswer, setSelectAnswer] = useState<number | null>(null)

    useEffect(() => {
        if (!props.submit) {
            setSelectAnswer(null)
        }
    }, [props.submit])

    return (
        <>
            {list ? list.map((i, idx) => {
                return <div key={idx}>
                    <span className='cursor-pointer' {...props.submit ? { style: { cursor: "auto" } } : null} onClick={(e) => {
                        // console.log("Cay hoi id: ", props.id, " Dap an da chon: ", idx);;
                        if (!props.submit) {
                            setSelectAnswer(idx)
                            props.handleSelectAnswer(idx + "", props.questionID, props.correctAnswer)
                        }
                    }} >
                        <strong className='relative'>
                            {convertID[idx]}
                            {selectAswer == idx
                                ? <span className='rounded-full border-[3px] border-black absolute size-full -left-[40%] top-[2%] px-2' {...idx == props.correctAnswer && props.submit ? { style: { borderColor: 'green' } } : null} />
                                : null}
                            {selectAswer != idx && idx == props.correctAnswer && props.submit
                                ? <span className='rounded-full border-[3px] border-red-600 absolute size-full -left-[40%] top-[2%] px-2' />
                                : null}
                        </strong>. {Parser(i)}
                    </span>
                </div>
            }) : null}
        </>
    );
}

export default Answer;




// import React, { useEffect, useState } from 'react';
// import Parser from 'html-react-parser';
// const convertID = ["A", "B", "C", "D", "E", "F"];

// function Answer(props: any) {
//     console.log("re-render Answer");

//     const [list, setList] = useState<string[]>(props.list)

//     const [selectAswer, setSelectAnswer] = useState<number | null>(null)

//     useEffect(() => {
//         if (!props.submit) {
//             setSelectAnswer(null)
//         }
//     }, [props.submit])

//     return (
//         <>
//             {list ? list.map((i, idx) => {
//                 return <div key={idx}>
//                     <span className='cursor-pointer' {...props.submit ? { style: { cursor: "auto" } } : null} onClick={(e) => {
//                         // console.log("Cay hoi id: ", props.id, " Dap an da chon: ", idx);;
//                         if (!props.submit) {
//                             setSelectAnswer(idx)
//                             props.handleSelectAnswer(idx + "", props.questionID, props.correctAnswer)
//                         }
//                     }} >
//                         <strong className='relative'>
//                             {convertID[idx]}
//                             {selectAswer == idx
//                                 ? <span className='rounded-full border-[3px] border-black absolute size-full -left-[40%] top-[2%] px-2' {...idx == props.correctAnswer && props.submit ? { style: { borderColor: 'green' } } : null} />
//                                 : null}
//                             {selectAswer != idx && idx == props.correctAnswer && props.submit
//                                 ? <span className='rounded-full border-[3px] border-red-600 absolute size-full -left-[40%] top-[2%] px-2' />
//                                 : null}
//                         </strong>. {Parser(i)}
//                     </span>
//                 </div>
//             }) : null}
//         </>
//     );
// }

// export default Answer;
