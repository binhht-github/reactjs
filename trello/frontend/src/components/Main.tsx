import React, { useEffect, useState } from 'react';
import Header from './nav/Header';
import WorkSpace from './work_space/WorkSpace';
import List from './board/List';
import BoardDetail from './board/BoardDetail';
import { Route, Routes } from 'react-router-dom';
import Board from './board/Board';

export const SpacesArr = [{
    "id": 1,
    "name": "Template",
    "createDate": "03-08-2024",
    "createUser": "admin"
},
{
    "id": 2,
    "name": "Dự  án mẫu",
    "createDate": "03-01-2022",
    "createUser": "admin"
},
{
    "id": 3,
    "name": "App nghe nhạc",
    "createDate": "03-01-2019",
    "createUser": "admin"
}]

interface ISpace {
    id: number,
    name: string,
    createDate: string,
    createUser: string
}
function Main() {
    const [ListSpace, setListSpace] = useState<ISpace[]>([]);
    useEffect(() => {
        setListSpace(SpacesArr)
    }, [])
    return (
        <div className='w-screen h-screen relative'>
            <Header></Header>
            <Routes>
                <Route path="/" element={<WorkSpace />} ></Route>
                {ListSpace.map((item, index) => {
                    return <Route key={item.id} path={`w/${item.id}/*`} element={<List idSpace={item.id} nameSpace={item.name} />} ></Route>
                })}
            </Routes>
            {/* <WorkSpace></WorkSpace> */}
            {/* <Boards></Boards> */}
            {/* <BoardDetail /> */}
        </div>
    );
}

export default Main;
