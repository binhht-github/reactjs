import React, { useEffect, useState } from 'react';
import SpaceTaskBar from '../nav/SpaceTaskBar';
import Board from './Board';
import { Route, Router, Routes } from 'react-router-dom';

export const BoardArr = [
    {
        "id": 1,
        "name": "Bang so 1",
        "stack": 1,
        "createDate": " date",
        "createUser": " user",
        "spaceId": 1
    },
    {
        "id": 2,
        "name": "to do ing",
        "stack": 2,
        "createDate": " date",
        "createUser": " user",
        "spaceId": 1
    },
    {
        "id": 3,
        "name": "Web bans hangf",
        "stack": 1,
        "createDate": " date",
        "createUser": " user",
        "spaceId": 2
    },
    {
        "id": 4,
        "name": "Zing mp3",
        "stack": 1,
        "createDate": " date",
        "createUser": " user",
        "spaceId": 3
    },
]
interface IBoard {
    id: number,
    name: string,
    stack: number,
    createDate: string,
    createUser: string,
    spaceId: number
}

function List(props: any) {
    const [ListBoads, setListBoards] = useState<IBoard[]>([])
    useEffect(() => {
        setListBoards(BoardArr.filter(item => { return item.spaceId == props.idSpace }))
    }, [props.idSpace])

    return (
        <div className='w-full h-[calc(100vh-48px)] flex ' style={{
            backgroundImage:
                `url(https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg)`,
            // backgroundColor: "green",
            backgroundPosition: "50%",
            backgroundSize: " cover"

        }}>
            <SpaceTaskBar idSpace={props.idSpace} nameSpace={props.nameSpace}></SpaceTaskBar>
            <Routes>
                {ListBoads.map((item, index) => {
                    return (
                        <Route key={item.id} path={`board/${item.id}`} element={<Board item={item} />} />
                    )
                })}
            </Routes>
        </div>
    );
}

export default List;
