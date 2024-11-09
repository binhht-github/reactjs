import React, { useState } from 'react';
import Parser from 'html-react-parser';
const convertID = ["A", "B", "C", "D", "E", "F"];

function Answer(props: any) {
    console.log("re-render Answer");

    const [list, setList] = useState<string[]>(props.list)

    const [selectAswer, setSelectAnswer] = useState<number | null>(null)
    return (
        <>
            {list ? list.map((i, idx) => {
                return <div key={idx}>
                    <span className='cursor-pointer' onClick={(e) => {
                        console.log("Cay hoi id: ", props.id, " Dap an da chon: ", idx);;
                        setSelectAnswer(idx)
                        // props.onSelectAnswer(idx, props.questionID)
                    }} >
                        <strong className='relative'>{convertID[idx]}{selectAswer == idx ? <span className='rounded-full border-2 border-black absolute size-full -left-[25%] top-[2%] px-2' /> : null} </strong>. {Parser(i)}
                    </span>
                </div>
            }) : null}
        </>
    );
}

export default Answer;
