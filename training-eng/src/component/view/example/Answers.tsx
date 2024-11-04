import React, { useState } from 'react';
import Parser from 'html-react-parser';
const convertID = ["A", "B", "C", "D", "E", "F"];

interface IAnswer {
    id: number,
    dapan: string
}
function Answer(props: any) {
    console.log("re-render Answer");

    const [list, setList] = useState<IAnswer[]>(props.list)
    const [selectAswer, setSelectAnswer] = useState<number | null>(null)
    return (
        <>
            {list.map((i, idx) => {
                return <div key={i.id}>
                    <span className='cursor-pointer' onClick={(e) => {
                        // console.log("Cay hoi id: ", props.questionID, " Dap an da chon: ", convertID[i.id - 1]);;
                        setSelectAnswer(i.id)
                        props.onSelectAnswer(i.id, props.questionID)
                    }} >
                        <strong className='relative'>{convertID[idx]}{selectAswer && selectAswer == i.id ? <span className='rounded-full border-2 border-black absolute size-full -left-[25%] top-[2%] px-2' /> : null} </strong>. {Parser(i.dapan)}
                    </span>
                </div>

            })}
        </>
    );
}

export default Answer;
